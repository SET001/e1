import * as React from "react";
import {connect} from 'react-redux'
import {RootState} from '../state'
import BuildingAvailable from './buildingAvailable'

class Buildings extends React.Component<RootState>{
	render(){
		return <div className="hud" id="buildingsAvailable">
			<ul>
				{this.props.buildingsAvailable.map(building=>{
					const disabled = building.cost >= this.props.resources.gold
					return <BuildingAvailable key={building.baseName} building={building} disabled={disabled}/>
				})}
			</ul>
		</div>
	}
}

function mapStateToProps(state:any) {
  return state;
}
export default connect<RootState>(mapStateToProps)(Buildings)