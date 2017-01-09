require('./index.sass');

import React from 'react';
import { render }  from 'react-dom';
import Bomb from 'react-minesweeper';


render(<Bomb /> , document.getElementById("app"));


if(module.hot){
	module.hot.accept();
}
