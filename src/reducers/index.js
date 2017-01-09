import { combineReducers } from 'redux';
import cloneDeep from 'lodash.clonedeep';
import {getInitData} from '../store/index';
import isEqual from 'lodash.isequal';

function BFS (stepped, vArray, around, x,y){
	if  (x < 0 || y <0 || x >= vArray.length || (vArray[0] && y >= vArray[0].length) || stepped[x][y] ||  vArray[x][y] )
		return;

	if (around[x][y] ){
		stepped[x][y] = 1;
		return;
	}

	stepped[x][y] = 1;
	BFS(stepped, vArray, around, x-1, y );
	BFS(stepped, vArray, around, x+1, y);
	BFS(stepped, vArray, around, x  , y - 1);
	BFS(stepped, vArray, around, x  , y + 1);
}


function bomb(state=[], action) {	
	let newState = cloneDeep(state);
	let x=0 ,y = 0;
	switch (action.type) {
		case "PLAYER_LEFT_CLICK":
			x = action.info.x;
			y = action.info.y;
			if (newState.vArray[x][y]===1){
				newState.deathStep.x = x;
				newState.deathStep.y = y;
				newState.stepped[x][y] = 1;
				newState.win = -1;
				return newState;
			}
			
			BFS(newState.stepped, newState.vArray, newState.around, x, y);
			newState.win = isEqual(newState.vArray, newState.marked)? 1 : 0;
			return newState;
		case "PLAYER_RIGHT_CLICK":
			newState.marked[action.info.x][action.info.y] = newState.marked[action.info.x][action.info.y]?0:1;
			newState.win = isEqual(newState.vArray, newState.marked)? 1 : 0;			
			return newState;
		case "SET_WIN":
			newState.win = action.win;
			return newState;
		case "PLAY_AGAIN":
			newState.gameSize = action.size;
			return cloneDeep(getInitData(action.size));
		default:
			return state;
	}
}

export default bomb;
