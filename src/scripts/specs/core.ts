import {systemsReducer, System} from '../core/system'
import { createStore } from 'redux';

class FooSystem extends System{}


describe('core', ()=>{
	it('systemsReducer', ()=>{
		const store = createStore(state=>state)
		const fooSystem = new FooSystem()
		fooSystem.init(store)
		const reducer = systemsReducer([fooSystem])
		console.log(reducer)
	})
})