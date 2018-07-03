import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AXE } from '../../constants/weapons.js';
import {
	REV_PC_Y_MAP,
	PLAYER_CHAR_INNER_HITBOX_HOR,
	PLAYER_CHAR_WIDTH
} from '../../constants/player.js';
import axe from '../../../public/assets/game/attacks/upg_axeDouble.png';

class PlayerAxe extends Component {
	findPlayerDir(bgMoveY) {
		return REV_PC_Y_MAP[bgMoveY];
	}

	findTop(dir) {
		switch (dir) {
			default:
				return 0;
		}
	}

	findLeft(dir) {
		switch (dir) {
			case 'down':
				return -(AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.LEFT_SPACE));
			case 'left':
				return -(AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.LEFT_SPACE) - (PLAYER_CHAR_INNER_HITBOX_HOR.horizontal/2));
			case 'up':
				return (AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.RIGHT_SPACE));
			case 'right':
				return (AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.RIGHT_SPACE) - PLAYER_CHAR_WIDTH + PLAYER_CHAR_INNER_HITBOX_HOR.horizontal) + 10;
			default:
				return 0;
		}
	}

	findTransform(dir) {
		switch (dir) {
			case 'right':
			case 'up':
				return 'rotateY(180deg)';
			default:
				return 'rotateY(0)';
		}
	}

	render() {
		let props = this.props;
		let playerDir = this.findPlayerDir(props.playerBgMoveY)
		let top = this.findTop(playerDir);
		let left = this.findLeft(playerDir);
		return(
			<div
				className="game__player--axe"
				style={{
					'height': `${ AXE.HEIGHT }px`,
					'width': `${ AXE.WIDTH }px`,
					'backgroundSize': '100%',
					'position': 'absolute',
					'top': `${ top }px`,
					'left': `${ left }px`,
					'transform': this.findTransform(playerDir),
					'backgroundImage': `url(${ axe })`
				}}>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		playerBgMoveY: state.gameData.player.bgMoveY
	}	
}

export default connect(mapStateToProps)(PlayerAxe);