import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from './state'
import { ScenarioGame } from './game'
import { RenderSystem } from '../../systems/render'
import { LaserTower } from '../../entities'
import { TTLSystem, IDSystem } from '../../systems'
import { TTLComponent } from '../../components'

class LaserTowerTTL extends LaserTower{
  ttl = new TTLComponent(Math.random() * 10000 + 10000)
}
class Component extends React.Component<RootState>{
  game: any
  constructor(props: any) {
    super(props)
    this.game = new ScenarioGame({ ... new RootState() }, [
      new IDSystem(),
      new RenderSystem(),
      new TTLSystem(),
    ])
  }

  componentDidMount() {
    this.game.init()
    this.game.run()
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * 1000
      const y = Math.random() * 1000
      this.game.addEntity(LaserTowerTTL, {
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
export const MultipleSpritesWithTTL = connect<RootState>(mapStateToProps)(Component) // tslint:disable-line:variable-name
