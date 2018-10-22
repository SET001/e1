import { LaserTower, CannonTower, Building, GoldMine } from './entities'
import { BuildingCursor } from './entities/buildingCursor'
import { Dispatch } from 'redux'
import { Creature } from './entities/creatures'

export interface RootState{
  dispatch?: Dispatch
  buildingCursor: BuildingCursor
  buildingsAvailable: Building[]
  buildings: Building[]
  creatures: Creature[]
  resources: {
    gold: number,
  }
}

const lt = new LaserTower().init()
const lt2 = new LaserTower().init()
const ct  = new CannonTower().init()
const gm = new GoldMine().init()

export const rootState: RootState =  {
  buildingCursor: new BuildingCursor(),
  buildingsAvailable: [lt, ct],
  buildings: [gm, lt2],
  creatures: [],
  resources: {
    gold: 10197,
  },
}
