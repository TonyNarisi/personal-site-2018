import {
	GAME_SCREEN_HEIGHT,
	GAME_SCREEN_WIDTH,
	OPPOSITE_DIRS
} from '../constants/game.js'
import {
	MOVEMENT_RATE,
	PLAYER_CHAR_HEIGHT,
	PLAYER_CHAR_WIDTH,
	PLAYER_CHAR_INNER_HITBOX_VERT,
	PLAYER_CHAR_INNER_HITBOX_HOR,
	MAX_PC_BG_MOVE_X,
	PC_BG_MOVE_Y_MAP,
	REV_PC_Y_MAP,
	REV_PC_Y_MAP_COLL
} from '../constants/player.js';
import {
	POTENTIAL_DIRS,
	ARCHER_ENEMY
} from '../constants/enemies.js';
const enemyArr = [ARCHER_ENEMY];
import {
	MAKE_SCREEN_ACTIVE,
	REFRESH_SCREEN,
	REGISTER_KEY_DOWN,
	REGISTER_KEY_UP,
	CREATE_OBSTACLE,
	SET_NEW_ENEMY_POS,
	CHANGE_ENEMY_DIR
} from '../actions/game.js';

const findNewPosX = (left, right, posX, dir) => {
	var newPosX;

	if (left && !right) {
		newPosX = posX - MOVEMENT_RATE;
	} else if (right && !left) {
		newPosX = posX + MOVEMENT_RATE;
	} else {
		newPosX = posX;
	}

	if (newPosX < -(PLAYER_CHAR_INNER_HITBOX_HOR[dir]/2))  {
		newPosX = -(PLAYER_CHAR_INNER_HITBOX_HOR[dir]/2);
	} else if (newPosX > (GAME_SCREEN_WIDTH - PLAYER_CHAR_WIDTH + (PLAYER_CHAR_INNER_HITBOX_HOR[dir]/2))) {
		newPosX = (GAME_SCREEN_WIDTH - PLAYER_CHAR_WIDTH + PLAYER_CHAR_INNER_HITBOX_HOR[dir]/2);
	}

	return newPosX;
}

const findNewPosY = (up, down, posY) => {
	var newPosY;

	if (up && !down) {
		newPosY = posY - MOVEMENT_RATE;
	} else if (down && !up) {
		newPosY = posY + MOVEMENT_RATE;
	} else {
		newPosY = posY;
	}

	if (newPosY < 0) {
		newPosY = 0;
	} else if (newPosY > (GAME_SCREEN_HEIGHT - PLAYER_CHAR_HEIGHT)) {
		newPosY = GAME_SCREEN_HEIGHT - PLAYER_CHAR_HEIGHT;
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
	let top = posY;
	let bottom = posY + PLAYER_CHAR_HEIGHT;
	let right = posX + PLAYER_CHAR_WIDTH - PLAYER_CHAR_INNER_HITBOX_HOR[dir]/2;
	let left = posX + (PLAYER_CHAR_INNER_HITBOX_HOR[dir]/2);
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
	let right = posX + PLAYER_CHAR_WIDTH - (PLAYER_CHAR_INNER_HITBOX_HOR[dir]/2);
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
					correctedX = oldPosX - 4;
				} else {
					correctedX = oldPosX + 4;
				}
			} else {
				correctedX = oldPosX;
			}
		}
	}
	return [correctedX, correctedY];
}

const getNewAnimLoop = animLoop => {
	var newAnimLoop = animLoop + 1;
	if (newAnimLoop > 1) {
		newAnimLoop = 0;
	}
	return newAnimLoop;
}

const getNewBgMoveX = (shouldChange, bgMoveX, max, isMoving) => {
	var newBgMoveX;
	if (isMoving) {
		newBgMoveX = bgMoveX + 1;
	} else {
		newBgMoveX = 0;
	}

	if (newBgMoveX > max) {
		newBgMoveX = 0;
	}

	if (!shouldChange) {
		newBgMoveX = bgMoveX;
	}

	return newBgMoveX;
}

const moveCharFromCollision = (player, obstacles) => {
	var oldPosX = player.posX;
	var oldPosY = player.posY;

	let hitDir = player.hitDir;
	let left = hitDir === 'left';
	let right = hitDir === 'right';
	let up = hitDir === 'up';
	let down = hitDir === 'down';

	if (left || right) {
		var dir = 'horizontal';
	} else {
		var dir = 'vertical';
	}

	var newPosX = findNewPosX(left, right, oldPosX, dir);
	var newPosY = findNewPosY(up, down, oldPosY);
	var newCoords = evalObstacles(oldPosX, oldPosY, newPosX, newPosY, obstacles, dir, dir);
	newPosX = newCoords[0];
	newPosY = newCoords[1];

	return {
		posX: newPosX,
		posY: newPosY
	}
}

