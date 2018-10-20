import {LaserTower, CannonTower, Building, GoldMine} from './entities'


export interface RootState{
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
	buildingsAvailable: [lt, ct],
	buildings: [gm],
	resources: {
		gold: 97
	}
}
console.log("rootState", lt, ct, gm)