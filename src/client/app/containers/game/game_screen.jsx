import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeScreenActive, createObstacle, refreshScreen } from '../../actions/index.js';
import PlayerCharacter from './player_character.jsx';
import ArcherEnemy from './archer_enemy.jsx';
import Obstacle from '../../components/game/obstacle.jsx';
import BgTile from '../../components/game/bg_tile.jsx';
import { REFRESH_MS, BG_TILE_HEIGHT, BG_TILE_WIDTH, GAME_SCREEN_HEIGHT, GAME_SCREEN_WIDTH } from '../../constants/game.js';
import heart from '../../../public/assets/game/anatomical-heart.gif';

const enemies = {
	'archer': ArcherEnemy
}

class GameScreen extends Component {
	componentWillMount() {
		this.registerObstacles();
		this.refreshScreen();
	}

	refreshScreen() {
		setInterval(() => {
			let props = this.props;
			if (props.screenActive) {
				props.refreshScreen(props.movingUp, props.movingDown, props.movingLeft, props.movingRight);
			}
		}, REFRESH_MS)
	}

	registerObstacles() {
		var numObstacles = Math.ceil((Math.random() * 3));
		for (var i = 0; i < numObstacles; i++) {
			this.props.createObstacle(i);
		}
	}

	render() {
		let props = this.props;
		let healthArr = [];
		for (var i = 0; i < props.health; i++) {
			healthArr.push(`h${i}`);
		}
		let numOfBgCols = Math.ceil(GAME_SCREEN_WIDTH/BG_TILE_WIDTH);
		let numOfBgRows = Math.ceil(GAME_SCREEN_HEIGHT/BG_TILE_HEIGHT);
		let bgColArr = [];
		for (var i = 0; i < numOfBgCols; i++) {
			bgColArr.push({ name: `col${i}`, num: i });
		}
		let bgRowArr = [];
		for (var i = 0; i < numOfBgRows; i++) {
			bgRowArr.push({ cols: bgColArr, num: i });
		}
		return(
			<div
				className="game__outer-wrapper"
				onClick={ props.onClick }>
				<p>{ !props.screenActive && 'in' }active</p>
				{ healthArr.map(health => {
					return (
						<img
							src={ heart }
							key={ health }
							className="game__player-health" />
					)
				})}
				<PlayerCharacter />
				{ bgRowArr.map((row, i) => {
					return (
						row.cols.map(col => {
							return (
								<BgTile
									colNum = { col.num }
									rowNum = { row.num }
									key={col.name + i} />
							)
						})
					)
				})}
				{ props.enemies.map(enemy => {
					var EnemyComponent = enemies[enemy.type];
					return (
						<EnemyComponent
							key={ enemy.id }
							id={ enemy.id }
							posX={ enemy.posX }
							posY={ enemy.posY }
							bgMoveX={ enemy.bgMoveX }
							bgMoveY={ enemy.bgMoveY } />
					)
				})}
				{ props.obstacles.map(obstacle => {
					return(
						<Obstacle 
							key={ obstacle.key }
							type={ obstacle.type }
							spriteHeight={ obstacle.spriteHeight }
							spriteWidth={ obstacle.spriteWidth }
							height={ obstacle.height }
							width={ obstacle.width }
							left={ obstacle.left }
							top={ obstacle.top } />
					)
				})}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		screenActive: state.gameData.screenActive,
		health: state.gameData.player.health,
		obstacles: state.gameData.obstacles,
		enemies: state.gameData.enemies,
		movingUp: state.gameData.player.upMovement,
		movingDown: state.gameData.player.downMovement,
		movingLeft: state.gameData.player.leftMovement,
		movingRight: state.gameData.player.rightMovement
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (e) => {
			dispatch(makeScreenActive());
		},
		createObstacle: (key) => {
			dispatch(createObstacle(key));
		},
		refreshScreen: (up, down, left, right) => {
			dispatch(refreshScreen(up, down, left, right));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);