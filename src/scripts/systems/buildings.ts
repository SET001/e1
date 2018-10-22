import { System } from '../core/system';
import { Building } from '../entities';
import { Action } from '../core/action';

interface AddBuildingAction extends Action{
  building: Building;
}
const addBuilding = (building: Building): AddBuildingAction => ({ type: 'addBuilding', building });

export class BuildingsSystem extends System<Building[]>{
  stateSliceName = 'buildings';
  addBuilding(buildings: Building[], { building }: AddBuildingAction) {
    return [
      ...buildings,
      building,
    ];
  }

  removeBuilding() {}
  updateBuilding() {}
}
