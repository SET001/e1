import { createStore, combineReducers, Store} from 'redux'
import { injectable, inject } from "inversify";
import "reflect-metadata";
import {map, filter, reduce} from 'ramda'
import * as reduceReducers from 'reduce-reducers';
import { Action } from '../core/action';
import {System} from './system'

@injectable()
export class Game{
	store: Store
	constructor(
		public rootState: any,
		public systems: System<any>[],
	){
		const rootStateSystems = filter((s: System<any>)=>typeof s.stateSliceName ==='undefined')(systems)
		const sliceStateSystems = filter((s:System<any>)=>typeof s.stateSliceName !=='undefined')(systems)
		const sliceStateReducers = reduce((acc: {[key: string]: any}, system: System<any>)=>{
			acc[system.stateSliceName] = (state = rootState[system.stateSliceName], action: Action) =>
				system.reducer.call(system, state, action)
			return acc
		}, {})(sliceStateSystems)

		reduce((acc: {[key: string]: any}, stateKey: string)=>{
			if(acc[stateKey] === undefined){
				acc[stateKey] = (state:any)=>state || rootState[stateKey]
			}
			return acc;
		}, sliceStateReducers)(Object.keys(rootState))
		
		// @ts-ignore
		const reducer = reduceReducers.apply(reduceReducers, [
			combineReducers(sliceStateReducers),
			...map(s=>s.reducer.bind(s), rootStateSystems),
		])

		this.store = createStore(reducer, rootState)
	}

	run(){
		this.gameLoop()
	}

	gameLoop(){
		this.store.dispatch({type: 'tick'})
		requestAnimationFrame(this.gameLoop.bind(this));
	}
}