const moveChar = (player, action, obstacles) => {
	var newDir;
	var oldPosX = player.posX;
	var oldPosY = player.posY;
	var oldDir = player.dir;

	var newAnimLoop = getNewAnimLoop(player.animLoop);
	// Change to be constant based for slower animating enemies
	let animShouldChange = newAnimLoop === 0;
	let isMoving = action.left || action.right || action.up || action.down;
	var newBgMoveX = getNewBgMoveX(animShouldChange, player.bgMoveX, MAX_PC_BG_MOVE_X, isMoving);

	var newBgMoveY = getNewBgMoveY(action, player.bgMoveY);
	if (newBgMoveY === PC_BG_MOVE_Y_MAP.up || newBgMoveY === PC_BG_MOVE_Y_MAP.down) {
		newDir = 'vertical';
	} else {
		newDir = 'horizontal';
	}

	var newPosX = findNewPosX(action.left, action.right, player.posX, newDir);
	var newPosY = findNewPosY(action.up, action.down, player.posY);
	var newCoords = evalObstacles(oldPosX, oldPosY, newPosX, newPosY, obstacles, newDir, oldDir);
	newPosX = newCoords[0];
	newPosY = newCoords[1];

	return { 
		posX: newPosX,
		posY: newPosY,
		dir: newDir,
		bgMoveX: newBgMoveX,
		bgMoveY: newBgMoveY,
		animLoop: newAnimLoop
	}
}

const getEnemyNewX = (dir, posX, enemyArr) => {
	var newPosX = posX;
	var collision = false;

	if (dir === 'left') {
		newPosX = posX + enemyArr.MOVE_RATE;
	} else if (dir === 'right') {
		newPosX = posX - enemyArr.MOVE_RATE;
	}

	if (newPosX < 0) {
		newPosX = 0;
		collision = true;
	} else if (newPosX > GAME_SCREEN_WIDTH - enemyArr.WIDTH) {
		newPosX = GAME_SCREEN_WIDTH - enemyArr.WIDTH;
		collision = true;
	}

	return { pos: newPosX, collision };
}

const getEnemyNewY = (dir, posY, enemyConst) => {
	var newPosY = posY;
	var collision = false;

	if (dir === 'up') {
		newPosY = posY + enemyConst.MOVE_RATE;
	} else if (dir === 'down') {
		newPosY = posY - enemyConst.MOVE_RATE;
	}

	if (newPosY < 0) {
		newPosY = 0;
		collision = true;
	} else if (newPosY > GAME_SCREEN_HEIGHT - enemyConst.HEIGHT) {
		newPosY = GAME_SCREEN_HEIGHT - enemyConst.HEIGHT;
		collision = true;
	}

	return { pos: newPosY, collision };
}

const getNewDirLoop = (dirLoop, enemyConst, collision) => {
	var newDirLoop = dirLoop + 1;
	if (newDirLoop > enemyConst.DIR_LOOP_MAX || collision) {
		newDirLoop = 0;
	}
	return newDirLoop;
}

const getNewDir = () => {
	let idx = Math.floor(Math.random() * POTENTIAL_DIRS.length);
	return POTENTIAL_DIRS[idx];
}

