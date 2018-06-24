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
import { MAKE_SCREEN_ACTIVE, MOVE_CHAR, REGISTER_KEY_DOWN, REGISTER_KEY_UP } from '../actions/game.js';

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

const initialState = {
	screenActive: false,
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
	}
};

const gameData = (state = initialState, action) => {
	switch (action.type) {
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

			var newBgMoveY = getNewBgMoveY(action, state.player.bgMoveY);
			// rewrite to be based on map in constants.js
			if (newBgMoveY === 0 || newBgMoveY === 2) {
				newDir = 'vertical';
			} else {
				newDir = 'horizontal';
			}

			return {
				...state,
				player: {
					...state.player,
					posX: findNewPosX(action.left, action.right, state.player.posX, state.player.dir),
					posY: findNewPosY(action.up, action.down, state.player.posY),
					dir: newDir,
					bgMoveX: newBgMoveX,
					bgMoveY: getNewBgMoveY(action, state.player.bgMoveY),
					animLoop: newAnimLoop
				}
			}
		default:
			return state;
	}
}

export default gameData;