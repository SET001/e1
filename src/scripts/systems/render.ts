import * as PIXI from 'pixi.js'
import { System } from '../core/system'
import { Store } from 'redux'
import { RootState } from '../state'
import { Building } from '../entities'
import { map } from 'ramda'
import { Creature } from '../entities/creatures'

import { Action } from '../core/action'
import { SuccessBuildingAction, AddBuildingAction } from './buildings'
import { Position2DComponent, PIXISpriteComponent } from '../components'

export enum RenderLayersNames{
  cursor = 'cursor',
  buildings = 'buildings',
  tilemap = 'tilemap',
  creatures = 'creatures',
}
type RenderLayers = {[key in RenderLayersNames]: PIXI.Container}

export class AddRenderObjectAction extends Action{
  constructor(public object: any, public layer: RenderLayersNames) { super() }
}

export class RemoveRenderObjectAction extends Action{
  constructor(public object: any, public layer: RenderLayersNames) { super() }
}
// const buyBuildingAction = (building: Building) => (dispatch: Function)  =>
// 	Promise.all([
// 		dispatch(udpateResources(building.cost)),
// 		dispatch(addBuilding(building)),
// 	]).then(()=>addRenderObject())
	// 	decrease money
	// 	add new building
	// 	add new render object

  // 	render

export class RenderSystem extends System<any>{
  app: PIXI.Application
  layers: RenderLayers
  componentsGroup: [Position2DComponent, PIXISpriteComponent]
  init(store: Store) {
    // const state:RootState = store.getState()

    // const resolutionX: number = window.innerWidth
    // const resolutionY: number = window.innerHeight
    // this.app = new PIXI.Application(resolutionX, resolutionY)
    // this.layers = {
    //   cursor: new PIXI.Container(),
    //   creatures: new PIXI.Container(),
    //   buildings: new PIXI.Container(),
    //   tilemap: new  PIXI.Container(),
    // }

    // this.app.stage.addChild(this.layers.tilemap)
    // this.app.stage.addChild(this.layers.buildings)
    // this.app.stage.addChild(this.layers.creatures)
    // this.app.stage.addChild(this.layers.cursor)
    // document.getElementById('app').appendChild(this.app.view)
    // this.app.view.addEventListener('click', (event) => {
    //   // store.dispatch({type: 'canvasClick'})
    //   const { enabled, building } = store.getState().buildingCursor
    //   if (enabled) {
    //     // store.dispatch(new AddBuildingAction(building)),
    //     store.dispatch(new SuccessBuildingAction(building).action() as any)
    //   }
    // })

    // map((entity: Building | Creature) => {
    //   if (entity.sprite) {
    //     store.dispatch(new AddRenderObjectAction(entity.sprite, RenderLayersNames.buildings))
    //   }
    // },  [
    //   ...state.buildings,
    //   ...state.creatures,
    // ])
  }

  addRenderObject(state: RootState, action: AddRenderObjectAction) {
    // const layer = this.layers[action.layer]
    // layer.addChild(action.object)
    // return state
  }

  removeRenderObject(state: RootState, action: RemoveRenderObjectAction) {
    // const layer = this.layers[action.layer]
    // layer.removeChild(action.object)
    // return state
  }

  updateRenderObjects(state:RootState) {
    // this.layers.creatures.children.map((creature, i) => {
    //   creature.position.x = state.creatures[i].position.x
    //   creature.position.y = state.creatures[i].position.y
    // })
    // return state
  }
}
