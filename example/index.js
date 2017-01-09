require('./index.sass');


import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Bomb from '../src/components/Bomb';
import {store} from '../src/store/index';

render(<Provider store={store}>
			<Bomb />
		</Provider>, document.getElementById("app"));


if(module.hot){
	module.hot.accept();
}
