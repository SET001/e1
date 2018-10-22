import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../state';

class Stats extends React.Component<RootState>{
  render() {
		return <div className="hud" id="stats">
			<dl>
				<dt>Gold</dt>
				<dd>{Math.ceil(this.props.resources.gold)}</dd>
				<dt>Creatures</dt>
				<dd>{this.props.creatures.length}</dd>
				{/* <dt>Workers</dt> */}
				{/* <dd>{this.props.game.workers}</dd>
				<dt>WorkerIncome</dt>
				<dd>{this.props.game.workersIncome}</dd>
				<dt>Player position x</dt>
				{/* <dd>{this.props.player.position.x}</dd>  */}
				{/* <dt>controller up</dt>
				<dd>{this.props.controller.up.toString()}</dd> */}
			</dl>
		</div>;
	}
}

function mapStateToProps(state:any) {
  return state;
}
export default connect<RootState>(mapStateToProps)(Stats);
