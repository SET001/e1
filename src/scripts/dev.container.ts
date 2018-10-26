import { container } from './base.container'
import * as PIXI from 'pixi.js'
container.bind('PIXI').toConstantValue(PIXI)
export { container }
