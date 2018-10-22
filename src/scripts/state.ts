import { LaserTower, CannonTower, Building, GoldMine } from './entities'
import { BuildingCursor } from './entities/buildingCursor'
import { Dispatch } from 'redux'
import { Creature } from './entities/creatures'
import { tileSize } from './config'
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
const lt2 = new LaserTower()
const ct  = new CannonTower().init()
const gm = new GoldMine().init()

lt2.position.x = 9 * tileSize
lt2.position.y = 9 * tileSize
lt2.init()

const lt3 = new LaserTower()
lt3.position.x = 8 * tileSize
lt3.position.y = 8 * tileSize
lt3.init()

export const rootState: RootState =  {
  buildingCursor: new BuildingCursor(),
  buildingsAvailable: [lt, ct],
  buildings: [gm, lt2, lt3],
  creatures: [],
  resources: {
    gold: 10197,
  },
}
