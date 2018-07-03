import React, { Component } from 'react';
import { TYPES } from '../../constants/obstacles.js';

class Obstacle extends Component {
	render() {
		let props = this.props;
		let thisType = TYPES.filter(obs => {
			return obs.type === props.type;
		})[0];
		return(
			<div
				className="game__obstacle"
				style={{
					height: `${ props.spriteHeight }px`,
					width: `${ props.spriteWidth }px`,
					left: `${ props.left }px`,
					top: `${ props.top }px`,
					zIndex: props.top + props.spriteHeight,
					opacity: 0.8,
					backgroundImage: `url(${ thisType.bgImage })`,
					backgroundPositionX: `${ thisType.bgPosX }px`,
					backgroundPositionY: `${ thisType.bgPosY }px`
				}}>
			</div>
		)
	}
}

export default Obstacle;