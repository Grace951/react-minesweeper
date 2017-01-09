import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/playerActions';
import {stateSymbol} from '../Data/Share';
import './Block.sass';

class Block extends React.Component{
	constructor(props) {
		super(props);
		this.playerLeftClick = this.playerLeftClick.bind(this);
		this.playerRightClick = this.playerRightClick.bind(this);
	}
	playerLeftClick(){
		if (this.props.win || this.props.stepped)
			return;

		let {x,y} = this.props;
		
		this.props.actions.playerLeftClick(x,y);		
	}
	playerRightClick(e){
		e.preventDefault();
		if (this.props.win || this.props.stepped)
			return;

		let {x,y} = this.props;
		this.props.actions.playerRightClick(x,y);		
	}	
	render(){
		let BlockClass= "block ";
		if(this.props.stepped){
			BlockClass += " stepped";
			if(this.props.symbol===2){
				BlockClass += " bomb";
			}
		}
		let symbol = this.props.symbol < stateSymbol.length ? stateSymbol[this.props.symbol]: this.props.symbol-stateSymbol.length?this.props.symbol-stateSymbol.length:"";
		return (<div className={BlockClass} onClick={this.playerLeftClick} onContextMenu={this.playerRightClick} >{symbol}</div>);
	}
}
Block.propTypes = {
	symbol: React.PropTypes.number.isRequired,
	// 	0: 
	// 	1: '⛳', 
	// 	2: '☢', 
	stepped: React.PropTypes.number.isRequired,
	x: React.PropTypes.number.isRequired,
	y: React.PropTypes.number.isRequired,
	win: React.PropTypes.number.isRequired,
	actions: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
	x:ownProps.x,
	y:ownProps.y,
	win: state.win
  };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect( mapStateToProps, mapDispatchToProps)(Block);


