import { createStore, combineReducers, Store, applyMiddleware, compose } from 'redux'
import { injectable } from 'inversify'
import 'reflect-metadata'
import thunk from 'redux-thunk';  //  tslint:disable-line
import { map, filter, reduce } from 'ramda'
import * as reduceReducers from 'reduce-reducers'
import { Action } from '../core/action'
import { System } from './system'
import { spawnCreature } from '../systems/creatureSpawner'
import { moveCreatures } from '../systems/creatureMove'
import { classNameType, plainObject } from '../middlewares'
import { composeWithDevTools } from 'redux-devtools-extension'

@injectable()
export class Game{
  store: Store
  constructor(
		public rootState: any,
		public systems: System<any>[],
	) {
    const rootStateSystems = filter(
      (s: System<any>) => typeof s.stateSliceName === 'undefined',
    )(systems)
    const sliceStateSystems = filter(
      (s:System<any>) => typeof s.stateSliceName !== 'undefined',
    )(systems)
    const sliceStateReducers = reduce((acc: {[key: string]: any}, system: System<any>) => {
      acc[system.stateSliceName] = (state = rootState[system.stateSliceName], action: Action) =>
				system.reducer.call(system, state, action)
      return acc
    },                                {})(sliceStateSystems)
    reduce((acc: {[key: string]: any}, stateKey: string) => {
      if (acc[stateKey] === undefined) {
        acc[stateKey] = (state:any) => state || rootState[stateKey]
      }
      return acc
    },     sliceStateReducers)(Object.keys(rootState))

      // @ts-ignore
    const reducer = reduceReducers.apply(reduceReducers, [
      combineReducers(sliceStateReducers),
      ...map(s => s.reducer.bind(s), rootStateSystems),
    ])
    // console.log('>>>', window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)

    this.store = createStore(
      reducer,
      rootState,
      composeWithDevTools(
        applyMiddleware(
          thunk,
          classNameType,
          plainObject,
        ),
      ),
    )
  }

  init() {
    map((s: System<any>) => s.init(this.store), this.systems)
  }

  run() {
    this.gameLoop()
  }

  gameLoop() {
    map(system => system.controller(this.store), this.systems)
    // this.store.dispatch({ type: 'tick' })
    // const spawn = Math.ceil(Math.random() * 100) === 1
    // // this.store.dispatch(spawnCreature() as any);
    // this.store.dispatch(moveCreatures())
    // this.store.dispatch({ type: 'updateRenderObjects' })
    requestAnimationFrame(this.gameLoop.bind(this))
  }
}
