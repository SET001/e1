import { Entity } from '../core'
import { IDComponent } from '../components'

export class GameObject extends Entity{
  id = new IDComponent()
}
