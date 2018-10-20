import * as React from "react";
import * as PIXI from 'pixi.js';
import 'pixi-tilemap';
import HudPanel from './hudPanel'

export class App extends React.Component{
	async componentDidMount(){
		const loader = PIXI.loader
			.add(['public/imgTanks.png'])
			.add('atlas', 'public/atlas.json');
		const resources: any = await new Promise((resolve, reject)=>loader.load((loader: PIXI.loaders.Loader, resources:PIXI.loaders.Resource[]) => resolve(resources)))
						
		const resolutionX: number = window.innerWidth;
		const resolutionY: number = window.innerHeight;
		const tileSizeX: number = 128;
		const tileSizeY: number = 128;
		const playerOffsetX = (resolutionX / 2 - 24);
		const playerOffsetY = (resolutionY / 2 - 24);
		var player = {
			x: 0,
			y: 0
		};
		
		const app = new PIXI.Application(resolutionX, resolutionY);
		// var renderer = PIXI.autoDetectRenderer(resolutionX, resolutionY);
		document.getElementById("app").appendChild(app.view);

		const rect = new PIXI.Graphics()
			.beginFill(0xff0000)
			.drawRect(-100, -100, 100, 100);

		window.addEventListener('resize', this.resize.bind(this));
	
		// var loader = new PIXI.loaders.Loader();
		// loader
		// loader.load(function(loader, resources:any[]) {
		// 	console.log("!!!", resources)
		const atlas = resources['atlas_image'];
		var tilemap = new PIXI.tilemap.CompositeRectTileLayer(0, [atlas.texture]);
		console.log("@@@", playerOffsetX, player.x, playerOffsetY, player.y)
		const tileSize = 32
		const tileMapSize = {
			height: 20,
			width: 20,
		}
		const numberOfTiles = 20;
		function initTilemap({width, height}:any) {
			// The +5 gives us a buffer around the current player
			console.log("### numberOfTiles", width*height)
			for (var i = -height/2; i < height/2; i++) {
					for (var j = -width/2; j < width/2; j++) {
						// console.log(i * 32, j * 32)
							const blah = ~~(Math.random()*10)
							if (blah ===1){
								tilemap.addFrame('brick.png', i * 32, j * 32);	
							} else tilemap.addFrame('grass.png', i * 32, j * 32);
					}
			}
		}
		initTilemap(tileMapSize)
		tilemap.position.set((tileMapSize.height/2)*tileSize, (tileMapSize.width/2)*tileSize);
		var size = 32;
		// for (var i=0;i<70;i++)
		// for (var j=0;j<70;j++) {
		// 		tilemap.addFrame("grass.png", i*size, j*size);
		// 		if (i%2==1 && j%2==1)
		// 				tilemap.addFrame("tough.png", i*size, j*size);
		// }

		// if you are lawful citizen, please use textures from the loader
		var textures = resources.atlas.textures;
		tilemap.addFrame(textures["brick.png"], 2*size, 2*size);
		tilemap.addFrame(textures["brick.png"], 1*size, 2*size);
		tilemap.addFrame(textures["chest.png"], 0*size, 2*size);
		tilemap.addFrame(textures["brick_wall.png"], 2*size, 3*size);
		// renderer.render(tilemap);
		app.stage.addChild(tilemap);
		
		const actions = {
			moveUp: false,
			moveDown: false,
			moveLeft: false,
			moveRight: false
		}
		function gameLoop() {
			// Make it look like the tank is driving forwards by moving the tiles
			const playerMoveStep = 4
			if (actions.moveUp){
				player.y -= playerMoveStep
			}
			if (actions.moveDown){
				player.y += playerMoveStep
			}
			if (actions.moveLeft){
				player.x -= playerMoveStep
			}
			if (actions.moveRight){
				player.x += playerMoveStep
			}
			// player.y -= 4;
			tilemap.pivot.set(player.x, player.y);
			requestAnimationFrame(gameLoop);
		}
		console.log("%%%%", PIXI.utils.TextureCache['public/imgTanks.png'])
		const tankTexture = new PIXI.Texture(
			PIXI.utils.TextureCache['public/imgTanks.png'],
			new PIXI.Rectangle(0 * 48, 0, 48, 48)
		);
		const playerTankSprite = new PIXI.Sprite(tankTexture);
		playerTankSprite.x = playerOffsetX;
		playerTankSprite.y = playerOffsetY;
		app.stage.addChild(playerTankSprite)
			
		gameLoop();

		
	}

	resize() {
		// const parent = app.view.parentNode as any;
		// app.renderer.resize(parent.clientWidth, parent.clientHeight);
		// rect.position.set(app.screen.width, app.screen.height);
	}

	render(){
		console.log("app props", this.props)
		return <div id="app">
			<HudPanel />
		</div>
	}
}