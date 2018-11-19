import { System, Action } from '../core'
import { RootState } from '../state'

export class UpdateResourcesAction extends Action{
  constructor(public gold: number) { super() }
}
export class ResourcesSystem extends System<any>{
  udpateResources(state: RootState, action:UpdateResourcesAction) {
    return {
      ...state,
      resources: {
        ...state.resources,
        gold: action.gold,
      },
    }
  }
}
