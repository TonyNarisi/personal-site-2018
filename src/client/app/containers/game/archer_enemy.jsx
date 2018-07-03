import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ARCHER_ENEMY } from '../../constants/enemies.js';
import walkcycle from '../../../public/assets/game/walkcycles/mage-walking.png';

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
					zIndex: props.posY + ARCHER_ENEMY.HEIGHT,
					backgroundImage: `url(${ walkcycle })`,
					backgroundPositionX: `${ (props.bgMoveX * ARCHER_ENEMY.SPRITE_WIDTH) - ARCHER_ENEMY.X_OFFSET }px`,
					backgroundPositionY: `${ (props.bgMoveY * ARCHER_ENEMY.SPRITE_HEIGHT) - ARCHER_ENEMY.Y_OFFSET }px`
				}}>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		posX: ownProps.posX,
		posY: ownProps.posY,
		bgMoveX: ownProps.bgMoveX,
		bgMoveY: ownProps.bgMoveY
	}
};

export default connect(mapStateToProps)(ArcherEnemy);