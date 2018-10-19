import {Building} from './entities'

export interface RootState{
	buildings: Building[],
	resources: {
		gold: number
	}
}
export const rootState: RootState =  {
	buildings: [
		new Building(100, 0.01, 0.001, 'asd')
	],
	resources: {
		gold: 0
	}
}