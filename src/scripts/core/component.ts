import { lowerizeFirstLetterEx } from '../utils'

export class Component{
  name: string
  init(config?: { [field in keyof this]?: any }): this {
    Object.assign(this, config)
    return this
  }
  constructor() {
    this.name = lowerizeFirstLetterEx(this.constructor.name).split('Component').shift()
  }
}

type PrimitiveComponentValue = number | string | boolean
export class PrimitiveComponent extends Component{
  value: PrimitiveComponentValue
}
