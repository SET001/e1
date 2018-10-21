import {LaserTower, CannonTower, Building, GoldMine} from './entities'
import { BuildingCursor } from './entities/buildingCursor';
import { Dispatch } from 'redux';


export interface RootState{
	dispatch?: Dispatch,
	buildingCursor: BuildingCursor,
	buildingsAvailable: Building[]
	buildings: Building[],
	resources: {
		gold: number
	}
}

const lt = new LaserTower()
lt.init()
const ct  =new CannonTower()
ct.init()
const gm = new GoldMine()
gm.init()
export const rootState: RootState =  {
	buildingCursor: new BuildingCursor(),
	buildingsAvailable: [lt, ct],
	buildings: [gm],
	resources: {
		gold: 10197
	}
}
console.log("rootState", lt, ct, gm)