import * as PIXI from 'pixi.js';
import { System } from "../core/system";
import { RootState } from "../state";
import { Action } from "../core/action";
import { Store } from 'redux';

export class CursorSystem extends System<any>{
	sprite: any
	init(store: Store){
		this.sprite = PIXI.Sprite.fromImage('public/chess_tower.png');	
		this.sprite.position.set(100, 100)
		this.sprite.visible = false
		this.sprite.alpha = 0.7
		store.dispatch({type: 'addRenderObject', payload: this.sprite, layer: 'cursor'})
	}

	mouseMove(state: RootState, action: Action){
		if (state.buildingCursor.enabled){
			this.sprite.position.set(
				Math.ceil(action.payload.x/32-1)*32,
				Math.ceil(action.payload.y/32-1)*32
			)
		}
		return state
	}

	canvasClick(state: RootState){
		if (state.buildingCursor.enabled === true){
			this.sprite.visible = false
			return {
				...state,
				buildingCursor: {
					...state.buildingCursor,
					enabled: this.sprite.visible
				},
				resources: {
					...state.resources,
					gold: state.resources.gold-100
				}
			}
		}
		return state
	}

	cursorEnabled(state: RootState){
		this.sprite.visible = true
		return {
			...state,
			buildingCursor: {
				...state.buildingCursor,
				enabled: this.sprite.visible
			}
		}
	}

	cursorDisabled(state: RootState){
		this.sprite.visible = false
		return {
			...state,
			buildingCursor: {
				...state.buildingCursor,
				enabled: this.sprite.visible
			}
		}
	}
}