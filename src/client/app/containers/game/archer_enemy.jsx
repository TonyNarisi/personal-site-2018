import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ARCHER_ENEMY } from '../../constants/enemies.js';

class ArcherEnemy extends Component {
	render() {
		let props = this.props;
		return(
			<div
				className="game__enemy archer"
				style={{
					height: `${ ARCHER_ENEMY.HEIGHT }px`,
					width: `${ ARCHER_ENEMY.WIDTH }px`,
					top: `${ props.posY }px`,
					left: `${ props.posX }px`,
					// temporary
					backgroundColor: '#303030'
				}}>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		posX: ownProps.posX,
		posY: ownProps.posY
	}
};

export default connect(mapStateToProps)(ArcherEnemy);