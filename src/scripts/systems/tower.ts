import { System } from '../core/system'
import { compose, map, filter } from 'ramda'
import { RootState } from '../state'
import { Building } from '../entities'
import { Creature } from '../entities/creatures'
import { Store } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from '../core'
import { RenderLayersNames, AddRenderObjectAction, RemoveRenderObjectAction } from './render'

// import { Howl, Howler } from 'howler'

interface Targerable{
  target: any
}

interface Stateable{
  state: string
}

export const canHaveTarget = (entity: any): boolean => entity.target !== undefined
export const isIdling = (entity: any): boolean => entity.state === 'idle'
export const isHaveTarget = (entity: Targerable) => entity.target
export const searchTarget = (creatures: Creature[]) => (building: Building): Creature => {
  return creatures[0]
}

type Shooter = Building
type Target = Creature

const wait = (time: number = 0) => new Promise(resolve => setTimeout(resolve, time))
export const isTargetActual = (): boolean => true

export class EndReloadAction{
  constructor(public shooter: Shooter) {}
}

export class StartReloadAction extends Action{
  constructor(public shooter: Shooter) { super() }
  action() {
    return (dispatch: ThunkDispatch<any, any, any>) => {
      wait(2000).then(() => dispatch(new EndReloadAction(this.shooter)))
      dispatch({ ... this as Object })
    }
  }
}

export class EndShootAction extends Action{
  constructor(public shooter: Shooter) { super() }
  action() {
    return (dispatch: ThunkDispatch<any, any, any>) => {
      dispatch(new RemoveRenderObjectAction(this.shooter.shootings, RenderLayersNames.creatures))
      dispatch((new StartReloadAction(this.shooter)).action())
      dispatch({ ... this as Object })
    }
  }
}

export class StartShootAction extends Action{
  constructor(public shooter: Shooter) { super() }
  action() {
    return (dispatch: ThunkDispatch<any, any, any>) => {
      const shoot = this.shooter.showShoot()
      dispatch(new AddRenderObjectAction(shoot, RenderLayersNames.creatures))
      // const sound = new Howl({
      //   src: ['public/laser.wav'],
      // })

      // sound.play()
      dispatch({ ...this as Object })
      wait(1000).then(() => dispatch(new EndShootAction(this.shooter).action()))
    }
  }
}

export class ChangeTargetAction extends Action{
  constructor(public building: Building, public target: Target) { super() }
}

export class TowerSystem extends System<any>{
  controller(store: Store) {
    const { buildings, creatures } = store.getState()
    const proceedBuilding = (building: Building) => {
      if (isHaveTarget(building)) {
        if (isTargetActual()) {
          store.dispatch(new StartShootAction(building).action() as any)
        }
      } else {
        const target = searchTarget(creatures)(building)
        if (target) store.dispatch(new ChangeTargetAction(building, target))
      }
    }
    compose(
      map(proceedBuilding),
      filter(canHaveTarget),
      filter(isIdling),
    )(buildings as Building[])
    // return state
    // 	found target
    // 	ensure target exist
    // 	wait relod
    // 	shoot
  }

  changeTarget(state: RootState, action: ChangeTargetAction) {
    const buildings = map((building: Building) => {
      if (building.id === action.building.id) {
        building.target = action.target
      }
      return building
    }, state.buildings)
    return {
      ...state,
      buildings,
    }
  }

  startShoot(state: RootState, action: StartShootAction) {
    const buildings = map((building: Building) => {
      if (building.id === action.shooter.id) {
        building.state = 'shooting'
      }
      return building
    }, state.buildings)
    return {
      ...state,
      buildings,
    }
  }

  endReload(state: RootState, action: EndReloadAction) {
    const buildings = map((building: Building) => {
      if (building.id === action.shooter.id) {
        building.state = 'idle'
      }
      return building
    }, state.buildings)
    return {
      ...state,
      buildings,
    }
  }
}

// ifElse(
//   () => false, // isHaveTarget,
//   ifElse(
//     isTargetActual,
//     building => {
//       console.log('@@@@')
//       return store.dispatch(startShoot(building, building.target) as any)
//     },
//     building => () => {
//       console.log('!!!')
//       const target = searchTarget(creatures)(building)
//       console.log('>>>', target)
//       if (target) store.dispatch(changeTarget(building, target) as any)
//     },
//   ),
//   building => () => {
//     console.log('!!!')
//     const target = searchTarget(creatures)(building)
//     console.log('>>>', target)
//     if (target) store.dispatch(changeTarget(building, target) as any)
//   },
// )
