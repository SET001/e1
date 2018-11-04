import { Component } from '../core/component'

export class Position2DComponent{
  x: number = 0
  y: number = 0
}

export class Position3DComponent{
  x: number = 0
  y: number = 0
  z: number = 0
}

export class PIXISpriteComponent extends Component{
  spriteName: string
  constructor(config?: { [field in keyof PIXISpriteComponent]: any }) {
    super()
    Object.assign(this, config || {})
  }
}

export class IDComponent extends Component{
  static id: number = 0
  id = IDComponent.id++
}

//  will destroy entity within selected time
export class TTLComponent extends Component{
  time: number = 5000
}
