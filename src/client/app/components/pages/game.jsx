import React, { Component } from 'react';
import GameScreen from '../../containers/game/game_screen.jsx';

export default class Game extends Component {
	render() {
		return(
			<div>
				<h1>Game Screen</h1>
				<p>Lorem ipsum dolor</p>
				<GameScreen />
			</div>
		)
	}
}