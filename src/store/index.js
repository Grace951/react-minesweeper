import { createStore } from 'redux';
import bomb from '../reducers/index';


function getArroundBombs(vArray, around, x, y){
	for (let i=-1; i<=1; i++){
		for (let j=-1; j<=1; j++){
			if(i===j && i===0 && j===0)
				continue;
			if (  (x + i)>=0 && ( y + j) >=0  
				&& (x + i) < around.length 
				&& (around[0] && ( y + j) < around[0].length) 
				&& vArray[x+i][y+j])  {				
				around[x][y]++;
			}
		}
	}
}

function getInitData (size){
	let initialState = {
			vArray : [],
			stepped : [],
			around: [],
			marked: [],
			deathStep: {x: -1, y:-1},
			win: 0,
			bombs: 0,
			gameSize: size
		};

	let maxNum = 5;
	let minNum = 0;


	for (let x=0; x < size; x++){
		let innerArray = [];
		let steppedArray= [];
		let aroundArray= [];
		let markedArray= [];
		for (let y=0; y < size; y++){
			let b = (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum )?0:1;
			initialState.bombs += b;
			innerArray.push(b);
			steppedArray.push(0);
			aroundArray.push(0);
			markedArray.push(0);
		}
		initialState.vArray.push(innerArray);
		initialState.stepped.push(steppedArray);
		initialState.around.push(aroundArray);
		initialState.marked.push(markedArray);
	}

	for (let x=0; x < size; x++){
		for (let y=0; y < size; y++){
			getArroundBombs(initialState.vArray, initialState.around, x,y);
		}
	}

	return initialState;
}

let store = createStore(bomb, getInitData(10));

export {store , getInitData};
