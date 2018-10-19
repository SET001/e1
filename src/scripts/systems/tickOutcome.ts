import { System } from "../core/system";

export class TickOutcomeSystem extends System<any>{
	tick(state: any): any{
		const {buildings, resources} = state
		const outcome = buildings.reduce((acc:any, {outcome}:any)=>acc+=outcome, 0)
		return {
			...state,
			resources: {
				...resources,
				gold: resources.gold-outcome
			}
		}
	}
} 