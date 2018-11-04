import { Store } from 'redux'
import { Component } from './component'
import { System } from './system'
import { Action } from './action'

import { EntityAddComponentAction, EntityRemoveComponentAction } from '../systems'
import { compose, reduce, filter, map, values, without, isEmpty, toPairs, find } from 'ramda'

//  actions

export class Entity{
  store: Store
  systems: System<any>[] = []

  addComponent(component: Component) {
    this.store.dispatch(new EntityAddComponentAction(this, component))
  }

  removeComponent(component: {new(): Component}) {
    this.store.dispatch(new EntityRemoveComponentAction(this, component))
  }
}
