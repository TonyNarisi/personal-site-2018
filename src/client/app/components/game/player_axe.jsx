import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AXE } from '../../constants/weapons.js';
import {
	REV_PC_Y_MAP,
	PLAYER_CHAR_INNER_HITBOX_HOR,
	PLAYER_CHAR_WIDTH,
	PC_ATTACK_LOOP_SWITCH
} from '../../constants/player.js';
import {
	findTopAxe,
	findLeftAxe,
	findZRotateAxe,
	findYRotateAxe
} from '../../helpers/attack.js';
import axe from '../../../public/assets/game/attacks/upg_axeDouble.png';

class PlayerAxe extends Component {
	// THIS WHOLE COMPONENT SHOULD BE REFACTORED
	findPlayerDir(bgMoveY) {
		return REV_PC_Y_MAP[bgMoveY];
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
					'top': `${ findTopAxe(playerDir, isReturning, isWindingUp, props.attackLoop, props.returnAttackLoop) }px`,
					'left': `${ findLeftAxe(playerDir, isReturning, isWindingUp, props.attackLoop, props.returnAttackLoop) }px`,
					'transform': `${ findYRotateAxe(playerDir) } ${ findZRotateAxe(playerDir, isReturning, isWindingUp, props.attackLoop, props.returnAttackLoop) }`,
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