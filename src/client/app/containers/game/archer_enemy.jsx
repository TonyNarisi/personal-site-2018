import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNewEnemyPos, changeEnemyDir } from '../../actions/index.js';
import { REFRESH_MS } from '../../constants/game.js';
import { ARCHER_ENEMY } from '../../constants/enemies.js';

class ArcherEnemy extends Component {
	constructor() {
		super();

		this.detectCollision = this.detectCollision.bind(this);
		this.getNewPosX = this.getNewPosX.bind(this);
		this.getNewPosY = this.getNewPosY.bind(this);
		this.refreshEnemyActions = this.refreshEnemyActions.bind(this);
	}

	componentWillMount() {
		// Eventually make the arguments randomly passed
		this.refreshEnemyActions(true, false);
	}

	chooseRandomDir() {
		let props = this.props;
		var idx = Math.floor(Math.random() * 4);
		var dirs = ['up', 'down', 'left', 'right'];
		props.changeEnemyDir(props.id, dirs[idx]);
	}

	detectCollision() {
		// Wrong, obviously
		return false;
	}

	getNewPosX(dir) {
		var newPosX;
		let posX = this.props.posX;

		if (dir === 'left') {
			newPosX = posX + ARCHER_ENEMY.MOVE_RATE;
		} else if (dir === 'right') {
			newPosX = posX - ARCHER_ENEMY.MOVE_RATE;
		}
		return newPosX;
	}

	getNewPosY(dir) {
		var newPosY;
		let posY = this.props.posY;

		if (dir === 'up') {
			newPosY = posY + ARCHER_ENEMY.MOVE_RATE;
		} else if (dir === 'down') {
			newPosY = posY - ARCHER_ENEMY.MOVE_RATE;
		}
		return newPosY;
	}

	refreshEnemyActions(move, attack) {
		let props = this.props;
		var i = 0;
		var enemyAction = setInterval(() => {
			if (move) {
				if (props.dir === 'left' || props.dir === 'right') {
					var newPosX = this.getNewPosX(props.dir);
					var newPosY = props.posY;
				} else if (props.dir === 'up' || props.dir === 'down') {
					var newPosY = this.getNewPosY(props.dir);
					var newPosX = props.posX;
				}
				var collision = this.detectCollision()
			}
			// change based on collision detection
			props.setNewEnemyPos(props.id, newPosX, newPosY);
			i++;
			if (i === 90) {
				clearInterval(enemyAction);
				this.chooseRandomDir();
				this.refreshEnemyActions(true, false);
			}
		}, REFRESH_MS);
	}

	render() {
		let props = this.props;
		return(
			<div
				className="game__enemy archer"
				style={{
					height: `${ ARCHER_ENEMY.HEIGHT }px`,
					width: `${ ARCHER_ENEMY.WIDTH }px`,
					top: `${ props.posY }px`,
					left: `${ props.posX }px`,
					// temporary
					backgroundColor: '#303030'
				}}>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		screenActive: state.gameData.screenActive,
		obstacles: state.gameData.obstacles,
		posX: ownProps.posX,
		posY: ownProps.posY,
		id: ownProps.id,
		dir: ownProps.dir
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setNewEnemyPos: (id, posX, posY) => {
			dispatch(setNewEnemyPos(id, posX, posY));
		},
		changeEnemyDir: (id, dir) => {
			dispatch(changeEnemyDir(id, dir));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ArcherEnemy);