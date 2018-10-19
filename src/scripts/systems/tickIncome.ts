import { System } from "../core/system";

interface BuildingState{
	income: number
}

export class TickIncomeSystem extends System<any>{
	tick(state: any): any{
		const {buildings, resources} = state
		const income = buildings.reduce((acc:any, {income}:any)=>acc+=income, 0)
		return {
			...state,
			resources: {
				...resources,
				gold: resources.gold+income
			}
		}
	}
} 