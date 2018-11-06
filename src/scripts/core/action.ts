import { lowerizeFirstLetter } from '../utils'

export class Action{
  type: string = ''
  constructor() {
    this.type = lowerizeFirstLetter(this.constructor.name.split('Action').shift())
  }

  action?(): Object {
    return this
  }
}
