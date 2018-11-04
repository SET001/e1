import { Homer } from '../entities/homer'
import { Game } from '../game'
import { System, Entity, Component } from '../core'
import { Position2DComponent, PIXISpriteComponent, Position3DComponent } from '../components'
import { stub } from 'sinon'
import { assert } from 'chai'
import { EntitySystem } from '../systems'

class ComponentsGroup {
  position = new Position2DComponent()
  render = new PIXISpriteComponent()
}

class TestSystem extends System<any>{
  componentsGroup = new ComponentsGroup()
  onNewEntity() {}
}

class TestEntity extends Entity{
  test = new TestComponent()
}

class TestComponent extends Component{
  foo: number = 123
  blah: string = 'blah'
}

describe('ecs basics', () => {
  describe('components', () => {
    it('should reassign values on creation', () => {
      const component = new TestComponent().init({ foo: 12323 })
      assert.equal(component.foo, 12323)
      assert.equal(component.blah, 'blah')
    })
  })

  describe('entities', () => {
    it('should reassign components values', () => {
      const entity = new TestEntity()
      // entity.test.
    })
  })

  describe('game', () => {

    describe('addEntity', () => {
      it('asdadsasd', () => {
        const rootState = {
          entities: [] as any[],
          // ui: {},
        }
        const game = new Game(rootState, [new EntitySystem()])
        // const entity = game.addEntity(TestEntity)
        // console.log(entity, game.store.getState())

      })
    })
  })
  // it('test', () => {
    // const rootState = {
    //   entities: [] as any[],
    //   ui: {},
    // }
    // // stub(system, 'onNewEntity')
    // const system = new TestSystem()
    // const game = new Game(rootState, [system])
    // const entity = new TestEntity()
    // game.addEntity(entity)
    // entity.addComponent(new TestComponent())
    // console.log(entity)
    // assert.isTrue((system.onNewEntity as sinon.SinonStub).called)
    // const args = (system.onNewEntity as sinon.SinonStub).args[0][0]
    // assert.isDefined(args.position)
    // assert.isDefined(args.render)
  // })

})
