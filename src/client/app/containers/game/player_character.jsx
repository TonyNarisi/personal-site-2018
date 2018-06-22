import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveChar, registerKeyDown, registerKeyUp } from '../../actions/index.js';
import { ARROW_KEYCODES, REFRESH_MS } from '../../constants.js'

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
				className="game__player--wrap"
				style={{
					left: `calc(50% - ${ props.posX - 8 }px)`,
					top: `calc(50% - ${ props.posY - 8 }px)`
				}}>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		screenActive: state.gameData.screenActive,
		posX: state.gameData.player.posX,
		posY: state.gameData.player.posY,
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