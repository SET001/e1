import { System } from '../core/system'
import { Action } from '../core/action'
import { Store } from 'redux'
import { without } from 'ramda'

export class AddSystemAction extends Action{
  constructor(public system: System<any>) { super() }
}
export class RemoveSystemAction extends Action{
  constructor(public system: System<any>) { super() }
}

export class SystemManager extends System<any>{
  stateSliceName = 'systems'

  addSystem(systems: System<any>[] = [], action: AddSystemAction) {
    const { system } = action
    return [
      ...systems,
      system,
    ]
  }

  removeSystem(systems: System<any>[] = [], action: AddSystemAction) {
    return without([action.system], systems)
  }
}
