import { createStore, applyMiddleware} from 'redux'
import { injectable, inject } from "inversify";
import "reflect-metadata";
import {compose, map, reverse} from 'ramda'
import {defaultState} from '../defaultState'
import {System} from './system'

@injectable()
export class Game{
	store: any
	constructor(
		@inject("SystemsList") public systems: System[]
	){
		// this.store = createStore(reducer)
	}

	run(){
		this.gameLoop()
	}

	gameLoop(){
		this.store.dispatch({type: 'tick'})
		requestAnimationFrame(this.gameLoop.bind(this));
	}
}