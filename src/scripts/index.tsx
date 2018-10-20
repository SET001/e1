import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from './components/app'
import { Provider }  from 'react-redux'

import { Game } from "./core/game";
import {TickIncomeSystem, TickOutcomeSystem} from './systems'
import {rootState} from './state'

const game = new Game(rootState, [
  new TickIncomeSystem(),
	new TickOutcomeSystem(),
	// new KeyboardInput([
	// 	new Action('left', ['KeyA', 'ArrowLeft', 'Numpad4']),
	// 	new Action('right', ['KeyD', 'ArrowDown', 'Numpad6']),
	// 	new Action('up', ['KeyW', 'ArrowUp', 'Numpad8']),
	// 	new Action('down', ['KeyS', 'ArrowDown', 'Numpad5']),
	// ])
])

ReactDOM.render(
  <Provider store={game.store}>
    <App />
  </Provider>,
  document.getElementById('appContainer')
);

game.run()