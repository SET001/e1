import * as PIXI from 'pixi.js'

export class Creature{
	maxHealth: number
	health: number
	position: {x:number, y: number} = {x: 0, y: 0}
	sprite: PIXI.Sprite
	constructor(spriteName: string){
		this.sprite = PIXI.Sprite.fromImage(`public/creatures/${spriteName}`)
	}
}