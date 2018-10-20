import {Building, GoldMine} from '../entities/building'
import {assert} from 'chai'

describe.only('Buildings', ()=>{
	it('should increase buildings counter for base class', ()=>{
		const b1 = new Building()
		b1.init()
		const b2 = new Building()
		b2.init()
		const b3 = new Building()
		b3.init()
		const gm1 = new GoldMine()
		gm1.init()
		const gm2 = new GoldMine()
		gm2.init()
		// assert.equal(gm2.name, `${gm2.baseName} 2`)
		console.log(b1, b2, b3, gm1, gm2)
	})
})