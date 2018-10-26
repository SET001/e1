import { inject, injectable } from 'inversify'

@injectable()
export class Creature{
  maxHealth: number
  health: number
  position: {x:number, y: number} = { x: 0, y: 0 }
  sprite: PIXI.Sprite
  constructor(
    @inject('PIXI') public pixi: any,
  ) {}

  init(spriteName: string) {
    this.sprite = this.pixi.Sprite.fromImage(`public/creatures/${spriteName}`)
    this.sprite.position.x = this.position.x
    this.sprite.position.y = this.position.y
  }
}
