import * as React from 'react'
import HudPanel from './hudPanel'	//  tslint:disable-line
import { Game } from '../core/game'

export class App extends React.Component<{game: Game}>{
  async componentDidMount() {

    this.props.game.init()
    this.props.game.run()

			// const actions = {
			// 	moveUp: false,
			// 	moveDown: false,
			// 	moveLeft: false,
			// 	moveRight: false
			// }

			// console.log("%%%%", PIXI.utils.TextureCache['public/imgTanks.png'])
			// const tankTexture = new PIXI.Texture(
			// 	PIXI.utils.TextureCache['public/imgTanks.png'],
			// 	new PIXI.Rectangle(0 * 48, 0, 48, 48)
			// );
			// const playerTankSprite = new PIXI.Sprite(tankTexture);
			// playerTankSprite.x = playerOffsetX;
			// playerTankSprite.y = playerOffsetY;
			// app.stage.addChild(playerTankSprite)
  }

  resize() {
		// const parent = app.view.parentNode as any;
		// app.renderer.resize(parent.clientWidth, parent.clientHeight);
		// rect.position.set(app.screen.width, app.screen.height);
  }

  render() {
    return <div id='app'>
			<HudPanel />
		</div>
  }
}
