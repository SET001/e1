import {systemsReducer, System} from '../core/system'
import { createStore, combineReducers } from 'redux';
import * as reduceReducers from 'reduce-reducers';
import {map, filter, reduce} from 'ramda'
import { Action } from '../core/action';
import {assert} from 'chai'

//	states
class Building{
	constructor(
		public cost: number = 200,
		public income: number = 10,
		public outcome: number = 1,
		public name: string = 'Building'
	){}
}

class Resources{
	constructor(
		public gold: number = 0
	){}
}

interface RootState{
	[key: string]: any
	resources: Resources,
	buildings: Building[]
}

//	actions
class AddBuildingAction{
	constructor(
		public building: Building
	){}
}
class UpgradeBuildingAction{
	constructor(
		public upgrade: any,
		public buildingId: number
	){}
}
const addBuilding = (building: Building)=>({type: 'addBuilding', building})
const tickAction = {type: 'tick'}

//	systems
class BuildingsSystem extends System<Building[]>{
	stateSliceName = 'buildings'
	addBuilding(buildings: Building[], {building}: AddBuildingAction){
		return [
			...buildings,
			building
		]
	}

	removeBuilding(){}
	updateBuilding(){}
}

class TickIncomeSystem extends System<RootState>{
	tick(state: RootState): RootState{
		const {buildings, resources} = state
		const income = buildings.reduce((acc:any, {income}:Building)=>acc+=income, 0)
		return {
			...state,
			resources: {
				...resources,
				gold: resources.gold+income
			}
		}
	}
}

class TickOutcomeSystem extends System<RootState>{
	tick(state: RootState): RootState{
		const {buildings, resources} = state
		const outcome = buildings.reduce((acc:any, {outcome}:Building)=>acc+=outcome, 0)
		return {
			...state,
			resources: {
				...resources,
				gold: resources.gold-outcome
			}
		}
	}
}


describe('core', ()=>{
	it('systemsReducer', ()=>{
		const rootState:RootState = {
			buildings: [
				new Building(100, 10, 1, 'asd')
			],
			resources: {
				gold: 0
			}
		}
		const buildingsSystem = new BuildingsSystem()
		const tickIncomeSystem = new TickIncomeSystem()
		const tickOutcomeSystem = new TickOutcomeSystem()

		const systems = [
			tickIncomeSystem,
			tickOutcomeSystem,
			buildingsSystem
		]
		
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

		const store = createStore(reducer, rootState)

		store.dispatch(addBuilding(new Building(100, 10, 1, 'asd')))
		store.dispatch(tickAction)
		store.dispatch(tickAction)
		store.dispatch(tickAction)

		const finalState = store.getState()
		assert.equal(finalState.buildings.length, 2)
		assert.equal(finalState.resources.gold, 54)
	})
})