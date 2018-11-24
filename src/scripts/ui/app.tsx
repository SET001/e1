import * as React from 'react'
import HudPanel from './hudPanel'	//  tslint:disable-line
import { Game } from '../game'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { MultipleSpritesWithTTL } from '../scenarios/multipleSpritesWithTTL'
import { Controller } from '../scenarios/controller'

export class App extends React.Component<{game: Game}>{
  render() {
    return <Router>
      <div>
        <ul id='scenariosMenu'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/multipleSpritesWithTTL'>multipleSpritesWithTTL</Link>
          </li>
          <li>
            <Link to='/controller'>Controller</Link>
          </li>
        </ul>

        <Route exact path='/' component={MultipleSpritesWithTTL} />
        <Route path='/multipleSpritesWithTTL' component={MultipleSpritesWithTTL} />
        <Route path='/controller' component={Controller} />

      </div>
    </Router>
  }
}
