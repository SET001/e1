import { Container } from 'inversify'

import { Game } from './game'
import * as Systems from './systems'
import { Creature } from './entities/creatures'

class Action{
  state: boolean = false
  constructor(public name: string, public keys: string[]) {}
}
// import { PhysicService, CannonPhysicService } from './services/physic'

const container = new Container()
container.bind('Creature').to(Creature)

// container.bind<any>('Game').to(Game)
// container.bind<any>('SystemsList').toConstantValue([
// 	new Systems.TickIncome(),
// 	new Systems.TickOutcome(),
// 	new Systems.KeyboardInput([
// 		new Action('left', ['KeyA', 'ArrowLeft', 'Numpad4']),
// 		new Action('right', ['KeyD', 'ArrowDown', 'Numpad6']),
// 		new Action('up', ['KeyW', 'ArrowUp', 'Numpad8']),
// 		new Action('down', ['KeyS', 'ArrowDown', 'Numpad5']),
// 	])
// ])

// const actions =
export { container }
