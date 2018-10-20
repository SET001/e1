export class Building{
	static cBuildings: {[key:string]:number} = {}
	cost: number = 0
	income: number = 0
	outcome: number = 0
	baseName: string = 'Building'
	name: string
	type: string = 'Building'
	
	constructor(){
		if (Building.cBuildings[this.constructor.name] === undefined){
			Building.cBuildings[this.constructor.name] = 0
		} else Building.cBuildings[this.constructor.name] = Building.cBuildings[this.constructor.name] + 1
	}

	init(){
		this.name = `${this.baseName} ${Building.cBuildings[this.constructor.name]}`		
		return this
	}
}
// Building.prototype.cBuildings = {}

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