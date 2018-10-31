import { Homer } from '../entities/homer'
import { Game } from '../core/game'
import { System } from '../core'
import { Position2DComponent, PIXISpriteComponent, Position3DComponent } from '../components'
import { stub } from 'sinon'
import { assert } from 'chai'

class ComponentsGroup {
  position = new Position2DComponent()
  render = new PIXISpriteComponent()
}

class TestSystem extends System<any>{
  componentsGroup = new ComponentsGroup()
  onNewEntity() {}
}

describe.only('ecs basics', () => {
  it('test', () => {
    const rootState = {
      entities: [] as any[],
      ui: {},
    }
    const system = new TestSystem()
    const game = new Game(rootState, [system])
    stub(system, 'onNewEntity')
    const homer = new Homer()
    game.addEntity(homer)
    assert.isTrue((system.onNewEntity as sinon.SinonStub).called)
    const args = (system.onNewEntity as sinon.SinonStub).args[0][0]
    assert.isDefined(args.position)
    assert.isDefined(args.render)
  })
})
