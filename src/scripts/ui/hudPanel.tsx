import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../state'

import Stats from './stats'	//  tslint:disable-line
import Buildings from './buildings'	//  tslint:disable-line

class HudPanel extends React.Component<RootState>{
  render() {
    return <div className='hudPanel'>
			<Stats />
			<Buildings />
		</div>
  }
}

function mapStateToProps(state:any) {
  return state
}
export default connect<RootState>(mapStateToProps)(HudPanel)
