import { System } from '../core/system';

export class TickOutcomeSystem extends System<any>{
  constructor(public tickOutcomeModifier: number = 0) {
  super();
}
  tick(state: any): any {
    const { buildings, resources } = state;
    const outcome = buildings.reduce((acc:any, { outcome }:any) => acc += outcome, 0) / this.tickOutcomeModifier;
    return {
      ...state,
      resources: {
        ...resources,
        gold: resources.gold - outcome,
      },
    };
  }
}
