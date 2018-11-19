import { Building } from './building'
import { PIXISpriteComponent, Position2DComponent, IDComponent, TTLComponent } from '../components'

export class Tower extends Building{
  position = new Position2DComponent()
}

export class LaserTower extends Tower{
  cost = 500
  outcome = 5
  baseName = 'Laser Tower'
  render = new PIXISpriteComponent().init({ spriteName: 'chess_tower.png' })
  ttl = new TTLComponent(Math.random() * 10000 + 10000)
}

export class CannonTower extends Tower{
  baseName = 'Canon Tower'
}

export class GunTower extends Tower{
  baseName = 'Gun Tower'
  render = new PIXISpriteComponent().init({ spriteName: 'chess_tower.png' })
}

// export class LaserTower extends Building{
//   cost = 500
//   outcome = 5
//   baseName: string = 'Laser Tower'
//   target: any = null
//   fireRate = 1
//   fireDamge = 1000
//   fireRange = 300
//   init() {
//     super.init()
//     const foo = () => {
//       fireRange.visible = !fireRange.visible
//     }
//     this.sprite = new PIXI.Container()
//     this.sprite.position.x = this.position.x
//     this.sprite.position.y = this.position.y

//     const sprite = PIXI.Sprite.fromImage('public/chess_tower.png')
//     sprite.interactive = true
//     sprite.on('pointerout', foo)
//     sprite.on('pointerover', foo)
//     this.sprite.addChild(sprite)

//     const fireRange = new PIXI.Graphics()
//     fireRange.lineStyle(5, 0xFFFFFF, 1)
//     fireRange.beginFill(0x0000FF, 1)
//     fireRange.drawCircle(32 / 2, 32 / 2, this.fireRange)
//     fireRange.endFill()
//     fireRange.alpha = 0.2
//     fireRange.visible = false
//     this.sprite.addChild(fireRange)
//     // circle.alpha = 0.5;
//     // stage.addChild(circle);

//     return this
//   }
// }
