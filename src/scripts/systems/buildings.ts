import { ThunkDispatch } from 'redux-thunk'
import { System } from '../core/system'
import { Building } from '../entities'
import { Action } from '../core/action'
import { RootState } from '../state'

type getState = () => RootState
export class AddBuildingAction extends Action{
  constructor(public building: Building) { super() }
}

export class StartBuildingAction extends Action{
  constructor(public building: Building) { super() }
}

export class SuccessBuildingAction extends Action{
  constructor(public building: Building) { super() }
  action() {
    return (dispatch: ThunkDispatch<any, any, any>, getState:getState) => {
      const state = getState()
      const { building } = state.buildingCursor
      const { gold } = state.resources
      return Promise.all([
        dispatch(new AddBuildingAction(building)),
      ]).then(() => dispatch({ ... this as Object }))
    }
  }
}

export class BuildingsSystem extends System<Building[]>{
  addBuilding(buildings: Building[] = [], action: AddBuildingAction) {
    const newBuildings = [
      ...buildings,
      action.building,
    ]
    return newBuildings
  }

  removeBuilding() {}
  updateBuilding() {}
}
