import { System } from '../core/system'
import { Entity } from '../core/entity'

import { EntityRemoveAction, EntityAddComponentAction } from './entities'
import { TTLComponent } from '../components'
import { compose, map, isEmpty, without, values } from 'ramda'
class ComponentsGroup{
  ttl = new TTLComponent()
}
export class TTLSystem extends System<ComponentsGroup>{
  componentsGroup = new ComponentsGroup()
  name = 'ttl'

  entityAddComponent(entities: Entity[] = [], action: EntityAddComponentAction) {
    console.log('TTLSystem entityAddComponent', action)
    const constructors = compose(map(value => value.constructor.name), values)
    const entityConstructors = [...constructors(action.entity), action.component.constructor.name]
    const compGroupConstructors = constructors(this.componentsGroup)
    const isMatch = isEmpty(without(entityConstructors, compGroupConstructors))
    console.log('isMatch', isMatch, entityConstructors, compGroupConstructors)
    if (isMatch) {
      console.log('new entity with ttl', (action.component as any).time)
      setTimeout(() => {
        console.log('timeout')
        this.store.dispatch(new EntityRemoveAction(action.entity))
      }, (action.component as any).time)
    }
    return entities
  }

  // onNewEntity(group: ComponentsGroup, entity:Entity) {
  //   console.log('new entity with ttl')
  //   setInterval(() => {
  //     this.store.dispatch(new EntityRemoveAction(entity))
  //   }, group.ttl)
  // }
}
