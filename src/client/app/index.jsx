import './styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appState from './reducers/index.js';
import Home from './components/pages/home.jsx';
import Game from './components/pages/game.jsx';

export const store = createStore(
	appState
);

if (process.env.NODE_ENV != 'production') {
	window.reduxStore = store;
}

render(
	<Provider store={ store }>
		<BrowserRouter>
			<div>
				<Route path="/" component={ Home } />
				<Route path="/game" component={ Game } />
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('react-target')
);