import { Store, Reducer } from 'redux';
import { compose, juxt, join, toLower, head, tail } from 'ramda';
import { Action } from './action';

const firsToLower:Function = compose(
	join(''),
	juxt([compose(toLower, head), tail]),
);

export class System<T>{
  [key: string]: any
  stateSliceName?: string;

  init(store: Store) {}

    reducer(state: T, action:Action) {
      if (action.type[0] !== '@') {
        if (typeof this[action.type] === 'function') {
        return this[action.type](state, action);
      }
    }
    return state;
  }
}

export function systemsReducer(systems:System<any>[]):Reducer {
  return state => state;
}
