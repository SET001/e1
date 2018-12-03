import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from './state'

class Component extends React.Component<RootState>{
  render() {
    return <div className= 'hudPanel' >controller example </div>
  }
}

function mapStateToProps(state:any) {
  return state
}
export const ControllerScenarioComponent = connect<RootState>(mapStateToProps)(Component) // tslint:disable-line:variable-name
