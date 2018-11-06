import { compose, uniq, filter, map, values, without, isEmpty, toPairs, find } from 'ramda'
import { Action } from '../core/action'
import { Component } from '../core/component'
import { System } from '../core/system'
import { Entity } from '../core/entity'
import { ObjectOf } from '../utils'

// Entity

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
  action(systems: System<any>[] = []) {
    const constructors = compose(map(value => value.constructor.name), values)
    this.systems = filter((system) => {
      const { componentsGroup } = system
      const entityConstructors = constructors(this.entity)
      const compGroupConstructors = constructors(componentsGroup)
      return isEmpty(without(entityConstructors, compGroupConstructors))
    }, systems)
    return {
      ... this as any,
      systems: this.systems,
    }
  }
}

export class EntityRemoveAction extends Action{
  constructor(public entity: Entity) { super() }
}

export class EntityAddComponentAction extends Action{
  constructor(public entity: Entity, public component: Component) { super() }
}

export class EntityRemoveComponentAction<T extends Component> extends Action {
  constructor(public entity: Entity, public component: { new(): T }) { super() }
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

  entityRemove(entities: Entity[] = [], action: EntityAddAction) {
    const storeEntity = entities.find((entity:any) => {
      return (entity as any).id.id === (entity as any).id.id
    })
    if (storeEntity) {
      storeEntity.systems.map((system) => {
        system.onRemoveEntity(createComponentGroup(system, storeEntity))
      })
      return without([storeEntity], entities)
    }
    return entities
  }

  entityAddComponent(entities: Entity[] = [], action: EntityAddComponentAction) {
    return entities
    // return entities.map(entity => {
    //   if (entity === action.entity) {
    //     return {
    //       ...entity,
    //       [action.component.name]: action.component,
    //     }
    //   }
    //   return entities
    // })
  }
}
