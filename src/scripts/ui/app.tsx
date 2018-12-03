import * as React from 'react'
import HudPanel from './hudPanel'	//  tslint:disable-line

import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { MultipleSpritesWithTTL } from '../scenarios/multipleSpritesWithTTL'
import { MapScrollingScenarioComponent } from '../scenarios/mapScrolling'
import { TileMapScenarioComponent } from '../scenarios/tilemap'

export class App extends React.Component{
  render() {
    return <Router>
      <div>
        <ul id='scenariosMenu'>
          <li>
            <Link to='/multipleSpritesWithTTL'>multipleSpritesWithTTL</Link>
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
        <Route path='/mapScrolling' component={MapScrollingScenarioComponent} />
        <Route path='/tilemap' component={TileMapScenarioComponent} />
      </div>
    </Router>
  }
}
