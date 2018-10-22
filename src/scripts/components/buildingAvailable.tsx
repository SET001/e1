import * as React from 'react'
import { Building } from '../entities'

interface BuildingAvailableProps{
  building: Building;
  disabled: boolean;
  click: Function;
}

class BuildingAvailable extends React.Component<BuildingAvailableProps>{
  render() {
    return <li key={this.props.building.baseName}>
      <button
        onClick={this.props.click as any}
        disabled={this.props.disabled}>
        {this.props.building.baseName} - {this.props.building.cost}$
      </button>
    </li>;
  }
}

export default BuildingAvailable;