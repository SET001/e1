import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from './components/app'
import { Provider }  from 'react-redux'

import { Game } from "./core/game";
import {TickIncomeSystem, TickOutcomeSystem, RenderSystem, TileMapSystem, MouseInputSystem, CursorSystem, ResourcesSystem} from './systems'
import {rootState} from './state'

const tickIncomeModifier = 10000
const game = new Game(rootState, [
  new TickIncomeSystem(tickIncomeModifier),
	new TickOutcomeSystem(tickIncomeModifier),
	new RenderSystem(),
	new TileMapSystem(),
	new MouseInputSystem(),
	new CursorSystem(),
	new ResourcesSystem()
])

ReactDOM.render(
  <Provider store={game.store}>
    <App game={game}/>
  </Provider>,
  document.getElementById('appContainer')
);