import { canHaveTarget, TowerSystem } from '../systems/tower'

import { assert } from 'chai'
import { Creature } from '../entities/creatures'
import { LaserTower } from '../entities'
import { container } from '../test.container'

describe('Tower', () => {
  it('canHaveTarget', () => {
    assert.isFalse(canHaveTarget({ target: undefined }))

    assert.isTrue(canHaveTarget({ target: null }))
    assert.isTrue(canHaveTarget({ target: {} }))
    assert.isTrue(canHaveTarget({ target: 'assd' }))
    assert.isTrue(canHaveTarget({ target: 1 }))
    assert.isTrue(canHaveTarget({ target: [] }))
  })

  it('system', () => {
    // container.unbind('PIXI')
    // container.bind('PIXI').toConstantValue()
    const system = new TowerSystem()
    const creature = container.get<Creature>('Creature')
    const lt1 = new LaserTower()
    const lt2 = new LaserTower()
    const state = {
      buildings: [lt1, lt2],
      creatures: [creature],
    }
    const action = {
      type: 'changeTarget',
      building: lt1,
      target: creature,
    }
    const newState = system.changeTarget(state, action)
    creature.position.x = 10
    creature.position.y = 10
    assert.equal(newState.buildings[0].target, action.target)
    const finalState = system.changeTarget(newState, {
      type: 'changeTarget',
      building: lt2,
      target: creature,
    })
    console.log(finalState.buildings[0].target.position)
  })

  it('start shooting', () => {
    const system = new TowerSystem()
    const creature = container.get<Creature>('Creature')
    const lt1 = new LaserTower()
    const lt2 = new LaserTower()
    const state = {
      buildings: [lt1, lt2],
      creatures: [creature],
    }
    const action = {
      shooter: lt1,
      target: creature,
    }
    const newState = system.startShoot(state, action)
    console.log(newState.buildings[0].state)
  })
})
