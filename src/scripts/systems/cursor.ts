import * as PIXI from 'pixi.js'
import { System } from '../core/system'
import { RootState } from '../state'
import { Action } from '../core/action'
import { Store } from 'redux'
import { AddRenderObjectAction, RenderLayersNames } from './render'
import { MouseMoveAction } from './mouseInput'
import { StartBuildingAction } from './buildings'

export class CursorSystem extends System<any>{
  sprite: any
  init(store: Store) {
    this.sprite = PIXI.Sprite.fromImage('public/chess_tower.png')
    this.sprite.position.set(100, 100)
    this.sprite.visible = false
    this.sprite.alpha = 0.7
    store.dispatch(new AddRenderObjectAction(this.sprite, RenderLayersNames.cursor))
  }

  mouseMove(state: RootState, action: MouseMoveAction) {
    if (state.buildingCursor.enabled) {
      this.sprite.position.set(
        Math.ceil(action.x / 32 - 1) * 32,
        Math.ceil(action.y / 32 - 1) * 32,
      )
      state.buildingCursor.building.sprite.position.set(
        Math.ceil(action.x / 32 - 1) * 32,
        Math.ceil(action.y / 32 - 1) * 32,
      )
      state.buildingCursor.building.position.x = Math.ceil(action.x / 32 - 1) * 32
      state.buildingCursor.building.position.y = Math.ceil(action.y / 32 - 1) * 32
    }
    return state
  }

  canvasClick(state: RootState) {
    if (state.buildingCursor.enabled) {
      this.sprite.visible = false
      return {
        ...state,
        buildingCursor: {
          ...state.buildingCursor,
          enabled: this.sprite.visible,
        },
        resources: {
          ...state.resources,
          gold: state.resources.gold - 100,
        },
      }
    }
    return state
  }

  startBuilding(state: RootState, action: StartBuildingAction) {
    this.sprite.visible = true
    return {
      ...state,
      buildingCursor: {
        ...state.buildingCursor,
        building: action.building,
        enabled: this.sprite.visible,
      },
    }
  }

  cancelBuilding(state: RootState) {
    this.sprite.visible = false
    return {
      ...state,
      buildingCursor: {	// 	TODO: remove building from cursor
        ...state.buildingCursor,
        enabled: this.sprite.visible,
      },
    }
  }

  successBuilding(state: RootState) {
    this.sprite.visible = false
    return {
      ...state,
      buildingCursor: {	// 	TODO: remove building from cursor
        ...state.buildingCursor,
        enabled: this.sprite.visible,
      },
    }
  }
}
