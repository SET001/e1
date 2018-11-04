import { createStore, combineReducers, Store, applyMiddleware, Reducer } from 'redux'
import { injectable } from 'inversify'
import 'reflect-metadata'
import thunk from 'redux-thunk';  //  tslint:disable-line
import { compose, reduce, filter, map, values, without, isEmpty, toPairs, find } from 'ramda'
import * as reduceReducers from 'reduce-reducers'
import { Action, Entity, System } from './core'
import { classNameType, plainObject } from './middlewares'
import { composeWithDevTools } from 'redux-devtools-extension'
import { EntitySystem, AddSystemAction, SystemManager, EntityAddAction, EntityRemoveAction } from './systems'

const defaultState = {
  systems: [] as System<any>[],
  entities: [] as Entity[],
}
// @injectable()
export class Game{
  store: Store
  coreSystems: System<any>[] = [new SystemManager(), new EntitySystem()]
  reducer: Reducer

  constructor(
		state: any = {},
	  systems: System<any>[] = [],
	) {
    const usestate = Object.assign({}, state, defaultState)
    const systemsToAdd = [...this.coreSystems, ...systems]
    this.reducer = this.createReducer(systemsToAdd, usestate)
    this.createStore(this.reducer, usestate)
    map((s: System<any>) => {
      s.init(this.store)
      this.store.dispatch(new AddSystemAction(s))
    }, systemsToAdd)
  }

  createReducer(systems: System<any>[], state: any) {
    const sliceStateSystems = filter(
      (s:System<any>) => typeof s.stateSliceName !== 'undefined',
    )(systems)
    const rootStateSystems = filter(
      (s: System<any>) => typeof s.stateSliceName === 'undefined',
    )(systems)
    const sliceStateReducers = reduce((acc: {[key: string]: any}, system: System<any>) => {
      acc[system.stateSliceName] = (slice = state[system.stateSliceName], action: Action) =>
        system.reducer.call(system, slice, action)
      return acc
    }, {})(sliceStateSystems)

    //  this is to put void reducers for state slices for which there are no reducers
    reduce((acc: {[key: string]: any}, stateKey: string) => {
      if (acc[stateKey] === undefined) {
        acc[stateKey] = (s:any) => s || state[stateKey]
      }
      return acc
    }, sliceStateReducers)(Object.keys(state))
    // @ts-ignore
    return reduceReducers.apply(reduceReducers, [
      combineReducers(sliceStateReducers),
      ...map(s => s.reducer.bind(s), rootStateSystems),
    ])
  }

  createStore(reducer: Reducer, state: any) {
    this.store = createStore(
      reducer,
      state,
      composeWithDevTools(
        applyMiddleware(
          thunk,
          classNameType,
          plainObject,
        ),
      ),
    )
  }

  addSystem(system: System<any>) {
    system.init(this.store)
    const state = this.store.getState()
    this.store.replaceReducer(this.createReducer([...state.systems, system], state))
    this.store.dispatch(new AddSystemAction(system))
  }

  removeSystem(system: System<any>) {
    this.store.dispatch(new AddSystemAction(system))
    const state = this.store.getState()
    this.store.replaceReducer(this.createReducer(state.systems, state))
  }

  addEntity(entityClass: { new(): Entity }) {
    const entity = new entityClass()
    entity.store = this.store
    const event = new EntityAddAction(entity).action(this.store.getState().systems)
    this.store.dispatch(event)
    return entity
  }

  // removeEntity(entity: Entity) {
  //   console.log('game removeEntity', entity)
  //   this.store.dispatch(new EntityRemoveAction(entity))
  // }

  // init() {
  //   map((s: System<any>) => s.init(this.store), this.systems)
  // }

  run() {
    this.gameLoop()
  }

  gameLoop() {
  //   map(system => system.controller(this.store), this.systems)
  //   // this.store.dispatch({ type: 'tick' })
  //   // const spawn = Math.ceil(Math.random() * 100) === 1
  //   // // this.store.dispatch(spawnCreature() as any);
  //   // this.store.dispatch(moveCreatures())
  //   // this.store.dispatch({ type: 'updateRenderObjects' })
  //   requestAnimationFrame(this.gameLoop.bind(this))
  }
}
