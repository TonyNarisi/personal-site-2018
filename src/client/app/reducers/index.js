import { combineReducers } from 'redux';
import gameData from './game.js';

const appState = combineReducers({
	gameData
});

export default appState;