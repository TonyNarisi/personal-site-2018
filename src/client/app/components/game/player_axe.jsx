import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AXE } from '../../constants/weapons.js';
import {
	REV_PC_Y_MAP,
	PLAYER_CHAR_INNER_HITBOX_HOR,
	PLAYER_CHAR_WIDTH,
	PC_MAX_ATTACK_LOOP,
	PC_ATTACK_LOOP_SWITCH,
	PC_RETURN_ATTACK
} from '../../constants/player.js';
import axe from '../../../public/assets/game/attacks/upg_axeDouble.png';

class PlayerAxe extends Component {
	// THIS WHOLE COMPONENT SHOULD BE REFACTORED
	findPlayerDir(bgMoveY) {
		return REV_PC_Y_MAP[bgMoveY];
	}

	findTop(dir) {
		let props = this.props;
		switch (dir) {
			case 'up':
				if (props.attackLoop === 0 && props.returnAttackLoop != 0) {
					return Math.round(-18 + (18 * props.returnAttackLoop/PC_RETURN_ATTACK));
				} else if (props.attackLoop <= PC_ATTACK_LOOP_SWITCH) {
					return Math.round(7 * props.attackLoop/PC_ATTACK_LOOP_SWITCH);
				} else {
					return Math.round(7 - (25 * (props.attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH)));
				}
				return 0;
			case 'left':
				if (props.attackLoop === 0 && props.returnAttackLoop != 0) {
					return Math.round(20 - (20 * props.returnAttackLoop/PC_RETURN_ATTACK));
				} else if (props.attackLoop <= PC_ATTACK_LOOP_SWITCH) {
					return Math.round(-7 * props.attackLoop/PC_ATTACK_LOOP_SWITCH);
				} else {
					return Math.round(-7 + (27 * (props.attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH)));
				}
			case 'down':
				if (props.attackLoop === 0 && props.returnAttackLoop != 0) {
					return Math.round(26 - (26 * props.returnAttackLoop/PC_RETURN_ATTACK));
				} else if (props.attackLoop <= PC_ATTACK_LOOP_SWITCH) {
					return Math.round(-7 * props.attackLoop/PC_ATTACK_LOOP_SWITCH);
				} else {
					return Math.round(-7 + (33 * (props.attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH)));
				}
			case 'right':
				if (props.attackLoop === 0 && props.returnAttackLoop != 0) {
					return Math.round(20 - (20 * props.returnAttackLoop/PC_RETURN_ATTACK));
				} else if (props.attackLoop <= PC_ATTACK_LOOP_SWITCH) {
					return Math.round(-7 * props.attackLoop/PC_ATTACK_LOOP_SWITCH);
				} else {
					return Math.round(-7 + (27 * (props.attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH)));
				}
			default:
				return 0;
		}
	}

