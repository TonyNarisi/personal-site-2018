import React, { Component } from 'react';
import BG_IMAGE from '../../../public/assets/game/bgs_and_obstacles/PathAndObjects.png';
import { BG_TILE_HEIGHT, BG_TILE_WIDTH } from '../../constants/game.js';

class BgTile extends Component {
	render() {
		let props = this.props;
		return(
			<div
				className="game__bg--tile"
				style={{
					height: `${ BG_TILE_HEIGHT }px`,
					width: `${ BG_TILE_WIDTH }px`,
					left: `${ props.colNum * BG_TILE_WIDTH }px`,
					top: `${ props.rowNum * BG_TILE_HEIGHT }px`,
					backgroundImage: `url(${ BG_IMAGE })`
				}}>
			</div>
		)
	}
}

export default BgTile;