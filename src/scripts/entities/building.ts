export class Building{
  sprite?: any
  static cBuildings: {[key:string]:number} = {}
  cost: number = 0
  income: number = 0
  outcome: number = 0
  baseName: string = 'Building'
  name: string
  type: string = 'Building'
  position: {x: number, y: number} = { x: 0, y: 0 }

  constructor() {
    const { name } = this.constructor
    if (Building.cBuildings[name] === undefined) {
      Building.cBuildings[name] = 0
    } else Building.cBuildings[name] = Building.cBuildings[name] + 1
  }

  init() {
    this.name = `${this.baseName} ${Building.cBuildings[this.constructor.name]}`
    return this
  }
}

export class LaserTower extends Building{
  cost = 500
  outcome = 5
  baseName: string = 'Laser Tower'
  fireRate = 1
  fireDamge = 1000
  fireRange = 300
  init() {
    super.init()
    const foo = () => {
      fireRange.visible = !fireRange.visible
    }
    this.sprite = new PIXI.Container()
    this.sprite.position.x = this.position.x
    this.sprite.position.y = this.position.y

    const sprite = PIXI.Sprite.fromImage('public/chess_tower.png')
    sprite.interactive = true
    sprite.on('pointerout', foo)
    sprite.on('pointerover', foo)
    this.sprite.addChild(sprite)

    const fireRange = new PIXI.Graphics()
    fireRange.lineStyle(5, 0xFFFFFF, 1)
    fireRange.beginFill(0x0000FF, 1)
    fireRange.drawCircle(32 / 2, 32 / 2, this.fireRange)
    fireRange.endFill()
    fireRange.alpha = 0.2
    fireRange.visible = false
    this.sprite.addChild(fireRange)
    // circle.alpha = 0.5;
    // stage.addChild(circle);

    return this
  }
}

export class GoldMine extends Building{
  cost = 1000
  income = 100
  outcome = 5
  baseName = 'GoldMine'
}

export class CannonTower extends Building{
  cost = 100
  baseName: string = 'Cannon Tower'

  init() {
    super.init()
    this.sprite = PIXI.Sprite.fromImage('public/chess_tower.png')
    return this
  }
}
