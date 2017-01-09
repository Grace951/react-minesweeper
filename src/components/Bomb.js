import React from 'react';
import Block from './Block';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/playerActions';
import {stateSymbol} from '../Data/Share';
import './Bomb.sass';

class Bomb extends React.Component{
	constructor(props) {
		super(props);
		this.getSymbol = this.getSymbol.bind(this);		
		this.playAgain = this.playAgain.bind(this);		
		this.changeSize = this.changeSize.bind(this);		
	}
	componentDidMount () {	
	}
	componentWillUnmount () {
	}
	getSymbol(x,y){
		// 	0: ' '
		// 	1: '⛳', 
		// 	2: '☢', 

		if ( this.props.deathStep.x==x && this.props.deathStep.y==y  )
			return 2;
		if (this.props.win === -1 && this.props.vArray[x][y] ){
			return 2;
		}
		if (this.props.marked[x][y]){
			return 1;
		}
		if (this.props.stepped[x][y] )
			return  this.props.around[x][y] + stateSymbol.length;

		return 0;
	}
	changeSize(event){
         this.props.actions.playAgain(event.target.value);
    }
	playAgain(){
		this.props.actions.playAgain(this.sizeSelect.value);
	}
	render(){
		let winStatement = "";
		if(this.props.win===-1)
			winStatement = "Game Over";
		else if(this.props.win===1)
			winStatement = "You win!!!";
		let {stepped} = this.props;
		return (
			<div className="Bomb" style={{width: this.props.gameSize * 80 + "px"}}>
				<h1>Minesweeper</h1>	
				<hr/>
				<p>Right click of mouse to mark as mines, left click of mouse to sweep</p>
				<div className="WinStatus">{winStatement } </div>
				<ul className="player">
					<li>Totals Bombs: {this.props.bombs}</li>
					<li> 
						<div className="gamePlayAgain">
							<input type="button" className="" value="Play Again" onClick={this.playAgain}/>
						</div>
					</li>
					<li>
						<div className="gameSize">
							Size: <select className="size" onChange={this.changeSize} ref={(elm) => { this.sizeSelect = elm; }}
											value={this.props.gameSize} >
								<option value="5">5 x 5</option>
								<option value="10">10 x 10</option>
								<option value="20">20 x 20</option>
							</select>
						</div>
					</li>
				</ul>
				<table className="table" >
					<tbody>						
					{
						stepped.map( (item, id) => {
							return (
								<tr key={id}> 
								{ 
									item.map((itemsub, idsub) => (<td key={idsub} ><Block x={id} y={idsub} stepped={itemsub} symbol={this.getSymbol(id,idsub)} /> </td> ))
								}
								</tr>
							);
						})
					}
					</tbody>
				</table>		
			</div>
		);
	}
}
Bomb.propTypes = {
	win: React.PropTypes.number.isRequired,
	actions: React.PropTypes.object.isRequired, 
	deathStep: React.PropTypes.object.isRequired, 
	stepped:  React.PropTypes.array.isRequired,
	vArray:  React.PropTypes.array.isRequired,
	around:  React.PropTypes.array.isRequired,
	marked:  React.PropTypes.array.isRequired,
	bombs:   React.PropTypes.number.isRequired,
	gameSize:   React.PropTypes.number.isRequired,
};

Bomb.defaultProps = {
};


const mapStateToProps = (state) => {

  return {
    vArray: state.vArray,
	stepped: state.stepped,
	around: state.around,
	marked: state.marked,
	win: state.win,
	deathStep: state.deathStep,
	bombs: state.bombs,
	gameSize: state.gameSize,
  };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Bomb);

