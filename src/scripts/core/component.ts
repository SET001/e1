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
export class NumberComponent extends Component{
  constructor(public value?: PrimitiveComponentValue) {
    super()
  }
  valueOf() {
    return Number(this.value)
  }
  toString() {
    return String(this.value)
  }
}

export class StringComponent extends Component{
  constructor(public value?: PrimitiveComponentValue) {
    super()
  }
  valueOf() {
    return String(this.value)
  }
  toString() {
    return String(this.value)
  }
}
