import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './ui/app'
import { Provider }  from 'react-redux'

import { Game } from './game'
import {
  EntitySystem,
  // TickIncomeSystem,
  // TickOutcomeSystem,
  // RenderSystem,
  // TileMapSystem,
  // MouseInputSystem,
  // CursorSystem,
  // ResourcesSystem,
  // CreatureSpawnerSystem,
  // TowerSystem,
  TTLSystem} from './systems'
import { RootState } from './state'
import { CreaturesSystem } from './systems/creatures'
import { CreatureMoveSystem } from './systems/creatureMove'
import { BuildingsSystem } from './systems/buildings'
import { BuildingCursor, LaserTower } from './entities'
import { PIXISpriteComponent, TTLComponent } from './components'

const tickIncomeModifier = 10000
const game = new Game({ ... new RootState() }, [
  // new BuildingsSystem(),
  // new TickIncomeSystem(tickIncomeModifier),
  // new TickOutcomeSystem(tickIncomeModifier),
  // new RenderSystem(),
  new TTLSystem(),
  // new TileMapSystem(),
  // new MouseInputSystem(),
  // new CursorSystem(),
  // new ResourcesSystem(),
  // new CreatureSpawnerSystem(),
  // new CreaturesSystem(),
  // new CreatureMoveSystem(),
  // new TowerSystem(),
])

ReactDOM.render(
  <Provider store={game.store}>
    <App game={game}/>
  </Provider>,
  document.getElementById('appContainer'),
)

const laserTower = new LaserTower()
laserTower.position.x = 5
laserTower.position.y = 5
// game.addEntity(laserTower)
laserTower.addComponent(new TTLComponent())

// setTimeout(() => {
//   console.log('timeout', laserTower)
//   game.removeEntity(laserTower)
//   // laserTower.removeComponent(PIXISpriteComponent)
// }, 3000)
