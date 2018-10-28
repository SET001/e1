import { ThunkDispatch } from 'redux-thunk'
import { System } from '../core/system'
import { RootState } from '../state'
import { Creature } from '../entities/creatures'
import { AddRenderObjectAction, RenderLayersNames } from './render'
import { CreatureAddAction } from './creatures'

type getState = () => RootState

export const shouldSpawn = () => Math.ceil(Math.random() * 100) === 1
export const randomCreature = () => {
  const sprites = [
    'lolBoy.png',
    'creature.png',
    'titoPuente.png',
    'invisibleWoman.png',
    'panda.png',
    'sandwichDeliveryGuy.png',
    'storm.png',
    'manVampire.png',
    'drHibbert.png',
    'homer.png',
    'nelson.png',
    'popopo.png',
  ]
  const spriteIndex = Math.ceil(Math.random() * (sprites.length)) - 1
  const creature = new Creature(sprites[spriteIndex])
  let x = Math.ceil(Math.random() * 20) - 1
  let y = Math.ceil(Math.random() * 20) - 1
  if ((Math.random() * 2) > 1) {
    x = 20 / x > 2 ? 19 : 0
  } else {
    y = 20 / y > 2 ? 19 : 0
  }
  creature.position.x = x * 32
  creature.sprite.position.x = creature.position.x
  creature.position.y = y * 32
  creature.sprite.position.y = creature.position.y

  return creature
}

export const spawnCreature = () => (dispatch: ThunkDispatch<any, any, any>, getState: getState) => {
  if (shouldSpawn()) {
    const creature: Creature = randomCreature()
    return Promise.all([
      dispatch(new AddRenderObjectAction(creature.sprite, RenderLayersNames.creatures)),
      dispatch(new CreatureAddAction(creature)),
    ])
  }
}

export class CreatureSpawnerSystem extends System<any>{}
