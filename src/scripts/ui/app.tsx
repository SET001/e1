import * as React from 'react'
import HudPanel from './hudPanel'	//  tslint:disable-line
import { Game } from '../game'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { MultipleSpritesWithTTL } from '../scenarios/multipleSpritesWithTTL'
import { Controller } from '../scenarios/controller'
import { MapScrolling } from '../scenarios/mapScrolling'
import { TileMap } from '../scenarios/tilemap'

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
          <li>
            <Link to='/mapScrolling'>Map Scrolling</Link>
          </li>
          <li>
            <Link to='/tilemap'>Tilemap</Link>
          </li>
        </ul>

        <Route exact path='/' component={MultipleSpritesWithTTL} />
        <Route path='/multipleSpritesWithTTL' component={MultipleSpritesWithTTL} />
        <Route path='/controller' component={Controller} />
        <Route path='/mapScrolling' component={MapScrolling} />
        <Route path='/tilemap' component={TileMap} />
      </div>
    </Router>
  }
}
