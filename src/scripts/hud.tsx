import * as React from "react";
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'

interface IHUDProps{
	game: {
		dispatch: Dispatch<any>
		gold: Number
		workers: Number
		workersIncome: Number
	}
}

class Hud extends React.Component<IHUDProps>{
	render(){
		return <div id="hud">
			<dl>
				<dt>Gold</dt>
				<dd>{this.props.game.gold}</dd>
				<dt>Workers</dt>
				<dd>{this.props.game.workers}</dd>
				<dt>WorkerIncome</dt>
				<dd>{this.props.game.workersIncome}</dd>
				<dt>Player position x</dt>
				{/* <dd>{this.props.player.position.x}</dd>  */}
				<dt>controller up</dt>
				<dd>{this.props.controller.up.toString()}</dd>
			</dl>
		</div>
	}
}

function mapStateToProps(state:any) {
  return state;
}
export default connect<IHUDProps>(mapStateToProps)(Hud)