import { Store, Reducer } from 'redux'

export class System{
	init(store: Store){}
}


// const splitReducers = systems => (state, action) =>
// 	compose.apply(null, map(s=>s(action), reverse(systems)))(state)

export function systemsReducer(systems:System[]):Reducer{
	return state=>state
}