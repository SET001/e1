import { System } from '../core/system'
import { Entity } from '../core/entity'

import { EntityRemoveAction, EntityAddComponentAction, EntitiesRemoveAction } from './entities'
import { TTLComponent, IDComponent } from '../components'
import { compose, map, isEmpty, without, values } from 'ramda'
import { Store } from 'redux'
class ComponentsGroup{
  ttl = new TTLComponent()
  id = new IDComponent()
}
export class TTLSystem extends System<ComponentsGroup>{
  componentsGroup = new ComponentsGroup()
  name = 'ttl'

  onNewEntity(entity: ComponentsGroup) {
    entity.ttl.start = Date.now()
    entity.ttl.end = entity.ttl.start + entity.ttl.time
    // setTimeout(() => {
    //   this.store.dispatch(new EntityRemoveAction(entity))
    // }, entity.ttl.time)
  }

  controller(store: Store) {
    const { entities } = store.getState()
    const timedOutEntities: Entity[] = []
    for (let i = 0; i < entities.length; i++) {
      if (entities[i].ttl.end < Date.now()) {
        timedOutEntities.push(entities[i])
      }
    }
    if (timedOutEntities.length) {
      this.store.dispatch(new EntitiesRemoveAction(timedOutEntities))

      console.log(timedOutEntities.length)
    }
    // entities.map(entity => {
    //   if (entity.ttl.end < Date.now()) {
    //     this.store.dispatch(new EntityRemoveAction(entity))
    //   }
    // })
  }

  // entityAddComponent(entities: Entity[] = [], action: EntityAddComponentAction) {
  //   const constructors = compose(map(value => value.constructor.name), values)
  //   const entityConstructors = [...constructors(action.entity), action.component.constructor.name]
  //   const compGroupConstructors = constructors(this.componentsGroup)
  //   const isMatch = isEmpty(without(entityConstructors, compGroupConstructors))

  //   if (isMatch) {
  //     setTimeout(() => {
  //       this.store.dispatch(new EntityRemoveAction(action.entity))
  //     }, (action.component as any).time)
  //   }
  //   return entities
  // }

  // onNewEntity(group: ComponentsGroup, entity:Entity) {
  //   console.log('new entity with ttl')
  //   setInterval(() => {
  //     this.store.dispatch(new EntityRemoveAction(entity))
  //   }, group.ttl)
  // }
}
