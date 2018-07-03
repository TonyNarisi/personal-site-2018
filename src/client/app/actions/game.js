import { GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT } from '../constants/game.js';
import { TYPES } from '../constants/obstacles.js';

export const MAKE_SCREEN_ACTIVE = 'MAKE_SCREEN_ACTIVE';
export const REGISTER_KEY_DOWN = 'REGISTER_KEY_DOWN';
export const REGISTER_KEY_UP = 'REGISTER_KEY_UP';
export const PLAYER_ATTACK = 'PLAYER_ATTACK';
export const CREATE_OBSTACLE = 'CREATE_OBSTACLE';
export const SET_NEW_ENEMY_POS = 'SET_NEW_ENEMY_POS';
export const CHANGE_ENEMY_DIR = 'CHANGE_ENEMY_DIR';
export const REFRESH_SCREEN = 'REFRESH_SCREEN';

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
	let thisObs = TYPES[Math.floor(Math.random() * TYPES.length)];
	let top = Math.ceil(Math.random() * (GAME_SCREEN_HEIGHT - thisObs.spriteHeight));
	let left = Math.ceil(Math.random() * (GAME_SCREEN_WIDTH - thisObs.spriteWidth));
	return {
		type: CREATE_OBSTACLE,
		spriteWidth: thisObs.spriteWidth,
		spriteHeight: thisObs.spriteHeight,
		hitBoxYOffset: thisObs.hitBoxYOffset,
		width: thisObs.width,
		height: thisObs.height,
		spriteType: thisObs.type,
		top,
		left,
		key
	};
}

export function makeScreenActive() {
	return { type: MAKE_SCREEN_ACTIVE };
}

export function refreshScreen(up, down, left, right) {
	return { type: REFRESH_SCREEN, up, down, left, right };
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

export function playerAttack() {
	return { type: PLAYER_ATTACK };
}

export function setNewEnemyPos(id, posX, posY) {
	return { type: SET_NEW_ENEMY_POS, id, posX, posY };
}

export function changeEnemyDir(id, dir) {
	return { type: CHANGE_ENEMY_DIR, id, dir };
}