import * as PIXI from 'pixi.js'
import { System } from '../core/system'
import { Store } from 'redux'
import { RootState } from '../state'
// import { Building } from '../entities'
import { toPairs, without, omit } from 'ramda'
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

export class UpdatePositionAction extends Action{
  constructor(public objects: ComponentsGroup[]) { super() }
}
class ComponentsGroup {
  position = new Position2DComponent()
  render = new PIXISpriteComponent()
  id = new IDComponent()
}

export class RenderSystem extends System<any>{
  app: PIXI.Application
  layers: RenderLayers
  sprites: {[key: number]: PIXI.Sprite} = {}
  container = new PIXI.particles.ParticleContainer(200000)
  componentsGroup = new ComponentsGroup()
  pixi: {[keys in keyof typeof PIXI]: any}

  init(store: Store) {
    const resolutionX: number = window.innerWidth
    const resolutionY: number = window.innerHeight
    this.app = new PIXI.Application(resolutionX, resolutionY)
    document.getElementById('app').appendChild(this.app.view)
    this.app.stage.addChild(this.container)
    let isMoving = false
    this.app.view.addEventListener('mouseup', (event) => {
      isMoving = false
    })
    this.app.view.addEventListener('mousedown', (event) => {
      isMoving = true
    })
    this.app.view.addEventListener('mousemove', (event) => {
      if (isMoving) {
        this.container.position.x += event.movementX
        this.container.position.y += event.movementY
      }
    })
    this.app.view.addEventListener('wheel', (event) => {
      const scaleChange = event.deltaY / 1000 * -1
      this.container.scale.x += scaleChange
      this.container.scale.y += scaleChange
      // console.log('wheel', event, scaleChange, this.container.scale)
    })

    // this.pixi.
    // this.app.view.addEventListener('click', (event) => {
    //   // store.dispatch({type: 'canvasClick'})
    //   const { enabled, building } = store.getState().buildingCursor
    //   if (enabled) {
    //     // store.dispatch(new AddBuildingAction(building)),
    //     store.dispatch(new SuccessBuildingAction(building).action() as any)
    //   }
    // })
  }

  updatePosition(state: RootState, action: UpdatePositionAction) {
    action.objects.map((object: ComponentsGroup) => {
      const sprite = this.sprites[object.id.valueOf()]
      sprite.position.set(object.position.x, object.position.y)
    })
  }

  onNewEntity(entity: ComponentsGroup) {
    const sprite = PIXI.Sprite.fromImage(`${config.publicPath}/${entity.render.spriteName}`)
    sprite.position.x = entity.position.x
    sprite.position.y = entity.position.y
    this.container.addChild(sprite)
    this.sprites[entity.id.valueOf()] = sprite
  }

  onRemoveEntity(entity: ComponentsGroup) {
    const sprite = this.sprites[entity.id.valueOf()]
    this.sprites = omit([entity.id.toString()], this.sprites)
    this.container.removeChild(sprite)
  }
}
