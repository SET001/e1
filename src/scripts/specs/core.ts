import { System } from '../core/system'
import { assert } from 'chai'
import { Game } from '../core/game'

// 	states
class Building{
  constructor(
		public cost: number = 200,
		public income: number = 10,
		public outcome: number = 1,
		public name: string = 'Building',
	) {}
}

class Resources{
  constructor(
		public gold: number = 0,
	) {}
}

interface RootState{
  [key: string]: any
  resources: Resources
  buildings: Building[]
}

// 	actions
class AddBuildingAction{
  constructor(
		public building: Building,
	) {}
}
class UpgradeBuildingAction{
  constructor(
		public upgrade: any,
		public buildingId: number,
	) {}
}
const addBuilding = (building: Building) => ({ type: 'addBuilding', building })
const tickAction = { type: 'tick' }

// 	systems
class BuildingsSystem extends System<Building[]>{
  stateSliceName = 'buildings'
  addBuilding(buildings: Building[], { building }: AddBuildingAction) {
    return [
      ...buildings,
      building,
    ]
  }

  removeBuilding() {}
  updateBuilding() {}
}

class TickIncomeSystem extends System<RootState>{
  tick(state: RootState): RootState {
    const { buildings, resources } = state
    const income = buildings.reduce((acc:any, { income }:Building) => acc += income, 0)
    return {
      ...state,
      resources: {
        ...resources,
        gold: resources.gold + income,
      },
    }
  }
}

class TickOutcomeSystem extends System<RootState>{
  tick(state: RootState): RootState {
    const { buildings, resources } = state
    const outcome = buildings.reduce((acc:any, { outcome }:Building) => acc += outcome, 0)
    return {
      ...state,
      resources: {
        ...resources,
        gold: resources.gold - outcome,
      },
    }
  }
}

describe('core', () => {
  it('systemsReducer', () => {
    const rootState:RootState = {
      buildings: [
        new Building(100, 10, 1, 'asd'),
      ],
      resources: {
        gold: 0,
      },
    }

    const game = new Game(rootState, [
      new BuildingsSystem(),
      new TickIncomeSystem(),
      new TickOutcomeSystem(),
    ])

    game.store.dispatch(addBuilding(new Building(100, 10, 1, 'asd')))
    game.store.dispatch(tickAction)
    game.store.dispatch(tickAction)
    game.store.dispatch(tickAction)

    const finalState = game.store.getState()
    assert.equal(finalState.buildings.length, 2)
    assert.equal(finalState.resources.gold, 54)
  })
})
