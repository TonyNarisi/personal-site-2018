import './styles/main.scss';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appState from './reducers/index.js';
import App from './components/global/App';

export const store = createStore(
	appState
);

if (process.env.NODE_ENV != 'production') {
	window.reduxStore = store;
}

render(
	<Provider store={ store }>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('react-target')
);