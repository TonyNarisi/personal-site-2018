import { 
	REV_PC_Y_MAP,
	PLAYER_CHAR_INNER_HITBOX_HOR,
	PLAYER_CHAR_WIDTH,
	PC_MAX_ATTACK_LOOP,
	PC_ATTACK_LOOP_SWITCH,
	PC_RETURN_ATTACK,
	END_ATTACK_TOP,
	END_WINDUP_TOP,
	END_ATTACK_LEFT,
	END_WINDUP_LEFT,
	END_ATTACK_ROTATE_Z,
	END_WINDUP_ROTATE_Z
} from '../constants/player.js';
import { AXE } from '../constants/weapons.js';

export const findPlayerDir = (bgMoveY) => {
	return REV_PC_Y_MAP[bgMoveY];
}

export const findTopAxe = (dir, isReturning, isWindingUp, attackLoop, returnAttackLoop) => {
	if (isReturning) {
		return Math.round(END_ATTACK_TOP[dir] + ((-1 * END_ATTACK_TOP[dir]) * returnAttackLoop/PC_RETURN_ATTACK));
	} else if (isWindingUp) {
		return Math.round(END_WINDUP_TOP[dir] * attackLoop/PC_ATTACK_LOOP_SWITCH);
	} else {
		return Math.round(END_WINDUP_TOP[dir] + ((END_ATTACK_TOP[dir] - END_WINDUP_TOP[dir]) * (attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH)));
	}
}

export const findLeftAxe = (dir, isReturning, isWindingUp, attackLoop, returnAttackLoop) => {
	var baseMeasure;
	if (dir === 'up') {
		baseMeasure = (AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.RIGHT_SPACE));
	} else if (dir === 'down') {
		baseMeasure = -(AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.LEFT_SPACE));
	} else if (dir === 'left') {
		baseMeasure = -(AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.LEFT_SPACE) - (PLAYER_CHAR_INNER_HITBOX_HOR.horizontal/2));
	} else {
		baseMeasure = (AXE.WIDTH - (AXE.RIGHT_SPACE + AXE.RIGHT_SPACE) - PLAYER_CHAR_WIDTH + PLAYER_CHAR_INNER_HITBOX_HOR.horizontal) + 10;
	}

	if (isReturning) {
		return (baseMeasure + END_ATTACK_LEFT[dir]) - ((returnAttackLoop/PC_RETURN_ATTACK) * END_ATTACK_LEFT[dir]);
	} else if (isWindingUp) {
		return baseMeasure + (END_WINDUP_LEFT[dir] * attackLoop/PC_ATTACK_LOOP_SWITCH);
	} else {
		return baseMeasure + (END_ATTACK_LEFT[dir] * (attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH));
	}
}

export const findZRotateAxe = (dir, isReturning, isWindingUp, attackLoop, returnAttackLoop) => {
	if (isReturning) {
		return `rotateZ(${ Math.round(END_ATTACK_ROTATE_Z[dir] + (-END_ATTACK_ROTATE_Z[dir] * (returnAttackLoop/PC_RETURN_ATTACK))) }deg)`;
	} else if (isWindingUp) {
		return `rotateZ(${ Math.round(END_WINDUP_ROTATE_Z[dir] * (attackLoop/PC_ATTACK_LOOP_SWITCH)) }deg)`;
	} else {
		return `rotateZ(${ Math.round(((END_ATTACK_ROTATE_Z[dir] - END_WINDUP_ROTATE_Z[dir]) * ((attackLoop - PC_ATTACK_LOOP_SWITCH)/(PC_MAX_ATTACK_LOOP - PC_ATTACK_LOOP_SWITCH))) + END_WINDUP_ROTATE_Z[dir]) }deg)`;
	}
}

export const findYRotateAxe = (dir) => {
		switch (dir) {
			case 'right':
			case 'up':
				return 'rotateY(180deg)';
			default:
				return 'rotateY(0)';
		}
	}