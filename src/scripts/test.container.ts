import { container } from './base.container'
container.bind('PIXI').toConstantValue({
  Sprite: {
    fromImage: () => {},
  },
})
export { container }
