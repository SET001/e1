import { System } from '../core/system'
import { Creature } from '../entities/creatures'
import { Action } from '../core/action'

export const creatureAdd = (creature: Creature) => ({ type: 'creatureAdd', payload: creature })

export class CreaturesSystem extends System<Creature[]>{
  stateSliceName = 'creatures'
  creatureAdd(creatures: Creature[], action: Action) {
    return [
      ...creatures,
      action.payload,
    ]
  }

  creatureRemove(state: Creature[], action: Action) {
    return state
  }
}
