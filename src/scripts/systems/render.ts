import * as PIXI from 'pixi.js'
import { System } from '../core/system'
import { Store } from 'redux'
import { RootState } from '../state'
// import { Building } from '../entities'
// import { map } from 'ramda'
// import { Creature } from '../entities/creatures'
import config from '../config'

import { Action } from '../core/action'
// import { SuccessBuildingAction, AddBuildingAction } from './buildings'
import { Position2DComponent, PIXISpriteComponent, IDComponent } from '../components'

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
class ComponentsGroup {
  position = new Position2DComponent()
  render = new PIXISpriteComponent()
  id = new IDComponent()
}
export class RenderSystem extends System<any>{
  app: PIXI.Application
  layers: RenderLayers
  sprites: {[key: number]: PIXI.Sprite} = {}
  componentsGroup = new ComponentsGroup()

  init(store: Store) {
    const resolutionX: number = window.innerWidth
    const resolutionY: number = window.innerHeight
    this.app = new PIXI.Application(resolutionX, resolutionY)
    document.getElementById('app').appendChild(this.app.view)
    // this.app.view.addEventListener('click', (event) => {
    //   // store.dispatch({type: 'canvasClick'})
    //   const { enabled, building } = store.getState().buildingCursor
    //   if (enabled) {
    //     // store.dispatch(new AddBuildingAction(building)),
    //     store.dispatch(new SuccessBuildingAction(building).action() as any)
    //   }
    // })
  }

  onNewEntity(entity: ComponentsGroup) {
    const sprite = PIXI.Sprite.fromImage(`${config.publicPath}/${entity.render.spriteName}`)
    sprite.position.x = entity.position.x * config.tileSize
    sprite.position.y = entity.position.y * config.tileSize
    this.app.stage.addChild(sprite)
    this.sprites[entity.id.id] = sprite
  }

  onRemoveEntity(entity: ComponentsGroup) {
    console.log('render system onRemoveEntity', entity)
    const sprite = this.sprites[entity.id.id]
    this.app.stage.removeChild(sprite)
  }

  updateRenderObjects(state:RootState) {
    // this.layers.creatures.children.map((creature, i) => {
    //   creature.position.x = state.creatures[i].position.x
    //   creature.position.y = state.creatures[i].position.y
    // })
    // return state
  }
}
