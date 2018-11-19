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
    const systems = this.store.getState().systems
    const action = new EntityAddComponentAction(this, component).action(systems)
    this.store.dispatch(action)
  }

  removeComponent(component: {new(): Component}) {
    this.store.dispatch(new EntityRemoveComponentAction(this, component))
  }

  //  add component to this entity
  add(component: Component) {
    this.store.dispatch(new EntityAddComponentAction(this, component))
  }

  //  remove component from this entity
  remove() {

  }

  get<T extends {new(): Component}>(componentClass: T) {
    // const component = new componentClass()
    // this.store.dispatch(new EntityAddComponentAction(this, component))
    // values(() => {
    //   console.log('')
    // , this)
    // return
  }
}
