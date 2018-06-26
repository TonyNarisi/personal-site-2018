import {
	MOVEMENT_RATE,
	GAME_SCREEN_HEIGHT,
	GAME_SCREEN_WIDTH,
	PLAYER_CHAR_HEIGHT,
	PLAYER_CHAR_WIDTH,
	PLAYER_CHAR_INNER_HITBOX_VERT,
	PLAYER_CHAR_INNER_HITBOX_HOR,
	MAX_PC_BG_MOVE_X,
	PC_BG_MOVE_Y_MAP
} from '../constants.js';
import {
	MAKE_SCREEN_ACTIVE,
	MOVE_CHAR,
	REGISTER_KEY_DOWN,
	REGISTER_KEY_UP,
	CREATE_OBSTACLE,
	SET_NEW_ENEMY_POS,
	CHANGE_ENEMY_DIR
} from '../actions/game.js';

const findNewPosX = (left, right, posX, dir) => {
	var newPosX;

	if (left && !right) {
		newPosX = posX + MOVEMENT_RATE;
	} else if (right && !left) {
		newPosX = posX - MOVEMENT_RATE;
	} else {
		newPosX = posX;
	}

	if (newPosX < -((GAME_SCREEN_WIDTH/2) - ((PLAYER_CHAR_WIDTH * 1.5) - PLAYER_CHAR_INNER_HITBOX_HOR[dir]/2)))  {
		newPosX = -((GAME_SCREEN_WIDTH/2) - ((PLAYER_CHAR_WIDTH * 1.5) - PLAYER_CHAR_INNER_HITBOX_HOR[dir]/2));
	} else if (newPosX > ((GAME_SCREEN_WIDTH/2) + (PLAYER_CHAR_WIDTH/2) + PLAYER_CHAR_INNER_HITBOX_HOR[dir]/2)) {
		newPosX = ((GAME_SCREEN_WIDTH/2) + (PLAYER_CHAR_WIDTH/2) + PLAYER_CHAR_INNER_HITBOX_HOR[dir]/2);
	}

	return newPosX;
}

const findNewPosY = (up, down, posY) => {
	var newPosY;

	if (up && !down) {
		newPosY = posY + MOVEMENT_RATE;
	} else if (down && !up) {
		newPosY = posY - MOVEMENT_RATE;
	} else {
		newPosY = posY;
	}

	if (newPosY < -((GAME_SCREEN_HEIGHT/2) - (PLAYER_CHAR_HEIGHT * 1.5))) {
		newPosY = -((GAME_SCREEN_HEIGHT/2) - (PLAYER_CHAR_HEIGHT * 1.5));
	} else if (newPosY > ((GAME_SCREEN_HEIGHT/2) + (PLAYER_CHAR_HEIGHT/2))) {
		newPosY = ((GAME_SCREEN_HEIGHT/2) + (PLAYER_CHAR_HEIGHT/2));
	}

	return newPosY;
}

const getNewBgMoveY = (action, bgMoveY) => {
	const dirs = ['left', 'right', 'up', 'down'];
	for (var dirNum = dirs.length, i = 0; i < dirNum; i++) {
		if (action[dirs[i]]) {
			var isOnly = true;
			for (var j = 0; j < dirNum; j++) {
				if (action[dirs[j]] && i != j) {
					isOnly = false;
				}
			}
		}
		if (isOnly) {
			return PC_BG_MOVE_Y_MAP[dirs[i]];
		}
	}
	return bgMoveY;
}

const evalPlayerAgainstObs = (posX, posY, obs, dir, oldDir) => {
	// needs major refactor
	let top = GAME_SCREEN_HEIGHT/2 - posY + PLAYER_CHAR_HEIGHT/2;
	let bottom = GAME_SCREEN_HEIGHT/2 - posY + PLAYER_CHAR_HEIGHT/2 + PLAYER_CHAR_HEIGHT;
	let right = GAME_SCREEN_WIDTH/2 - posX + PLAYER_CHAR_WIDTH/2 + PLAYER_CHAR_WIDTH - PLAYER_CHAR_INNER_HITBOX_HOR[dir]/2;
	let left = GAME_SCREEN_WIDTH/2 - posX + PLAYER_CHAR_WIDTH/2 + PLAYER_CHAR_INNER_HITBOX_HOR[dir]/2;
	var isInsideX = false;
	var isInsideY = false;
	let xRange = [obs.left, obs.left + obs.width];
	let yRange = [obs.top, obs.top + obs.height];

	if (left > xRange[0] && left < xRange[1] || right > xRange[0] && right < xRange[1]) {
		isInsideX = true;
	}
	if (
		(xRange[0] >= left && xRange[1] <= right) ||
		(xRange[0] <= left && xRange[1] >= right) ||
		(xRange[0] <= left && xRange[1] >= right)
	) {
		isInsideX = true;
	}

	if (top > yRange[0] && top < yRange[1] || bottom > yRange[0] && bottom < yRange[1]) {
		isInsideY = true;
	}
	if (
		(yRange[0] >= top && yRange[1] <= bottom) ||
		(yRange[0] <= top && yRange[0] >= bottom) ||
		(yRange[1] <= top && yRange[1] >= bottom)
	) {
		isInsideY = true;
	}

	return isInsideX && isInsideY;
}

