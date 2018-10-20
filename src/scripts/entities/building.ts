interface BuildingConstructor{
	cBuildings: number
}
export class Building{
	cost: number = 0
	income: number = 0
	outcome: number = 0
	baseName: string = 'Building'
	name: string
	type: string = 'Building'
	
	"constructor": BuildingConstructor
	
	constructor(){
		this.constructor.cBuildings = this.constructor.cBuildings
			? this.constructor.cBuildings
			: 0
	}

	init(){
		this.name = `${this.baseName} ${++this.constructor.cBuildings}`		
	}
}

export class LaserTower extends Building{
	cost = 500
	outcome = 5
	baseName: string = 'Laser Tower'
}

export class GoldMine extends Building{
	cost = 1000
	income = 100
	outcome = 5
	baseName = 'GoldMine'
}



export class CannonTower extends Building{
	cost = 100
	baseName: string = 'Cannon Tower'
}