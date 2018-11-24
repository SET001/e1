import { compose, uniq, filter, map, values, without, isEmpty, toPairs, find } from 'ramda'
import { Action } from '../core/action'
import { Component } from '../core/component'
import { System } from '../core/system'
import { Entity } from '../core/entity'
import { ObjectOf } from '../utils'
import { IDComponent } from '../components'
import { GameObject } from '../entities'

// Entity

//  will select components from entity and create component group with keys needed for system

export const createComponentGroup = (system: System<any>, entity: Object):{[k:string]:any} => {
  const { componentsGroup } = system
  return toPairs(componentsGroup).reduce(
    (acc: {[k:string]:any}, [key, value]) => {
      acc[key] = find((v: Object) =>
        value.constructor.name === v.constructor.name, values(entity),
      )
      return acc
    }, {})
}

export class EntityAddAction extends Action{
  public systems: System<any>[] = []
  constructor(public entity: Entity) { super() }
  action?(systems: System<any>[] = []) {
    const constructors = compose(map(value => value.constructor.name), values)
    this.systems = filter((system) => {
      const { componentsGroup } = system
      const entityConstructors = constructors(this.entity)
      const compGroupConstructors = constructors(componentsGroup)
      return isEmpty(without(entityConstructors, compGroupConstructors))
    }, systems)
    const action = {
      ... this as any,
      systems: this.systems,
    }
    return action
  }
}

export class EntityRemoveAction extends Action{
  constructor(public entity: GameObject) { super() }
}

export class EntitiesRemoveAction extends Action{
  constructor(public entities: {id: IDComponent}[]) { super() }
}

export class EntityAddComponentAction extends Action{
  public systems: System<any>[] = []
  constructor(public entity: GameObject, public component: Component) { super() }
  action?(systems: System<any>[] = []) {
    const constructors = compose(map(value => value.constructor.name), values)
    this.systems = filter((system) => {
      const { componentsGroup } = system
      const entityConstructors = [...constructors(this.entity), this.component.constructor.name]
      const compGroupConstructors = constructors(componentsGroup)
      return isEmpty(without(entityConstructors, compGroupConstructors))
    }, systems)
    const action = {
      ... this as any,
      systems: this.systems,
    }
    return action
  }
}

export class EntityRemoveComponentAction<T extends Component> extends Action {
  constructor(public entity: GameObject, public component: { new(): T }) { super() }
}

export const entityAddComponent = (entities: Entity[] = [], action: EntityAddComponentAction) => {
  // const value = action.component instanceof NumberComponent || action.component instanceof StringComponent
  //   ? action.component.value
  //   : action.component
  const systems = uniq([
    ...action.entity.systems,
    ...action.systems,
  ])
  return entities.map((entity: GameObject) => {
    if (entity.id === action.entity.id) {
      const newEntity = {
        ...entity,
        [action.component.name]: action.component,
      }
      without(action.entity.systems, systems).map((system: System<any>) => {
        const componentGroup = createComponentGroup(system, newEntity)
        system.onNewEntity(componentGroup)
      })
      return newEntity
    }
    return entity
  })
}

//  system
export class EntitySystem extends System<Entity[]>{
  stateSliceName = 'entities'

  entityAdd(entities: Entity[] = [], action: ObjectOf<EntityAddAction>) {
    const systems = uniq([
      ...action.entity.systems,
      ...action.systems,
    ])
    const entity = {
      ...action.entity,
      systems,
    }

    without(action.entity.systems, systems).map((system: System<any>) => {
      system.onNewEntity(createComponentGroup(system, entity))
    })
    return [...entities, entity]
  }

  entityRemove(entities: Entity[] = [], action: EntityRemoveAction) {
    const storeEntity = entities.find((entity:GameObject) => {
      return entity.id.valueOf() === action.entity.id.valueOf()
    })
    if (storeEntity) {
      storeEntity.systems.map((system) => {
        system.onRemoveEntity(createComponentGroup(system, storeEntity))
      })
      return without([storeEntity], entities)
    }
    return entities
  }

  entitiesRemove(entities: GameObject[] = [], action: EntitiesRemoveAction) {
    const ids = action.entities.map(entity => entity.id)

    const storeEntities = entities.filter(entity => ids.includes(entity.id))
    //  TODO: group by systems and call onRemoveEntity only for each system with array of entities
    if (storeEntities) {
      storeEntities.map(entity => entity.systems.map((system) => {
        system.onRemoveEntity(createComponentGroup(system, entity))
      }))
      // return without(storeEntities, entities)
    }
    return entities
  }

  entityAddComponent = entityAddComponent

}
