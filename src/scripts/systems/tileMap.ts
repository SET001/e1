import * as PIXI from 'pixi.js';
import 'pixi-tilemap';
import { System } from '../core/system';
import { Store } from 'redux';

export class TileMapSystem extends System<any>{
  async init(store: Store) {
    const loader = PIXI.loader
        .add(['public/imgTanks.png'])
        .add('atlas', 'public/atlas.json');
    const resources: any = await new Promise((resolve, reject) => loader.load((loader: PIXI.loaders.Loader, resources:PIXI.loaders.Resource[]) => resolve(resources)));
    const atlas = resources['atlas_image'];
    let tilemap = new PIXI.tilemap.CompositeRectTileLayer(0, [atlas.texture]);

    const tileSize = 32;
    const tileMapSize = {
    height: 20,
    width: 20,
  };
    function initTilemap({ width, height }:any) {
    for (let i = -height / 2; i < height / 2; i++) {
    for (let j = -width / 2; j < width / 2; j++) {
    const blah = ~~(Math.random() * 10);
    if (blah === 1) {
    tilemap.addFrame('brick.png', i * 32, j * 32);
  } else tilemap.addFrame('grass.png', i * 32, j * 32);
  }
  }
}
  initTilemap(tileMapSize);
    tilemap.position.set((tileMapSize.height / 2) * tileSize, (tileMapSize.width / 2) * tileSize);

    let textures = resources.atlas.textures;
    tilemap.addFrame(textures['chest.png'], 0 * tileSize, 2 * tileSize);
    store.dispatch({ type: 'addRenderObject', payload: tilemap, layer: 'tilemap' });
  }
}
