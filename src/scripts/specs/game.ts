import { System } from "../core/system"
import { Game } from "../core/game"
import { stub, SinonStub } from 'sinon'
import { assert } from 'chai'

class TestSystem extends System<any>{

}

describe('Game', ()=>{
	describe('add system', ()=>{
		it('should init sysmtes', ()=>{
			const testSystem = new TestSystem()
			stub(testSystem, 'init')
			new Game({}, [testSystem]).init()
			assert.equal((testSystem.init as SinonStub).called, true)
		})
	})
})