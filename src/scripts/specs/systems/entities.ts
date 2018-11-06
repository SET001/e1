import { Entity, Component, System } from '../../core'
import { EntityAddAction, EntitySystem } from '../../systems'
// import { Game } from '../../game'
import { assert } from 'chai'
import { stub, SinonStub } from 'sinon'

class TestEntity extends Entity{
  test = new TestComponent()
}

class FooEntity extends Entity{
  foo = new FooComponent()
}

class TestComponent extends Component{
  test = 'test'
}
class FooComponent extends Component{}

class ComponentGroup{
  test = new TestComponent()
}

class TestSystem extends System<ComponentGroup>{
  componentsGroup = new ComponentGroup()
}
class FooSystem extends System<any>{}
class BlahSystem extends System<any>{}

describe('Systems', () => {
  describe('EntitySystem', () => {
    describe('createComponentGroup', () => {

    })
    describe('actions', () => {
      describe('EntityAddAction', () => {
        it('should populate systems if entity mutch them', () => {
          const entity = new TestEntity()
          const action: EntityAddAction = new EntityAddAction(entity).action([new TestSystem()])
          assert.equal(action.systems.length, 1)
        })

        it('should stay systems empty if entity don`t mutch any', () => {
          const entity = new FooEntity()
          const action: EntityAddAction = new EntityAddAction(entity).action([new TestSystem()])
          assert.equal(action.systems.length, 0)
        })
      })
    })

    describe('system', () => {
      describe('entityAdd', () => {
        let entitySystem: EntitySystem
        let testSystem: TestSystem
        let fooSystem: FooSystem
        let blahSystem: BlahSystem
        let state: any[]

        beforeEach(() => {
          entitySystem = new EntitySystem()
          testSystem = new TestSystem()
          fooSystem = new FooSystem()
          blahSystem = new BlahSystem()
          stub(testSystem, 'onNewEntity')
          stub(fooSystem, 'onNewEntity')
          stub(blahSystem, 'onNewEntity')

          const entity = new Entity()
          entity.systems.push(blahSystem)
          entity.systems.push(fooSystem)
          const action = {
            entity,
            type: 'entityAdd',
            systems: [testSystem, blahSystem],
          }
          state = entitySystem.entityAdd([], action)
        })

        it('should add entity to state', () => assert.equal(state.length, 1))
        it('should call onNewEntity for each new system', () => {
          assert.isTrue((testSystem.onNewEntity as SinonStub).called)
          console.log((testSystem.onNewEntity as SinonStub).args[0])

        })
        it('should not call onNewEntity for system where this entity alriedy exist even if it is actions systems array', () => {
          assert.isFalse((blahSystem.onNewEntity as SinonStub).called)
        })

        it('should not call onNewEntity for system where this entity alriedy exist', () => {
          assert.isFalse((fooSystem.onNewEntity as SinonStub).called)
        })

        it('should add system to entity', () => {
          assert.equal(state[0].systems.length, 3)
        })
      })
    })

  })
})
