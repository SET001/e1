export class Component{
  init(config?: { [field in keyof this]?: any }): this {
    Object.assign(this, config)
    return this
  }
}
