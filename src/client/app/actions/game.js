import { GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT } from '../constants/game.js';

export const MAKE_SCREEN_ACTIVE = 'MAKE_SCREEN_ACTIVE';
export const MOVE_CHAR = 'MOVE_CHAR';
export const REGISTER_KEY_DOWN = 'REGISTER_KEY_DOWN';
export const REGISTER_KEY_UP = 'REGISTER_KEY_UP';
export const CREATE_OBSTACLE = 'CREATE_OBSTACLE';
export const SET_NEW_ENEMY_POS = 'SET_NEW_ENEMY_POS';
export const CHANGE_ENEMY_DIR = 'CHANGE_ENEMY_DIR';

const determineDir = (code) => {
	if (code === 37) {
		return 'left';
	} else if (code === 38) {
		return 'up';
	} else if (code === 39) {
		return 'right';
	} else if (code === 40) {
		return 'down';
	}
}

export function createObstacle(key) {
	let width = Math.ceil(Math.random() * 100) + 20;
	let height = Math.ceil(Math.random() * 100) + 20;
	let top = Math.ceil(Math.random() * (GAME_SCREEN_HEIGHT - height));
	let left = Math.ceil(Math.random() * (GAME_SCREEN_WIDTH - width));
	return { type: CREATE_OBSTACLE, width, height, top, left, key };
}

export function makeScreenActive() {
	return { type: MAKE_SCREEN_ACTIVE };
}

export function moveChar(up, down, left, right) {
	return { type: MOVE_CHAR, up, down, left, right };
}

export function registerKeyDown(e) {
	let code = e.keyCode;
	let dir = determineDir(code);
	return { type: REGISTER_KEY_DOWN, dir };
}

export function registerKeyUp(e) {
	let code = e.keyCode;
	let dir = determineDir(code);
	return { type: REGISTER_KEY_UP, dir };
}

export function setNewEnemyPos(id, posX, posY) {
	return { type: SET_NEW_ENEMY_POS, id, posX, posY };
}

export function changeEnemyDir(id, dir) {
	return { type: CHANGE_ENEMY_DIR, id, dir };
}