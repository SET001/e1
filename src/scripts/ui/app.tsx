import * as React from 'react'
import HudPanel from './hudPanel'	//  tslint:disable-line
import { Game } from '../game'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { MultipleSpritesWithTTL } from '../scenarios/multipleSpritesWithTTL'
import { ControllerScenarioComponent } from '../scenarios/controller'
import { MapScrollingScenarioComponent } from '../scenarios/mapScrolling'
import { TileMapScenarioComponent } from '../scenarios/tilemap'

export class App extends React.Component<{game: Game}>{
  render() {
    return <Router>
      <div>
        <ul id='scenariosMenu'>
          <li>
            <Link to='/'>Hodadsme</Link>
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
        <Route path='/controller' component={ControllerScenarioComponent} />
        <Route path='/mapScrolling' component={MapScrollingScenarioComponent} />
        <Route path='/tilemap' component={TileMapScenarioComponent} />
      </div>
    </Router>
  }
}
