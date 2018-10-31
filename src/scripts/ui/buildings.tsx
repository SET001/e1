import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../state'
import BuildingAvailable from './buildingAvailable' //  tslint:disable-line
import { Building } from '../entities'
import { StartBuildingAction } from '../systems/buildings'

class Buildings extends React.Component<RootState>{
  onClick(building: Building) {
    const { constructor } = building as any
    this.props.dispatch(new StartBuildingAction(new constructor().init()))
  }

  render() {
    return <div className='hud' id='buildingsAvailable'>
			<ul>
				{this.props.buildingsAvailable.map((building: Building) => {
				  const disabled = building.cost >= this.props.resources.gold
  return <BuildingAvailable
						key = {building.baseName}
						click = {() => this.onClick(building)}
						building={building}
						disabled={disabled}/>
})}
			</ul>
		</div>
  }
}

function mapStateToProps(state:any) {
  return state
}
export default connect<RootState>(mapStateToProps)(Buildings)
