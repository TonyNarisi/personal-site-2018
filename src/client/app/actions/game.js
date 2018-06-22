export const MAKE_SCREEN_ACTIVE = 'MAKE_SCREEN_ACTIVE';
export const MOVE_CHAR = 'MOVE_CHAR';
export const REGISTER_KEY_DOWN = 'REGISTER_KEY_DOWN';
export const REGISTER_KEY_UP = 'REGISTER_KEY_UP';

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