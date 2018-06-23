import {
	MOVEMENT_RATE,
	GAME_SCREEN_HEIGHT,
	GAME_SCREEN_WIDTH,
	PLAYER_CHAR_HEIGHT,
	PLAYER_CHAR_WIDTH,
	MAX_PC_BG_MOVE_X,
	PC_BG_MOVE_Y_MAP
} from '../constants.js';
import { MAKE_SCREEN_ACTIVE, MOVE_CHAR, REGISTER_KEY_DOWN, REGISTER_KEY_UP } from '../actions/game.js';

const findNewPosX = (left, right, posX) => {
	var newPosX;

	if (left && !right) {
		newPosX = posX + MOVEMENT_RATE;
	} else if (right && !left) {
		newPosX = posX - MOVEMENT_RATE;
	} else {
		newPosX = posX;
	}

	if (newPosX < -((GAME_SCREEN_WIDTH/2) - (PLAYER_CHAR_WIDTH * 1.5)))  {
		newPosX = -((GAME_SCREEN_WIDTH/2) - (PLAYER_CHAR_WIDTH * 1.5));
	} else if (newPosX > ((GAME_SCREEN_WIDTH/2) + (PLAYER_CHAR_WIDTH/2))) {
		newPosX = ((GAME_SCREEN_WIDTH/2) + (PLAYER_CHAR_WIDTH/2));
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

const initialState = {
	screenActive: false,
	player: {
		posX: PLAYER_CHAR_WIDTH,
		posY: PLAYER_CHAR_HEIGHT,
		bgMoveX: 0,
		bgMoveY: 3,
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
			var newBgMoveX;
			if (action.left || action.right || action.up || action.down) {
				newBgMoveX = state.player.bgMoveX + 1;
			} else {
				newBgMoveX = state.player.bgMoveX;
			}

			if (newBgMoveX > MAX_PC_BG_MOVE_X) {
				newBgMoveX = 0;
			}

			return {
				...state,
				player: {
					...state.player,
					posX: findNewPosX(action.left, action.right, state.player.posX),
					posY: findNewPosY(action.up, action.down, state.player.posY),
					bgMoveX: newBgMoveX
				}
			}
		default:
			return state;
	}
}

export default gameData;