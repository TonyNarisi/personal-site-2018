import { MOVEMENT_RATE } from '../constants.js';
import { MAKE_SCREEN_ACTIVE, MOVE_CHAR, REGISTER_KEY_DOWN, REGISTER_KEY_UP } from '../actions/game.js';

const initialState = {
	screenActive: false,
	player: {
		posX: 0,
		posY: 0,
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
					[`${action.dir}Movement`]: true
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
			var newPosY, newPosX;
			let posY = state.player.posY;
			let posX = state.player.posX;

			if (action.up && !action.down) {
				newPosY = posY + MOVEMENT_RATE;
			} else if (action.down && !action.up) {
				newPosY = posY - MOVEMENT_RATE;
			} else {
				newPosY = posY;
			}

			if (action.left && !action.right) {
				newPosX = posX + MOVEMENT_RATE;
			} else if (action.right && !action.left) {
				newPosX = posX - MOVEMENT_RATE;
			} else {
				newPosX = posX;
			}

			return {
				...state,
				player: {
					...state.player,
					posX: newPosX,
					posY: newPosY
				}
			}
		default:
			return state;
	}
}

export default gameData;