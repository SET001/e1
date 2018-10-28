import { System } from '../core/system'
import { Store } from 'redux'
import { Action } from '../core/action'

export class MouseMoveAction extends Action{
  constructor(public x: number, public y: number) { super() }
}
export class MouseInputSystem extends System<any>{
  init(store: Store) {
    document.addEventListener('mousemove', (event) => {
      store.dispatch(new MouseMoveAction(event.clientX, event.clientY))
    })
  }
}
