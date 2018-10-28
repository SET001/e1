import { System } from '../core/system'
import { Creature } from '../entities/creatures'
import { Action } from '../core/action'

export class CreatureAddAction extends Action{
  constructor(public creature: Creature) { super() }
}

export class CreaturesSystem extends System<Creature[]>{
  stateSliceName = 'creatures'
  creatureAdd(creatures: Creature[], action: CreatureAddAction) {
    return [
      ...creatures,
      action.creature,
    ]
  }

  creatureRemove(state: Creature[], action: CreatureAddAction) {
    return state
  }
}
