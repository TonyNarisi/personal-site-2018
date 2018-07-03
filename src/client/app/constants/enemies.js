export const POTENTIAL_DIRS = ['up', 'down', 'left', 'right'];
export const ARCHER_ENEMY = {
	MOVE_RATE: 2,
	HEIGHT: 54,
	WIDTH: 34,
	X_OFFSET: 15,
	Y_OFFSET: 8,
	SPRITE_HEIGHT: 64,
	SPRITE_WIDTH: 64,
	MAX_BG_MOVE_X: 8,
	INNER_HITBOX_HOR: {
		'horizontal': 8,
		'vertical': 0
	},
	COLL_Y_OFFSET: 30,
	COLL_HEIGHT: 24,
	STARTING_HEALTH: 2,
	DIR_LOOP_MAX: 90,
	BG_MOVE_Y_MAP: {
		'down': 0,
		'left': 1,
		'up': 2,
		'right': 3
	},
	type: 'archer'
}