interface BuildingState{
	income: number
}

export class TickIncome{
	reducer(action:any){
		return (state:any) => {
			if (action.type!='tick' || !state.buildings) return state
			const income = state.buildings.reduce((acc:any, {income}:BuildingState)=>acc+=income, 0)
			return {
				...state,
				gold: state.gold+income
			}
		}
	}
} 