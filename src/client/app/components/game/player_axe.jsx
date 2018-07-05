import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AXE } from '../../constants/weapons.js';
import {
	REV_PC_Y_MAP,
	PLAYER_CHAR_INNER_HITBOX_HOR,
	PLAYER_CHAR_WIDTH,
	PC_MAX_ATTACK_LOOP,
	PC_ATTACK_LOOP_SWITCH,
	PC_RETURN_ATTACK,
	END_ATTACK_TOP,
	END_WINDUP_TOP,
	END_ATTACK_LEFT,
	END_WINDUP_LEFT,
	END_ATTACK_ROTATE_Z,
	END_WINDUP_ROTATE_Z
} from '../../constants/player.js';
import axe from '../../../public/assets/game/attacks/upg_axeDouble.png';

class PlayerAxe extends Component {
	// THIS WHOLE COMPONENT SHOULD BE REFACTORED
	findPlayerDir(bgMoveY) {
		return REV_PC_Y_MAP[bgMoveY];
	}

	findTop(dir, isReturning, isWindingUp) {
		let props = this.props;
		if (isReturning) {
			return Math.round(END_ATTACK_TOP[dir] + ((-1 * END_ATTACK_TOP[dir]) * props.returnAttackLoop/PC_RETURN_ATTACK));
		} else if (isWindingUp) {
			return Math.round(END_WINDUP_TOP[dir] * props.attackLoop/PC_ATTACK_LOOP_SWITCH);
		} else {
			return Math.round(END_WINDUP_TOP[dir] + ((END_ATTACK_TOP[dir] - END_WINDUP_TOP[dir]) * (props.attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH)));
		}
	}

	findLeft(dir, isReturning, isWindingUp) {
		let props = this.props;
		var baseMeasure;
		if (dir === 'up') {
			baseMeasure = (AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.RIGHT_SPACE));
		} else if (dir === 'down') {
			baseMeasure = -(AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.LEFT_SPACE));
		} else if (dir === 'left') {
			baseMeasure = -(AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.LEFT_SPACE) - (PLAYER_CHAR_INNER_HITBOX_HOR.horizontal/2));
		} else {
			baseMeasure = (AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.RIGHT_SPACE) - PLAYER_CHAR_WIDTH + PLAYER_CHAR_INNER_HITBOX_HOR.horizontal) + 10;
		}

		if (isReturning) {
			return (baseMeasure + END_ATTACK_LEFT[dir]) - ((props.returnAttackLoop/PC_RETURN_ATTACK) * END_ATTACK_LEFT[dir]);
		} else if (isWindingUp) {
			return baseMeasure + (END_WINDUP_LEFT[dir] * props.attackLoop/PC_ATTACK_LOOP_SWITCH);
		} else {
			return baseMeasure + (END_ATTACK_LEFT[dir] * (props.attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH));
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

	findZRotate(dir, isReturning, isWindingUp) {
		let props = this.props;
		if (isReturning) {
			return `rotateZ(${ Math.round(END_ATTACK_ROTATE_Z[dir] + (-END_ATTACK_ROTATE_Z[dir] * (props.returnAttackLoop/PC_RETURN_ATTACK))) }deg)`;
		} else if (isWindingUp) {
			return `rotateZ(${ Math.round(END_WINDUP_ROTATE_Z[dir] * (props.attackLoop/PC_ATTACK_LOOP_SWITCH)) }deg)`;
		} else {
			return `rotateZ(${ Math.round(((END_ATTACK_ROTATE_Z[dir] - END_WINDUP_ROTATE_Z[dir]) * ((props.attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH))) + END_WINDUP_ROTATE_Z[dir]) }deg)`;
		}
	}

	render() {
		let props = this.props;
		let playerDir = this.findPlayerDir(props.playerBgMoveY);
		let isReturning = props.attackLoop === 0 && props.returnAttackLoop != 0;
		let isWindingUp = props.attackLoop <= PC_ATTACK_LOOP_SWITCH;
		return(
			<div
				className="game__player--axe"
				style={{
					'height': `${ AXE.HEIGHT }px`,
					'width': `${ AXE.WIDTH }px`,
					'backgroundSize': '100%',
					'position': 'absolute',
					'top': `${ this.findTop(playerDir, isReturning, isWindingUp) }px`,
					'left': `${ this.findLeft(playerDir, isReturning, isWindingUp) }px`,
					'transform': `${ this.findTransform(playerDir, isReturning, isWindingUp) } ${ this.findZRotate(playerDir) }`,
					'backgroundImage': `url(${ axe })`
				}}>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		playerBgMoveY: state.gameData.player.bgMoveY,
		attackLoop: state.gameData.player.attackLoop,
		returnAttackLoop: state.gameData.player.returnAttackLoop
	}	
}

export default connect(mapStateToProps)(PlayerAxe);