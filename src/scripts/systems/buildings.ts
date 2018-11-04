import { ThunkDispatch } from 'redux-thunk'
import { System } from '../core/system'
import { Building } from '../entities'
import { Action } from '../core/action'
import { AddRenderObjectAction, RenderLayersNames } from './render'
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
      console.log('success building', building, getState())
      return Promise.all([
        // dispatch(new AddRenderObjectAction(
        //   state.buildingCursor.building.sprite, RenderLayersNames.buildings,
        // )),
        // dispatch(udpateResources(gold - building.cost)),
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
