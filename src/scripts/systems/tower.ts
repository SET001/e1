import { System } from '../core/system'
import { compose, map, filter, ifElse } from 'ramda'
import { RootState } from '../state'
import { Building } from '../entities'
import { Creature } from '../entities/creatures'
import { Store } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import buildings from '../components/buildings'
import { TargetTypeEnum } from 'inversify'
// import { Howl, Howler } from 'howler'

export const canHaveTarget = entity => entity.target !== undefined
export const isIdling = entity => entity.state === 'idle'
export const isHaveTarget = entity => entity.target
export const searchTarget = (creatures: Creature[]) => (building: Building): Creature => {
  return creatures[0]
  // console.log('searching for target among', creatures)
}

type Shooter = Building
type Target = Creature

export const isTargetActual = (): boolean => true
const wait = (time: number = 0) => new Promise((resolve, reject) => setTimeout(resolve, time))
export const endReload = (shooter: Shooter) => ({
  shooter,
  type: 'endReload',
})
export const startReload = (shooter: Shooter) =>
  (dispatch: ThunkDispatch<any, any, any>) => {
    wait(2000).then(() => dispatch(endReload(shooter)))
    dispatch({
      shooter,
      type: 'startReload',
    })
  }

export const endShoot = (shooter: Shooter) =>
  (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({
      type: 'removeRenderObject',
      layer: 'creatures',
      payload: shooter.shootings,
    })
    dispatch(startReload(shooter))
    dispatch({
      shooter,
      type: 'endShoot',
    })
  }

export const startShoot = (shooter: Shooter) =>
  (dispatch: ThunkDispatch<any, any, any>) => {
    const shoot = shooter.showShoot()
    dispatch({
      type: 'addRenderObject',
      layer: 'creatures',
      payload: shoot,
    })
    // const sound = new Howl({
    //   src: ['public/laser.wav'],
    // })

    // sound.play()

    wait(1000).then(() => dispatch(endShoot(shooter)))
    dispatch({
      shooter,
      type: 'startShoot',
    })
  }

export const changeTarget = (building: Building, target: Creature) =>
  // console.log('triggering change target action')
  ({
    building,
    target,
    type: 'changeTarget',
  })

export const proceedTarget = (creatures: Creature[]) => (building: Building) => true
  // (dispatch: ThunkDispatch<any, any, any>) =>
	//   ifElse(isTargetActual, dispatch(startShoot), searchTarget(creatures))

export class TowerSystem extends System<any>{
  controller(store: Store) {
    const { buildings, creatures } = store.getState()
    const proceedBuilding = (building: Building) => {
      if (isHaveTarget(building)) {
        if (isTargetActual()) {
          store.dispatch(startShoot(building) as any)
        }
      } else {
        // console.log('!!!')
        const target = searchTarget(creatures)(building)
        // console.log('>>>', target)
        if (target) store.dispatch(changeTarget(building, target) as any)
      }
    }
    compose(
      map(proceedBuilding),
      filter(isIdling),
      filter(canHaveTarget),
    )(buildings as any)
    // return state
    // 	found target
    // 	ensure target exist
    // 	wait relod
    // 	shoot
  }

  changeTarget(state: RootState, action) {
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

  startShoot(state: RootState, action) {
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

  endReload(state, action) {
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
