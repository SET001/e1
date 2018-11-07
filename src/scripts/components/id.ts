import { Component } from '../core/component'

export class IDComponent extends Component{
  static id: number = 0
  id = IDComponent.id++
}
