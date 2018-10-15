import { Action } from "./controller";
import {compose} from 'ramda'
import { stat } from "fs";
const { combineReducers } = require('redux')

const defaultGameState = {
	gold: 1000,
	workers: 1,
	workersIncome: 1
}
const defaultControllerState = {
	up: false,
	down: false,
	left: false,
	right: false
}
const defaultPlayerState = {
	speed: 4,
	position: {
		x: 0,
		y: 0
	},
	health: 100
}
const defaultState = {
	game: defaultGameState,
	player: {
		speed: 4,
		position: {
			x: 0,
			y: 0
		},
		health: 100
	},
	controller: defaultControllerState
}

const gameTick = state => ({
	...state,
	game: {
		...state.game,
		gold: state.game.gold+state.game.workers*state.game.workersIncome
	}
	
})
// const playerTick = state => {
// 	const actionVectors = {
// 		up: {x: 0, y: 1},
// 		down: {x: 0, y: -1},
// 		left: {x: -1, y: 0},
// 		right: {x: 1, y: 0}
// 	}

// 	const {player} = state
// 	const {position} = player
// 	console.log("&*(&", state.controller)
// 	Object.entries(actionVectors).map(([actionName, vector])=>{
// 		console.log(actionName, vector, state.controller[actionName])
// 		if (state.controller[actionName]){
// 			position.x += vector.x*player.speed
// 			position.y += vector.y*player.speed
// 		}
// 	})
// 	return {
// 		...state,
// 		player: {
// 			...player,
// 			position
// 		}
// 	}
// }
const player = (state = defaultState, action) => {
	// console.log("!!!!", state)
	// return state
	const actionVectors = {
		up: {x: 0, y: 1},
		down: {x: 0, y: -1},
		left: {x: -1, y: 0},
		right: {x: 1, y: 0}
	}
	const {player, controller} = state
	const {position} = player
	Object.entries(actionVectors).map(([actionName, vector])=>{
		if (controller[actionName]){
			position.x += vector.x*player.speed
			position.y += vector.y*player.speed
		}
	})
	switch (action.type){
		case 'tick':
			return {
				...state,
				player: {
					...player,
					position
				}
			}
		default:
			return state
	}
}

const game = (state = defaultGameState, action: any) => {
	switch (action.type){
		case 'tick':
			return {
				...state,
				gold: state.gold+state.workers*state.workersIncome
			}
		default:
			return state
	}
}

const controller = (state = defaultControllerState, action: any) => {
	switch (action.type){
		case 'controllerAction':
			const newState = {
				...state,
				...(action.states)
			}
			return newState
		default:
			return state
	}
}

export default function (state:any, action: any){
	const combinedReducer = combineReducers({game, controller, player: (state= defaultPlayerState)=>state})
	const intermediateState = combinedReducer(state, action);
	const finalState = player(intermediateState, action);
	return finalState;
}