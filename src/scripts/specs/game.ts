import { stub, SinonStub } from 'sinon'
import { assert } from 'chai'
import { Entity, Component, System } from '../core'
import { Game } from '../game'

class TestComponent extends Component{
  something = 431
}

class ComponentsGroup{
  test = new TestComponent()
}
class TestSystem extends System<ComponentsGroup>{
  componentsGroup = new ComponentsGroup()

  testAction(state: any, action: any) {
    return state
  }
}

class FooSystem extends System<any>{
  testAction(state: any, action: any) {
    return state
  }
}

class TestSliceSystem extends System<any>{
  stateSliceName = 'test'
  testAction(state: any, action: any) {
    return 123
  }
}

const defaultState = {
  test: {},
}
describe('Game', () => {
  describe('common', () => {
    it('should create instance with default values', () => {
      const game = new Game()
      const state = game.store.getState()
      assert.isDefined(state.systems)
    })
    it('initial state', () => {
      const game = new Game({ lol: 123 })
      const state = game.store.getState()
      assert.isDefined(state.systems)
      assert.isDefined(state.lol)
    })
  })

  describe('add system', () => {
    let system: TestSystem
    let system2: FooSystem
    let sliceSystem: TestSliceSystem
    let game: Game

    beforeEach(() => {
      system = new TestSystem()
      system2 = new FooSystem()
      sliceSystem = new TestSliceSystem()
      game = new Game(defaultState)
    })

    it('should init systems', () => {
      stub(system, 'init')
      game.addSystem(system)
      assert.equal((system.init as SinonStub).called, true)
    })

    it('should call systems action', () => {
      stub(system, 'testAction').callThrough()
      game.addSystem(system)
      game.store.dispatch({
        type: 'testAction',
      })
      assert.equal((system.testAction as SinonStub).called, true)
    })

    it('should call slice system action', () => {
      stub(sliceSystem, 'testAction').callThrough()
      game.addSystem(sliceSystem)
      game.store.dispatch({
        type: 'testAction',
      })
      const state = game.store.getState()
      assert.equal((sliceSystem.testAction as SinonStub).called, true)
      assert.equal(state.test, 123)
    })

    it('should call same actions from multiple systems', () => {
      stub(system, 'testAction').callThrough()
      stub(system2, 'testAction').callThrough()
      game.addSystem(system)
      game.addSystem(system2)
      game.store.dispatch({
        type: 'testAction',
      })
      assert.equal((system2.testAction as SinonStub).called, true, 'should call second system action')
      assert.equal((system.testAction as SinonStub).called, true, 'should call first system action')
      assert.equal(game.store.getState().systems.length, game.coreSystems.length + 2)
    })
  })

  describe('removeSystem', () => {

  })

  class TestEntity extends Entity{}
  describe('addEntity', () => {
    it('should create entity', () => {
      const game = new Game()
      game.addSystem(new TestSystem())
      const entity = game.addEntity(TestEntity)
      assert.isTrue(entity instanceof TestEntity)
    })
  })
})
