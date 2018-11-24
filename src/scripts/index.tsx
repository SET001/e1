import * as React from 'react'
import 'reflect-metadata'
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
  ResourcesSystem,
  // CreatureSpawnerSystem,
  // TowerSystem,
  TTLSystem} from './systems'
import { RenderSystem } from './systems/render'
import { RootState } from './state'
import { CreaturesSystem } from './systems/creatures'
import { CreatureMoveSystem } from './systems/creatureMove'
import { BuildingsSystem } from './systems/buildings'
import { BuildingCursor, LaserTower } from './entities'
import { PIXISpriteComponent, TTLComponent } from './components'
import { Entity } from './core'
import { container } from './base.container'

const tickIncomeModifier = 10000
const game = new Game({ ... new RootState() }, [
  // new BuildingsSystem(),
  // new TickIncomeSystem(tickIncomeModifier),
  // new TickOutcomeSystem(tickIncomeModifier),
  new RenderSystem(),
  new TTLSystem(),
  // new TileMapSystem(),
  // new MouseInputSystem(),
  // new CursorSystem(),
  new ResourcesSystem(),
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
game.init()
game.run()
for (let i = 0; i < 1000; i++) {
  const x = Math.random() * 1000
  const y = Math.random() * 1000
  const tower = game.addEntity(LaserTower, {
    position: { x, y },
  })
}
