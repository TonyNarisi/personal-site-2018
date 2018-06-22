import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeScreenActive } from '../../actions/index.js';
import PlayerCharacter from './player_character.jsx';

class GameScreen extends Component {
	render() {
		let props = this.props;
		return(
			<div
				className="game__outer-wrapper"
				onClick={ props.onClick }>
				<p>{ !props.screenActive && 'in' }active</p>
				<PlayerCharacter />
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		screenActive: state.gameData.screenActive
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick:  (e) => {
			dispatch(makeScreenActive());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);