const evalPlayerHorObs = (posX, obs, dir) => {
	let right = GAME_SCREEN_WIDTH/2 - posX + PLAYER_CHAR_WIDTH/2 + PLAYER_CHAR_WIDTH;
	let left = GAME_SCREEN_WIDTH/2 - posX + PLAYER_CHAR_WIDTH/2;
	let xRange = [obs.left, obs.left + obs.width];
	let yRange = [obs.top, obs.top + obs.height];
	return (
		(right > xRange[0] && right < xRange[1])
	)
}

const evalObstacles = (oldPosX, oldPosY, posX, posY, obstacles, dir, oldDir) => {
	// needs major refactor
	var correctedX = posX;
	var correctedY = posY;
	for (var obstacleNum = obstacles.length, i = 0; i < obstacleNum; i++) {
		var noMoveY = false;
		var noMoveX = false;
		var isInside = evalPlayerAgainstObs(posX, posY, obstacles[i], dir);

		if (isInside) {
			var noMoveY = evalPlayerAgainstObs(oldPosX, posY, obstacles[i], dir);
			var noMoveX = evalPlayerAgainstObs(posX, oldPosY, obstacles[i], dir);
		}

		if (noMoveY) {
			correctedY = oldPosY;
		}	
		if (noMoveX) {
			if (dir === 'vertical' && oldDir === 'horizontal') {
				// only works for left side, need to determine if user is pressing against left or right side
				var isOnLeft = evalPlayerHorObs(oldPosX, obstacles[i], dir);
				if (isOnLeft) {
					correctedX = oldPosX + 4;
				} else {
					correctedX = oldPosX - 4;
				}
			} else {
				correctedX = oldPosX;
			}
		}
	}
	return [correctedX, correctedY];
}

const initialState = {
	screenActive: false,
	obstacles: [],
	player: {
		posX: PLAYER_CHAR_WIDTH,
		posY: PLAYER_CHAR_HEIGHT,
		dir: 'vertical',
		bgMoveX: 0,
		bgMoveY: 2,
		animLoop: 0,
		health: 4,
		upMovement: false,
		downMovement: false,
		leftMovement: false,
		rightMovement: false
	},
	// change to be dynamic
	enemies: [
		{
			type: 'archer',
			id: 'archer8543',
			posX: -100,
			posY: -100,
			dir: 'up'
		},
		{
			type: 'archer',
			id: 'archer8544',
			posX: -60,
			posY: -60,
			dir: 'left'
		}
	]
};

const gameData = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_OBSTACLE:
			return {
				...state,
				obstacles: state.obstacles.concat([{
					'key': action.key,
					'left': action.left,
					'top': action.top,
					'width': action.width,
					'height': action.height
				}])
			}
		case MAKE_SCREEN_ACTIVE:
			return {
				...state,
				screenActive: true
			}
		case REGISTER_KEY_DOWN:
			return {
				...state,
				player: {
					...state.player,
					[`${action.dir}Movement`]: true,
					bgMoveY: PC_BG_MOVE_Y_MAP[action.dir]
				}
			}
		case REGISTER_KEY_UP:
			return {
				...state,
				player: {
					...state.player,
					[`${action.dir}Movement`]: false
				}
			}
		case MOVE_CHAR: 
			// REFACTOR THIS
			var newBgMoveX, newAnimLoop, newDir;
			var oldPosX = state.player.posX;
			var oldPosY = state.player.posY;

			newAnimLoop = state.player.animLoop + 1;
			if (newAnimLoop > 1) {
				newAnimLoop = 0;
				if (action.left || action.right || action.up || action.down) {
					newBgMoveX = state.player.bgMoveX + 1;
				} else {
					newBgMoveX = 0;
				}

				if (newBgMoveX > MAX_PC_BG_MOVE_X) {
					newBgMoveX = 0;
				}
			} else {
				newBgMoveX = state.player.bgMoveX;
			}

			var oldDir = state.player.dir;
			var newBgMoveY = getNewBgMoveY(action, state.player.bgMoveY);
			// rewrite to be based on map in constants.js
			if (newBgMoveY === 0 || newBgMoveY === 2) {
				newDir = 'vertical';
			} else {
				newDir = 'horizontal';
			}

			var newPosX = findNewPosX(action.left, action.right, state.player.posX, newDir);
			var newPosY = findNewPosY(action.up, action.down, state.player.posY);
			var newCoords = evalObstacles(oldPosX, oldPosY, newPosX, newPosY, state.obstacles, newDir, oldDir);
			newPosX = newCoords[0];
			newPosY = newCoords[1];

			return {
				...state,
				player: {
					...state.player,
					posX: newPosX,
					posY: newPosY,
					dir: newDir,
					bgMoveX: newBgMoveX,
					bgMoveY: getNewBgMoveY(action, state.player.bgMoveY),
					animLoop: newAnimLoop
				}
			}
		case SET_NEW_ENEMY_POS:
			var newEnemies = state.enemies.map(enemy => {
				return (
					enemy.id === action.id ?
							{
								...enemy,
								posX: action.posX,
								posY: action.posY
							}
						:
							enemy
				)
			})
			return {
				...state,
				enemies: newEnemies
			}
		case CHANGE_ENEMY_DIR:
			var newEnemies = state.enemies.map(enemy => {
				return (
					enemy.id === action.id ?
							{
								...enemy,
								dir: action.dir
							}
						:
							enemy
				)
			})
			return {
				...state,
				enemies: newEnemies
			}
		default:
			return state;
	}
}

export default gameData;