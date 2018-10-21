import { System } from "../core/system";

export class TickIncomeSystem extends System<any>{
	constructor(public tickIncomeModifier: number = 0){
		super()
	}
	tick(state: any): any{
		const {buildings, resources} = state
		const income = buildings.reduce((acc:any, {income}:any)=>acc+=income, 0) / this.tickIncomeModifier
		return {
			...state,
			resources: {
				...resources,
				gold: resources.gold+income
			}
		}
	}
} 