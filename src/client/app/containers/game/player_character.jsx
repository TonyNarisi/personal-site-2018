import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveChar, registerKeyDown, registerKeyUp } from '../../actions/index.js';
import {
	ARROW_KEYCODES,
	REFRESH_MS,
	PLAYER_CHAR_WIDTH,
	PLAYER_CHAR_HEIGHT,
	PLAYER_CHAR_X_OFFSET,
	PLAYER_CHAR_Y_OFFSET,
	PLAYER_CHAR_SPRITE_HEIGHT,
	PLAYER_CHAR_SPRITE_WIDTH
} from '../../constants.js'
import charWalkcycle from '../../../public/assets/game/walkcycles/BODY_skeleton.png';

class PlayerCharacter extends Component {
	componentWillMount() {
		document.addEventListener('keydown', (e) => {
			let props = this.props;
			console.log(e);
			if (props.screenActive && this.isArrow(e.keyCode)) {
				props.registerKeyDown(e);
			}
		})

		document.addEventListener('keyup', (e) => {
			let props = this.props;
			if (props.screenActive && this.isArrow(e.keyCode)) {
				props.registerKeyUp(e);
			}
		})

		this.refreshCharMovement();
	}

	refreshCharMovement() {
		setInterval(() => {
			let props = this.props;
			props.moveChar(props.movingUp, props.movingDown, props.movingLeft, props.movingRight);
		}, REFRESH_MS)
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
					left: `calc(50% - ${ props.posX - (PLAYER_CHAR_WIDTH/2) }px)`,
					top: `calc(50% - ${ props.posY - (PLAYER_CHAR_HEIGHT/2) }px)`,
					backgroundImage: `url(${ charWalkcycle })`,
					backgroundPositionX: `${ (props.bgMoveX * PLAYER_CHAR_SPRITE_WIDTH) - PLAYER_CHAR_X_OFFSET }px`,
					backgroundPositionY: `${ (props.bgMoveY * PLAYER_CHAR_SPRITE_HEIGHT) - PLAYER_CHAR_Y_OFFSET }px`
				}}>
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
		movingUp: state.gameData.player.upMovement,
		movingDown: state.gameData.player.downMovement,
		movingLeft: state.gameData.player.leftMovement,
		movingRight: state.gameData.player.rightMovement
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		registerKeyDown: (e) => {
			dispatch(registerKeyDown(e));
		},
		registerKeyUp: (e) => {
			dispatch(registerKeyUp(e));
		},
		moveChar: (up, down, left, right) => {
			dispatch(moveChar(up, down, left, right));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCharacter);