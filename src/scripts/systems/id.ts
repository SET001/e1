import { System } from '../core/system'
import { IDComponent } from '../components'

class ComponentsGroup {
  id = new IDComponent()
}

export class IDSystem extends System<any>{
  componentsGroup = new ComponentsGroup()
  onNewEntity(entity: ComponentsGroup) {
    entity.id.value = Math.ceil(Math.random() * 100000)
  }

}
