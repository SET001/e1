import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from './state'
import { ScenarioGame } from './game'
import { RenderSystem, UpdatePositionAction } from '../../systems/render'
import { LaserTower } from '../../entities'
import { TTLSystem, IDSystem } from '../../systems'
import { System, Component, Entity } from '../../core'
import { Position2DComponent, IDComponent } from '../../components'
import { Store } from 'redux'

class LaserTowerAI extends Component{
  direction = { x: Math.round((Math.random() * -2) + 1), y: Math.round((Math.random() * -2) + 1) }
}
class Collidable extends Component{
  collisions: any[]
}

class MovableLaserTower extends LaserTower{
  ai = new LaserTowerAI()
  collidable = new Collidable()
}

class ComponentsGroup{
  id = new IDComponent()
  ai = new LaserTowerAI()
  position = new Position2DComponent()
}

class MovableLaserTowerSystem extends System<MovableLaserTower>{
  componentsGroup = new ComponentsGroup()
  entities: ComponentsGroup[] = []
  onNewEntity(entity: ComponentsGroup) {
    this.entities.push(entity)
  }

  controller(store: Store) {
    const updates: ComponentsGroup[] = []
    const renderSystem = store.getState().systems.find((system: System<any>) => system instanceof RenderSystem)
    this.entities.map((entity: ComponentsGroup) => {
      const newEntity = { ...entity }
      newEntity.position.x = entity.position.x + 1 * entity.ai.direction.x
      newEntity.position.y = entity.position.y + 1 * entity.ai.direction.y
      if (Math.random() * 100 < 1) {
        // console.log('direction changed')
        newEntity.ai.direction.x = entity.ai.direction.x = Math.round((Math.random() * -2) + 1)
        newEntity.ai.direction.y = entity.ai.direction.y = Math.round((Math.random() * -2) + 1)
      }
      //  udpate only visible entities
      const maxX = renderSystem.app.view.clientWidth + (renderSystem.rootContainer.position.x * -1)
      const minX = (renderSystem.rootContainer.position.x * -1) - 32
      const minY = (renderSystem.rootContainer.position.y * -1) - 32
      const maxY = renderSystem.app.view.clientHeight + (renderSystem.rootContainer.position.y * -1)
      if (
        newEntity.position.x < maxX &&
        newEntity.position.y < maxY &&
        newEntity.position.y > minY &&
        newEntity.position.x > minX) {
        updates.push(newEntity)
      }
    })

    if (updates.length) {
      store.dispatch(new UpdatePositionAction(updates))

    }
  }
}

class ScenarioComponent extends React.Component<RootState>{
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
    const entities = []
    for (let i = 0; i < 20000; i++) {
      const x = Math.random() * 32000
      const y = Math.random() * 32000
      const entity = new MovableLaserTower()
      entity.position.x = x
      entity.position.y = y
      entities.push(entity)
    }
    this.game.addEntities(entities)
  }

  render() {
    return <div id='app'></div>
  }
}

function mapStateToProps(state:any) {
  return state
}
export const MapScrollingScenarioComponent = connect<RootState>(mapStateToProps)(ScenarioComponent) // tslint:disable-line:variable-name
