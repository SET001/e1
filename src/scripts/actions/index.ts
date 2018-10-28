import { Building } from '../entities'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../state'
// import { shouldSpawn, randomCreature } from '../systems'
// import { Creature } from '../entities/creatures'

type getState = () => RootState
// // 	resources
// export const udpateResources = (gold: number) => ({ type:'udpateResources', payload: gold })

// // buildings
// export const addBuilding = (building: Building) => ({ type: 'addBuilding' })
// export const cancelBuilding = () => ({ type:'cancelBuilding' })

export const tick = () => (dispatch: ThunkDispatch<any, any, any>, getState: getState) => {
	// dispatch(spawnCreature())
}
