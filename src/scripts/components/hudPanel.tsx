import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../state';

import Stats from './stats';
import Buildings from './buildings';

class HudPanel extends React.Component<RootState>{
  render() {
		return <div className="hudPanel">
			<Stats />
			<Buildings />
		</div>;
}
}

function mapStateToProps(state:any) {
  return state;
}
export default connect<RootState>(mapStateToProps)(HudPanel);
