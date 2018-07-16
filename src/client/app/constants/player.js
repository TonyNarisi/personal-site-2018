export const PLAYER_CHAR_WIDTH = 32;
export const PLAYER_CHAR_HEIGHT = 48;
export const PLAYER_CHAR_INNER_HITBOX_VERT = 48;
export const PLAYER_CHAR_INNER_HITBOX_HOR = {
	'horizontal': 8,
	'vertical': 0
}
export const PLAYER_CHAR_X_OFFSET = 15;
export const PLAYER_CHAR_Y_OFFSET = 15;
export const PLAYER_CHAR_SPRITE_HEIGHT = 64;
export const PLAYER_CHAR_COLL_HEIGHT = 16;
export const PLAYER_CHAR_COLL_Y_OFFSET = 32;
export const PLAYER_CHAR_SPRITE_WIDTH = 64;
export const PC_ATTACK_LOOP_SWITCH = 8;
export const PC_MAX_ATTACK_LOOP = 20;
export const PC_RETURN_ATTACK = 8;
export const MAX_PC_BG_MOVE_X = 8;
export const PC_BG_MOVE_Y_MAP = {
	'up': 0,
	'down': 2,
	'left': 3,
	'right': 1
}
export const REV_PC_Y_MAP = ['up', 'right', 'down', 'left'];
export const REV_PC_Y_MAP_COLL = ['down', 'left', 'up', 'right'];
export const MOVEMENT_RATE = 3;
export const ARROW_KEYCODES = [37,38,39,40];
export const END_ATTACK_TOP = {
	'up': -18,
	'down': 26,
	'left': 20,
	'right': 20 
}
export const END_WINDUP_TOP = {
	'up': 7,
	'down': -7,
	'left': -7,
	'right': -7
}
export const END_ATTACK_LEFT = {
	'up': -26,
	'down': 29,
	'left': 0,
	'right': 0

};
export const END_WINDUP_LEFT = {
	'up': 4,
	'down': -4,
	'left': 6,
	'right': -6
};
export const END_ATTACK_ROTATE_Z = {
	'up': 90,
	'down': -180,
	'left': -90,
	'right': -90
};
export const END_WINDUP_ROTATE_Z = {
	'up': -45,
	'down': 45,
	'left': 45,
	'right': 45
};