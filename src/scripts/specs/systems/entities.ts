import { Entity } from '../../core'
import { EntityAddAction } from '../../systems'
import { Game } from '../../game'

class TestEntity extends Entity{}

describe('Systems', () => {
  describe('EntitySystem', () => {
    it('add entity action', () => {
      const game = new Game()
      const entity = game.addEntity(TestEntity)
      const action = new EntityAddAction(entity)
    })
  })
})