const evalEnemyAgainstObs = (posX, posY, obs, enemyConst) => {
	// needs major refactor
	let top = posY;
	let bottom = posY + enemyConst.HEIGHT;
	let right = posX + enemyConst.WIDTH;
	let left = posX;
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

const detectObsEnemyColl = (oldX, oldY, newX, newY, enemyConst, obstacles) => {
	var correctedX = newX;
	var correctedY = newY;
	for (var obstacleNum = obstacles.length, i = 0; i < obstacleNum; i++) {
		var noMoveY = false;
		var noMoveX = false;
		var isInside = evalEnemyAgainstObs(newX, newY, obstacles[i], enemyConst);

		if (isInside) {
			var noMoveY = evalEnemyAgainstObs(oldX, newY, obstacles[i], enemyConst);
			var noMoveX = evalEnemyAgainstObs(newX, oldY, obstacles[i], enemyConst);
		}

		if (noMoveY) {
			correctedY = oldY;
		}	
		if (noMoveX) {
			correctedX = oldX;
		}
	}
	return [correctedX, correctedY];
}

const detectCharEnemyColl = (charMove, enemyMoves) => {
	var enemyId;
	let userTop = charMove.posY;
	let userBottom = charMove.posY + PLAYER_CHAR_HEIGHT;
	let userRight = charMove.posX + PLAYER_CHAR_WIDTH - (PLAYER_CHAR_INNER_HITBOX_HOR[charMove.dir]/2);
	let userLeft = charMove.posX + (PLAYER_CHAR_INNER_HITBOX_HOR[charMove.dir]/2);
	var enemyColl = false;

	for (var enemyNum = enemyMoves.length, i = 0; i < enemyNum; i++) {
		let curMove = enemyMoves[i];
		let enemyRules = enemyArr.filter(proto => {
			return proto.type === curMove.type;
		})[0];
		let enemyTop = curMove.posY;
		let enemyBottom = curMove.posY + enemyRules.HEIGHT;
		let enemyRight = curMove.posX + enemyRules.WIDTH;
		let enemyLeft = curMove.posX;
		var userInsideEnemyY = (userTop > enemyTop && userTop < enemyBottom) || (userBottom < enemyBottom && userBottom > enemyTop);
		var enemyInsideUserY = (enemyTop > userTop && enemyTop < userBottom) || (enemyBottom < userBottom && enemyBottom > userTop);
		if (userInsideEnemyY || enemyInsideUserY) {
			var isInsideY = true;
		} else {
			var isInsideY = false;
		}
		var userInsideEnemyX = (userLeft > enemyLeft && userLeft < enemyRight) || (userRight > enemyLeft && userRight < enemyRight);
		var enemyInsideUserX = (enemyLeft > userLeft && enemyLeft < userRight) || (enemyRight > userLeft && enemyRight < userRight);
		if (userInsideEnemyX || enemyInsideUserX) {
			var isInsideX = true;
		} else {
			var isInsideX = false;
		}
		if (isInsideY && isInsideX) {
			enemyColl = true;
			enemyId = curMove.id;
		}
	}
	return {
		didHappen: enemyColl,
		enemyId: enemyId
	};
}

const moveEnemy = (enemy, obstacles) => {
	let enemyConst = enemyArr.filter(proto => {
		return proto.type === enemy.type;
	})[0];

	let newAnimLoop = getNewAnimLoop(enemy.animLoop);
	let animShouldChange = newAnimLoop === 0;

	// Use this with false as final parameter when enemy is attacking and not moving to reset animation frame
	var newBgMoveX = getNewBgMoveX(animShouldChange, enemy.bgMoveX, enemyConst.MAX_BG_MOVE_X, true);

	var newBgMoveY = enemyConst.BG_MOVE_Y_MAP[enemy.dir];

	var newX = getEnemyNewX(enemy.dir, enemy.posX, enemyConst);
	var newY = getEnemyNewY(enemy.dir, enemy.posY, enemyConst);
	var correctedCoords = detectObsEnemyColl(enemy.posX, enemy.posY, newX.pos, newY.pos, enemyConst, obstacles);
	var correctedX = correctedCoords[0];
	var correctedY = correctedCoords[1];
	var obsCollision = correctedX != newX.pos || correctedY != newY.pos;
	var collision = newX.collision || newY.collision || obsCollision;
	var newDirLoop = getNewDirLoop(enemy.dirLoop, enemyConst, collision)
	if (newDirLoop === 0) {
		var newDir = getNewDir();
	} else {
		var newDir = enemy.dir
	}
	return {
		...enemy,
		posX: correctedX,
		posY: correctedY,
		animLoop: newAnimLoop,
		bgMoveX: newBgMoveX,
		bgMoveY: newBgMoveY,
		dirLoop: newDirLoop,
		dir: newDir
	}
}

const initialState = {
	screenActive: false,
	obstacles: [],
	player: {
		posX: GAME_SCREEN_WIDTH/2 - PLAYER_CHAR_WIDTH/2,
		posY: GAME_SCREEN_HEIGHT/2 - PLAYER_CHAR_HEIGHT/2,
		dir: 'vertical',
		hitDir: 'left',
		bgMoveX: 0,
		bgMoveY: 2,
		animLoop: 0,
		health: 4,
		isGettingHit: false,
		hitLoop: 0,
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
			posX: 200,
			posY: 200,
			dirLoop: 0,
			dir: 'up',
			health: 2,
			bgMoveX: 0,
			bgMoveY: 0,
			animLoop: 0
		},
		{
			type: 'archer',
			id: 'archer8544',
			posX: 300,
			posY: 300,
			dirLoop: 0,
			dir: 'left',
			health: 2,
			bgMoveX: 0,
			bgMoveY: 0,
			animLoop: 0
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
		case REFRESH_SCREEN:
			let obs = state.obstacles;
			let player = state.player;
			if (!player.isGettingHit) {
				var proposedCharMove = moveChar(player, action, obs);
			} else {
				var proposedCharMove = moveCharFromCollision(player, obs);
				proposedCharMove.hitLoop = player.hitLoop + 1;
			}
			if (proposedCharMove.hitLoop > 10) {
				proposedCharMove.hitLoop = 0;
				proposedCharMove.isGettingHit = false;
			}
			var proposedEnemyMoves = state.enemies.map(enemy => {
				return moveEnemy(enemy, obs);
			})
			var charEnemyCollision = (player.isGettingHit ? false : detectCharEnemyColl(proposedCharMove, proposedEnemyMoves));
			if (charEnemyCollision.didHappen) {
				proposedCharMove.health = player.health - 1;
				proposedCharMove.isGettingHit = true;
				// Replace with a function that determines the direction of the actual hit and reverses it
				proposedCharMove.hitDir = REV_PC_Y_MAP_COLL[proposedCharMove.bgMoveY];
				proposedEnemyMoves = proposedEnemyMoves.map(enemy => {
					return(
						enemy.id === charEnemyCollision.enemyId ?
								{
									...enemy,
									dir: OPPOSITE_DIRS[enemy.dir]
								}
							:
								enemy
					)
				})
			}

			return {
				...state,
				player: {
					...player,
					...proposedCharMove
				},
				enemies: proposedEnemyMoves
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