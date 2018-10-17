import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from './app'
import { Provider }  from 'react-redux'
import { container } from './dev.container'

const game = container.get<any>('Game');

ReactDOM.render(
  <Provider store={game.store}>
    <App />
  </Provider>,
  document.getElementById('appContainer')
);

game.run()

// import { createStore, applyMiddleware } from 'redux'
// import reducers from './reducers'
// import { Game } from "./game";
// import { KeyboardController, Action } from './controller'
// const store = createStore(reducers)
// store.dispatch({type: 'tick'})

// const game = new Game(store)
// const actions = [
//   new Action('left', ['KeyA', 'ArrowLeft', 'Numpad4']),
//   new Action('right', ['KeyD', 'ArrowDown', 'Numpad6']),
//   new Action('up', ['KeyW', 'ArrowUp', 'Numpad8']),
//   new Action('down', ['KeyS', 'ArrowDown', 'Numpad5']),
// ]
// const controller =  new KeyboardController(
//   store, actions
  
// )
// controller.init()