import * as React from 'react'
import HudPanel from './hudPanel'	//  tslint:disable-line
import { Game } from '../game'

export class App extends React.Component<{game: Game}>{
  render() {
    return <div id='app'>
		{/* <HudPanel /> */}
		</div>
  }
}
