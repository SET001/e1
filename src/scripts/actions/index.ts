import { Building } from '../entities'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../state'
// import { shouldSpawn, randomCreature } from '../systems'
// import { Creature } from '../entities/creatures'
import { lowerizeFirstLetter } from '../utils'

type getState = () => RootState
// // 	resources
// export const udpateResources = (gold: number) => ({ type:'udpateResources', payload: gold })

// // buildings
// export const addBuilding = (building: Building) => ({ type: 'addBuilding' })
export const startBuilding = (building: Building) => ({ type:'startBuilding', payload: building })
// export const cancelBuilding = () => ({ type:'cancelBuilding' })
// export const successBuilding = () =>
//   (dispatch: ThunkDispatch<any, any, any>, getState:getState) => {
//     const state = getState()
//     const { building } = state.buildingCursor
//     const { gold } = state.resources
//     console.log('success building', building, getState())
//     return Promise.all([
//       dispatch(addRenderObject(state.buildingCursor.building.sprite, 'buildings')),
//       dispatch(udpateResources(gold - building.cost)),
//       // dispatch(addBuilding(building)),
//     ]).then(() => dispatch({
//       type:'successBuilding',
//     }))
//   }

export const tick = () => (dispatch: ThunkDispatch<any, any, any>, getState: getState) => {
	// dispatch(spawnCreature())
}

export class Action{
  type: string = ''
  constructor() {
    this.type = lowerizeFirstLetter(this.constructor.name.split('Action').shift())
  }
}