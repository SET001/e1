import { Component } from '../core/component'

//  will destroy entity within selected time
export class TTLComponent extends Component{
  start: number
  end: number
  constructor(public time: number = 5000) { super() }
}
