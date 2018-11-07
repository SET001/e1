import { Component } from '../core/component'

//  will destroy entity within selected time
export class TTLComponent extends Component{
  time: number = 5000
}
