import { Component } from '../core/component'

export class PIXISpriteComponent extends Component{
  spriteName: string
  constructor(config?: { [field in keyof PIXISpriteComponent]: any }) {
    super()
    Object.assign(this, config || {})
  }
}
