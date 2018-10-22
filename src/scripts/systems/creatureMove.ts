import { System } from "../core/system";
import { RootState } from "../state";
import { map } from 'ramda'
import { Creature } from "../entities/creatures";

export const moveCreatures = ()=>({type: 'moveCreatures'})
export class CreatureMoveSystem extends System<any>{
	moveCreatures(state: RootState){
		const creatures =	map((creature: Creature)=>{
			const target = {
				x: 10*32,
				y: 12*32
			}
			const rotation = Math.atan2(target.y - creature.position.y, target.x - creature.position.x);

			const position = {
				x: creature.position.x+0.5 * Math.cos(rotation),
				y: creature.position.y+0.5 * Math.sin(rotation)
			}
			return {
				...creature,
				position,
				sprite: {
					...creature.sprite,
					position
				}
			}
		}, state.creatures)
		// console.log("!!", creatures)
		return {
			...state,
			creatures
		}
	}
}