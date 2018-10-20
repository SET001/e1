import {Building, GoldMine} from '../entities/building'
import {assert} from 'chai'

describe.only('Buildings', ()=>{
	it('should increase buildings counter for base class', ()=>{
		new Building().init()
		new Building().init()
		const b3 = new Building().init()
		new GoldMine().init()
		const gm2 = new GoldMine().init()
		assert.equal(gm2.name, `${gm2.baseName} 1`)
		assert.equal(b3.name, `${b3.baseName} 2`)
	})
})