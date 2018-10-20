import * as PIXI from 'pixi.js'
import { System } from '../core/system'
import { Action } from '../core/action'
import { Store } from 'redux'
import { RootState } from '../state'

export class RenderSystem extends System<any>{
	app: PIXI.Application
	init(store: Store){
		const resolutionX: number = window.innerWidth;
		const resolutionY: number = window.innerHeight;
		this.app = new PIXI.Application(resolutionX, resolutionY);
		document.getElementById("app").appendChild(this.app.view);
		this.app.view.addEventListener('click', (event) => {
			store.dispatch({type: 'canvasClick'})
		})
	}

	addRenderObject(state: RootState, action: Action){
		this.app.stage.addChild(action.payload);
		return state
	}
}