	findLeft(dir) {
		let props = this.props;
		switch (dir) {
			case 'down':
				var baseMeasure = -(AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.LEFT_SPACE));
				if (props.attackLoop === 0 && props.returnAttackLoop != 0) {
					return props.returnAttackLoop/PC_RETURN_ATTACK * baseMeasure;
				} else if (props.attackLoop <= PC_ATTACK_LOOP_SWITCH) {
					return baseMeasure + (4 * props.attackLoop/PC_ATTACK_LOOP_SWITCH);
				} else {
					return baseMeasure - (-29 * (props.attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH));
				}
			case 'left':
				var baseMeasure = -(AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.LEFT_SPACE) - (PLAYER_CHAR_INNER_HITBOX_HOR.horizontal/2));
				if (props.attackLoop === 0 && props.returnAttackLoop != 0) {
					return baseMeasure;
				} else if (props.attackLoop <= PC_ATTACK_LOOP_SWITCH) {
					return Math.round(6 * props.attackLoop/PC_ATTACK_LOOP_SWITCH) + baseMeasure;
				} else {
					return baseMeasure;
				}
			case 'up':
				var baseMeasure = (AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.RIGHT_SPACE));
				if (props.attackLoop === 0 && props.returnAttackLoop != 0) {
					return props.returnAttackLoop/PC_RETURN_ATTACK * baseMeasure;
				} else if (props.attackLoop <= PC_ATTACK_LOOP_SWITCH) {
					return baseMeasure + (4 * props.attackLoop/PC_ATTACK_LOOP_SWITCH);
				} else {
					return baseMeasure - (26 * (props.attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH));
				}
			case 'right':
				var baseMeasure = (AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.RIGHT_SPACE) - PLAYER_CHAR_WIDTH + PLAYER_CHAR_INNER_HITBOX_HOR.horizontal) + 10;
				if (props.attackLoop === 0 && props.returnAttackLoop != 0) {
					return baseMeasure;					
				} else if (props.attackLoop <= PC_ATTACK_LOOP_SWITCH) {
					return -Math.round(6 * props.attackLoop/PC_ATTACK_LOOP_SWITCH) + baseMeasure;
				} else {
					return baseMeasure;
				}
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

	findZRotate(dir) {
		let props = this.props;
		switch (dir) {
			case 'up':
				if (props.attackLoop === 0 && props.returnAttackLoop != 0) {
					return `rotateZ(${ Math.round(90 + (-90 * (props.returnAttackLoop/PC_RETURN_ATTACK))) }deg)`;
				} else if (props.attackLoop <= PC_ATTACK_LOOP_SWITCH) {
					return `rotateZ(${ Math.round(-45 * (props.attackLoop/PC_ATTACK_LOOP_SWITCH)) }deg)`;
				} else {
					return `rotateZ(${ Math.round((135 * ((props.attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH)))) - 45 }deg)`;
				}
			case 'left':
				if (props.attackLoop === 0 && props.returnAttackLoop != 0) {
					return `rotateZ(${ Math.round(-90 + (90 * props.returnAttackLoop/PC_RETURN_ATTACK))}deg)`;
				} else if (props.attackLoop <= PC_ATTACK_LOOP_SWITCH) {
					return `rotateZ(${ Math.round(45 * (props.attackLoop/PC_ATTACK_LOOP_SWITCH)) }deg)`;
				} else {
					return `rotateZ(${ Math.round(45 - (135 * ((props.attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH)))) }deg)`;
				}
			case 'down':
				if (props.attackLoop === 0 && props.returnAttackLoop != 0) {
					return `rotateZ(${ Math.round(-180 + (180 * (props.returnAttackLoop/PC_RETURN_ATTACK))) }deg)`;
				} else if (props.attackLoop <= PC_ATTACK_LOOP_SWITCH) {
					return `rotateZ(${ Math.round(45 * (props.attackLoop/PC_ATTACK_LOOP_SWITCH)) }deg)`;
				} else {
					return `rotateZ(${ Math.round((-225 * ((props.attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH)))) + 45 }deg)`;
				}
			case 'right':
				if (props.attackLoop === 0 && props.returnAttackLoop != 0) {
					return `rotateZ(-${ Math.round(90 + (-90 * props.returnAttackLoop/PC_RETURN_ATTACK)) }deg)`;
				} else if (props.attackLoop <= PC_ATTACK_LOOP_SWITCH) {
					return `rotateZ(${ Math.round(45 * (props.attackLoop/PC_ATTACK_LOOP_SWITCH)) }deg)`;
				} else {
					return `rotateZ(-${ Math.round(-45 + (135 * ((props.attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH)))) }deg)`;
				}
			default:
				return `rotateZ(${ props.attackLoop }deg)`;
		}
	}

	render() {
		let props = this.props;
		let playerDir = this.findPlayerDir(props.playerBgMoveY)
		return(
			<div
				className="game__player--axe"
				style={{
					'height': `${ AXE.HEIGHT }px`,
					'width': `${ AXE.WIDTH }px`,
					'backgroundSize': '100%',
					'position': 'absolute',
					'top': `${ this.findTop(playerDir) }px`,
					'left': `${ this.findLeft(playerDir) }px`,
					'transform': `${ this.findTransform(playerDir) } ${ this.findZRotate(playerDir) }`,
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