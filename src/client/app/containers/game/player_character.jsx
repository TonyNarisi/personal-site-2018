import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerKeyDown, registerKeyUp, playerAttack } from '../../actions/index.js';
import PlayerAxe from '../../components/game/player_axe.jsx';
import {
	ARROW_KEYCODES,
	PLAYER_CHAR_WIDTH,
	PLAYER_CHAR_HEIGHT,
	PLAYER_CHAR_X_OFFSET,
	PLAYER_CHAR_Y_OFFSET,
	PLAYER_CHAR_SPRITE_HEIGHT,
	PLAYER_CHAR_SPRITE_WIDTH
} from '../../constants/player.js'
import charWalkcycle from '../../../public/assets/game/walkcycles/BODY_skeleton.png';

class PlayerCharacter extends Component {
	componentWillMount() {
		document.addEventListener('keydown', (e) => {
			let props = this.props;
			if (props.screenActive && this.isArrow(e.keyCode)) {
				props.registerKeyDown(e, props.isAttacking, props.dir);
			}
			if (props.screenActive && e.keyCode === 32 && !props.isAttacking) {
				props.playerAttack();
			}
		})

		document.addEventListener('keyup', (e) => {
			let props = this.props;
			if (props.screenActive && this.isArrow(e.keyCode)) {
				props.registerKeyUp(e);
			}
		})
	}

	isArrow(code) {
		return ARROW_KEYCODES.indexOf(code) > -1;
	}

	render() {
		let props = this.props;
		return(
			<div
				id="player-avatar"
				className="game__player--wrap"
				style={{
					height: `${ PLAYER_CHAR_HEIGHT }px`,
					width: `${ PLAYER_CHAR_WIDTH }px`,
					left: `${ props.posX }px`,
					top: `${ props.posY }px`,
					zIndex: props.posY + PLAYER_CHAR_HEIGHT,
					backgroundImage: `url(${ charWalkcycle })`,
					backgroundPositionX: `${ (props.bgMoveX * PLAYER_CHAR_SPRITE_WIDTH) - PLAYER_CHAR_X_OFFSET }px`,
					backgroundPositionY: `${ (props.bgMoveY * PLAYER_CHAR_SPRITE_HEIGHT) - PLAYER_CHAR_Y_OFFSET }px`
				}}>
				<PlayerAxe />
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		screenActive: state.gameData.screenActive,
		dir: state.gameData.player.dir,
		posX: state.gameData.player.posX,
		posY: state.gameData.player.posY,
		bgMoveX: state.gameData.player.bgMoveX,
		bgMoveY: state.gameData.player.bgMoveY,
		health: state.gameData.player.health,
		isAttacking: state.gameData.player.isAttacking
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		registerKeyDown: (e, isAttacking, oldDir) => {
			dispatch(registerKeyDown(e, isAttacking, oldDir));
		},
		registerKeyUp: (e) => {
			dispatch(registerKeyUp(e));
		},
		playerAttack: () => {
			dispatch(playerAttack());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCharacter);