import { container } from './base.container'
container.bind('PIXI').toConstantValue({
  Sprite: {
    fromImage: () => {},
  },
  Application: () => ({
    view: {},
    stage: {
      addChild: () => {},
    },
  }),
})
export { container }
