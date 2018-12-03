import { RootState } from './state'
import { ScenarioGame } from './game'
import { RenderSystem } from '../../systems/render'
import { LaserTower } from '../../entities'
import { TTLSystem, IDSystem } from '../../systems'
import { TTLComponent } from '../../components'
import { ScenarioComponent } from '../../ui/scenario'

class LaserTowerTTL extends LaserTower{
  ttl = new TTLComponent(Math.random() * 10000 + 10000)
}
export class MultipleSpritesWithTTL extends ScenarioComponent<RootState>{
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
}
