import { System } from "../core/system";
import { Store } from "redux";

export class MouseInputSystem extends System<any>{
	init(store: Store){
		document.addEventListener('mousemove', (event) => {
			store.dispatch({type: 'mouseMove', payload: {
				x: event.clientX,
				y: event.clientY
			}})
			// sprite.position.set(Math.ceil(event.clientX/32 - 1)*32, Math.ceil(event.clientY/32 - 1)*32)
			// console.log(event)
		})
	}
}