import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/app'
import { Provider }  from 'react-redux'

import { Game } from './core/game'
import {
  TickIncomeSystem,
  TickOutcomeSystem,
  RenderSystem,
  TileMapSystem,
  MouseInputSystem,
  CursorSystem,
  ResourcesSystem,
  CreatureSpawnerSystem,
  TowerSystem} from './systems'
import { rootState } from './state'
import { CreaturesSystem } from './systems/creatures'
import { CreatureMoveSystem } from './systems/creatureMove'
import { BuildingsSystem } from './systems/buildings'

const tickIncomeModifier = 10000
const game = new Game(rootState, [
  new BuildingsSystem(),
  new TickIncomeSystem(tickIncomeModifier),
  new TickOutcomeSystem(tickIncomeModifier),
  new RenderSystem(),
  new TileMapSystem(),
  new MouseInputSystem(),
  new CursorSystem(),
  new ResourcesSystem(),
  // new CreatureSpawnerSystem(),
  new CreaturesSystem(),
  new CreatureMoveSystem(),
  new TowerSystem(),
])

ReactDOM.render(
  <Provider store={game.store}>
    <App game={game}/>
  </Provider>,
  document.getElementById('appContainer'),
)
