import * as React from "react";
import {connect} from 'react-redux'
import {RootState} from '../state'
import BuildingAvailable from './buildingAvailable'
import { Building } from "../entities";

class Buildings extends React.Component<RootState>{
	onClick(building: Building){
		console.log("trying to build building", building)
		this.props.dispatch({type: 'cursorEnabled'})
	}
	render(){
		return <div className="hud" id="buildingsAvailable">
			<ul>
				{this.props.buildingsAvailable.map(building=>{
					const disabled = building.cost >= this.props.resources.gold
					return <BuildingAvailable
						key={building.baseName}
						click={()=>this.onClick(building)}
						building={building}
						disabled={disabled}/>
				})}
			</ul>
		</div>
	}
}

function mapStateToProps(state:any) {
  return state;
}
export default connect<RootState>(mapStateToProps)(Buildings)