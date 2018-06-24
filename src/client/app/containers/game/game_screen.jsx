import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeScreenActive, createObstacle } from '../../actions/index.js';
import PlayerCharacter from './player_character.jsx';
import Obstacle from '../../components/game/obstacle.jsx';

class GameScreen extends Component {
	componentWillMount() {
		this.registerObstacles();
	}

	registerObstacles() {
		var numObstacles = Math.ceil((Math.random() * 4));
		for (var i = 0; i < numObstacles; i++) {
			this.props.createObstacle(i);
		}
	}

	render() {
		let props = this.props;
		return(
			<div
				className="game__outer-wrapper"
				onClick={ props.onClick }>
				<p>{ !props.screenActive && 'in' }active</p>
				<PlayerCharacter />
				{
					props.obstacles.map((obstacle) => {
						return(
							<Obstacle 
								key={ obstacle.key }
								height={ obstacle.height }
								width={ obstacle.width }
								left={ obstacle.left }
								top={ obstacle.top } />
						)
					})
				}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		screenActive: state.gameData.screenActive,
		obstacles: state.gameData.obstacles
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (e) => {
			dispatch(makeScreenActive());
		},
		createObstacle: (key) => {
			dispatch(createObstacle(key));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);