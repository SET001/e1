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

//  will remove entity after ttl time
export class TTLSystem extends System<ComponentsGroup>{
  componentsGroup = new ComponentsGroup()
  name = 'ttl'
  entities: ComponentsGroup[] = []

  onNewEntity(entity: ComponentsGroup) {
    entity.ttl.start = Date.now()
    entity.ttl.end = entity.ttl.start + entity.ttl.time
    this.entities.push(entity)
  }

  onRemoveEntity(entity: ComponentsGroup) {
    this.entities = without([entity], this.entities)
  }

  controller(store: Store) {
    const { entities } = store.getState()
    const timedOutEntities: ComponentsGroup[] = this.entities.filter((entity: ComponentsGroup) => entity.ttl.end < Date.now())

    if (timedOutEntities.length) {
      this.store.dispatch(new EntitiesRemoveAction(timedOutEntities))
    }
  }
}
