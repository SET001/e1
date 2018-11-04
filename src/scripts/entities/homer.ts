import { Position2DComponent, PIXISpriteComponent, Position3DComponent } from '../components'
import { Entity } from '../core'

export class Homer extends Entity{
  view = new PIXISpriteComponent().init({ spriteName: 'homer.png' })
  position = new Position2DComponent()
}
