import * as React from "react";
import {connect} from 'react-redux'
import {RootState} from '../state'
import { Building } from "../entities";

interface BuildingAvailableProps{
	building: Building
	disabled: boolean
}

class BuildingAvailable extends React.Component<BuildingAvailableProps>{
	render(){
		return <li key={this.props.building.baseName}><button disabled={this.props.disabled}>{this.props.building.baseName} - {this.props.building.cost}$</button></li>
	}
}

function mapStateToProps(state:any) {
  return state;
}
export default BuildingAvailable

// export default connect<RootState>(mapStateToProps)(Hud)