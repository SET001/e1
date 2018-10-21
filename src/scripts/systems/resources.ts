import { System } from "../core/system";
import { Action } from "../core/action";
import { RootState } from "../state";

export class ResourcesSystem extends System<any>{
	udpateResources(state: RootState, action:Action){
		console.log("updating res", action)
		return{
			...state,
			resources: {
				...state.resources,
				gold: action.payload
			}
		}
	}
}