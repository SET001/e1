import { Entity, Component, System, PrimitiveComponent } from '../../core'
import { EntityAddAction, EntitySystem, createComponentGroup, entityAddComponent } from '../../systems'
// import { Game } from '../../game'
import { assert } from 'chai'
import { stub, SinonStub } from 'sinon'
import { GameObject } from '../../entities/gameObject'

class TestEntity extends Entity{
  blah = new TestComponent()
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
      it('should have all keys needed', () => {
        const compGroup = createComponentGroup(new TestSystem(), new TestEntity)
        assert.isDefined(compGroup.test)
      })
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
      describe('entityRemove', () => {
        it('should remove entity from state', () => {
          const entitySystem = new EntitySystem()
          const entities = [
            new GameObject(),
            new GameObject(),
          ]
          const action = {
            type: 'entityRemove',
            entity: entities[0],
          }
          const newState = entitySystem.entityRemove(entities, action)
          assert.equal(newState.length, 1)
        })
      })

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

          const entity = new TestEntity()
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

      describe.only('entityAddComponent', () => {
        class IDComponent extends PrimitiveComponent{
          constructor(public value: any) { super() }
        }
        it('should add component to entity', () => {
          const entity = new Entity()
          const entities = [entity]
          const component = new TestComponent()
          const newEntities = entityAddComponent(entities, {
            entity,
            component,
            systems: [],
            type: 'entityAddComponent',
          })
          assert.equal((newEntities[0] as any).test, component)
        })

        it('sould add primitive component', () => {
          const entity = new Entity()
          const entities = [entity]
          const component = new IDComponent(123)
          const newEntities = entityAddComponent(entities, {
            entity,
            component,
            systems: [],
            type: 'entityAddComponent',
          })
          assert.equal((newEntities[0] as any).id, 123)
        })

        it('should trigger onNewEntity for mutching systems', () => {
          const entity = new Entity()
          const entities = [entity]
          const component = new TestComponent()
          const system = new TestSystem()
          stub(system, 'onNewEntity')
          const action = {
            entity,
            component,
            systems: [system],
            type: 'entityAddComponent',
          }
          const newEntities = entityAddComponent(entities, action)
          assert.isTrue((system.onNewEntity as SinonStub).called)
          const args = (system.onNewEntity as SinonStub).args.pop().pop()
          assert.equal(args.test.test, 'test')
        })
      })
    })

  })
})
