import config from '../config'
import { Entity } from '../core'

export class Building extends Entity{
  // sprite?: any
  // id: number
  // target: any = null
  // state: string = 'idle'
  static cBuildings: {[key:string]:number} = {}
  cost: number = 0
  income: number = 0
  outcome: number = 0
  baseName: string = 'Building'
  name: string
  // type: string = 'Building'
  // position: {x: number, y: number} = { x: 0, y: 0 }
  // shootings: any

  // constructor() {
  //   super()
  //   const { name } = this.constructor
  //   if (Building.cBuildings[name] === undefined) {
  //     Building.cBuildings[name] = 0
  //   } else Building.cBuildings[name] = Building.cBuildings[name] + 1
  //   this.id = Building.cBuildings[name]
  // }

  init() {
    // this.name = `${this.baseName} ${Building.cBuildings[this.constructor.name]}`
    // return this
  }

  // showShoot() {
  //   this.shootings = new PIXI.Graphics()
  //   this.shootings.position.set(this.position.x, this.position.y)
  //   const destx = this.target.position.x - this.position.x + tileSize / 2
  //   const desty = this.target.position.y - this.position.y + tileSize / 2
  //   this.shootings.lineStyle(1, 0xffffff)
  //      .moveTo(0, 0)
  //      .lineTo(destx, desty)
  //   // setInterval(() => {
  //   //   destx += 0.5
  //   //   // desty += 0.5
  //   //   this.shootings
  //   //     .clear()
  //   //     .lineStyle(1, 0xffffff)
  //   //     .moveTo(0, 0)
  //   //     .lineTo(destx, desty)
  //   // }, 10)
  //   return this.shootings
  // }
}

// export class GoldMine extends Building{
//   cost = 1000
//   income = 100
//   outcome = 5
//   baseName = 'GoldMine'
// }

// export class CannonTower extends Building{
//   cost = 100
//   baseName: string = 'Cannon Tower'

//   init() {
//     super.init()
//     this.sprite = PIXI.Sprite.fromImage('public/chess_tower.png')
//     return this
//   }
// }
