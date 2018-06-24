import React, { Component } from 'react';

class Obstacle extends Component {
	render() {
		let props = this.props;
		return(
			<div
				className="game__obstacle"
				style={{
					height: `${ props.height }px`,
					width: `${ props.width }px`,
					left: `${ props.left }px`,
					top: `${ props.top }px`,
					// temporary
					backgroundColor: '#ddd'
				}}>
			</div>
		)
	}
}

export default Obstacle;