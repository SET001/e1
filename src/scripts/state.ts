import { Building, BuildingCursor } from './entities'
import { Dispatch } from 'redux'
import { Entity } from './core'

// const lt = new LaserTower().init()
// const lt2 = new LaserTower()
// const ct  = new CannonTower().init()
// const gm = new GoldMine().init()

// lt2.position.x = 9 * tileSize
// lt2.position.y = 9 * tileSize
// lt2.init()

// const lt3 = new LaserTower()
// lt3.position.x = 8 * tileSize
// lt3.position.y = 8 * tileSize
// lt3.init()

// const cr1 = container.get<Creature>('Creature')
// cr1.position.x = 5 * tileSize
// cr1.position.y = 7 * tileSize
// cr1.init('lolBoy.png')

export class RootState {
  dispatch?: Dispatch
  buildingCursor?: BuildingCursor = new BuildingCursor()
  buildingsAvailable?: Building[] = []
  resources?: {
    gold: 101797,
  }
  entities: Entity[] = []
}
