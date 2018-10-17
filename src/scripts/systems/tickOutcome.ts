export class TickOutcome{
	reducer(action:any){
		return (state:any) => {
			if (action.type!='tick' || !state.buildings) return state
			const outcome = state.buildings.reduce((acc:any, {outcome}:any)=>acc+=outcome, 0)
			return {
				...state,
				gold: state.gold-outcome
			}
		}
	}
} 