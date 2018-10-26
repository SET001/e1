import { LaserTower, CannonTower, Building, GoldMine } from './entities'
import { BuildingCursor } from './entities/buildingCursor'
import { Dispatch } from 'redux'
import { Creature } from './entities/creatures'
import { tileSize } from './config'
import { container } from './dev.container'
export interface RootState{
  dispatch?: Dispatch
  buildingCursor?: BuildingCursor
  buildingsAvailable?: Building[]
  buildings?: Building[]
  creatures?: Creature[]
  resources?: {
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

const cr1 = container.get<Creature>('Creature')
cr1.position.x = 5 * tileSize
cr1.position.y = 7 * tileSize
cr1.init('lolBoy.png')

export const rootState: RootState =  {
  buildingCursor: new BuildingCursor(),
  buildingsAvailable: [lt, ct],
  buildings: [lt2],
  creatures: [cr1],
  resources: {
    gold: 10197,
  },
}
