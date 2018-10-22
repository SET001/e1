import * as PIXI from 'pixi.js'
import { System } from '../core/system'
import { Store } from 'redux'
import { RootState } from '../state'
import { successBuilding } from '../actions'

export interface RenderLayers {
	cursor: PIXI.Container
	buildings: PIXI.Container
	tilemap: PIXI.Container
	creatures: PIXI.Container
}




// const buyBuildingAction = (building: Building) => (dispatch: Function)  => 
// 	Promise.all([
// 		dispatch(udpateResources(building.cost)),
// 		dispatch(addBuilding(building)),
// 	]).then(()=>addRenderObject())
	//	decrease money
	//	add new building
	//	add new render object

export class RenderSystem extends System<any>{
	app: PIXI.Application
	layers: RenderLayers & {[keys:string]: PIXI.Container}
	init(store: Store){
		const resolutionX: number = window.innerWidth;
		const resolutionY: number = window.innerHeight;
		this.app = new PIXI.Application(resolutionX, resolutionY);
		this.layers = {
			cursor: new PIXI.Container(),
			creatures: new PIXI.Container(),
			buildings: new PIXI.Container(),
			tilemap: new  PIXI.Container()
		}

		this.app.stage.addChild(this.layers.tilemap)
		this.app.stage.addChild(this.layers.buildings)
		this.app.stage.addChild(this.layers.creatures)
		this.app.stage.addChild(this.layers.cursor)
		document.getElementById("app").appendChild(this.app.view);
		this.app.view.addEventListener('click', (event) => {
			// store.dispatch({type: 'canvasClick'})
			const {enabled, building} = store.getState().buildingCursor
			if (enabled){
				store.dispatch(successBuilding()as any)
			}
		})
	}

	addRenderObject(state: RootState, action: any){
		const layer = this.layers[action.layer]
		layer.addChild(action.payload);
		return state
	}

	updateRenderObjects(state:RootState){
		this.layers.creatures.children.map((creature, i)=>{
			creature.position.x = state.creatures[i].position.x
			creature.position.y = state.creatures[i].position.y
		})
		return state
	}
}