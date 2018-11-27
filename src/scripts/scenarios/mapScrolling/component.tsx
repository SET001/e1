import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from './state'
import { ScenarioGame } from './game'
import { RenderSystem, UpdatePositionAction } from '../../systems/render'
import { LaserTower } from '../../entities'
import { TTLSystem, IDSystem } from '../../systems'
import { System, Component } from '../../core'
import { Controller } from '../controller'
import { Position2DComponent, IDComponent } from '../../components'
import { Store } from 'redux'

class LaserTowerAI extends Component{
  direction = { x: Math.round((Math.random() * -2) + 1), y: Math.round((Math.random() * -2) + 1) }
}

class MovableLaserTower extends LaserTower{
  ai = new LaserTowerAI()
}

class ComponentGroup{
  id = new IDComponent()
  ai = new LaserTowerAI()
  position = new Position2DComponent()
}

class MovableLaserTowerSystem extends System<MovableLaserTower>{
  componentsGroup = new ComponentGroup()
  entities: ComponentGroup[] = []
  onNewEntity(entity: ComponentGroup) {
    this.entities.push(entity)
  }

  controller(store: Store) {
    const updates = this.entities.map((entity: ComponentGroup) => {
      const newEntity = { ...entity }
      newEntity.position.x = entity.position.x + 1 * entity.ai.direction.x
      newEntity.position.y = entity.position.y + 1 * entity.ai.direction.y
      if (Math.random() * 100 < 1) {
        // console.log('direction changed')
        newEntity.ai.direction.x = entity.ai.direction.x = Math.round((Math.random() * -2) + 1)
        newEntity.ai.direction.y = entity.ai.direction.y = Math.round((Math.random() * -2) + 1)
      }
      return newEntity
    })

    if (updates.length) {
        // console.log(updates)
      store.dispatch(new UpdatePositionAction(updates))

    }
  }
}

class Component_ extends React.Component<RootState>{
  game: any
  constructor(props: any) {
    super(props)
    this.game = new ScenarioGame({ ... new RootState() }, [
      new IDSystem(),
      new RenderSystem(),
      new TTLSystem(),
      new MovableLaserTowerSystem(),
    ])
  }

  componentDidMount() {
    this.game.init()
    this.game.run()
    for (let i = 0; i < 10000; i++) {
      const x = Math.random() * 10000
      const y = Math.random() * 10000
      this.game.addEntity(MovableLaserTower, {
        position: { x, y },
      })
    }
  }

  render() {
    return <div id='app'></div>
  }
}

function mapStateToProps(state:any) {
  return state
}
export const MapScrolling = connect<RootState>(mapStateToProps)(Component_)
