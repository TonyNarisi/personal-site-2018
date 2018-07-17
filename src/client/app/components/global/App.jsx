import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/home';
import Game from '../pages/game';
import Navigation from './Navigation';
import Footer from './Footer';

class App extends Component {
	render() {
		return (
			<div>
				<div className="header-wrapper">
					<Navigation />
				</div>
				<div className="body-wrapper">
					<Route path="/" component={ Home } />
					<Route path="/game" component={ Game } />
				</div>
				<div className="footer-wrapper">
					<Footer />
				</div>
			</div>
		)
	}
}

export default App;