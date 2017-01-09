function playerLeftClick(x,y) {
  return {
    type: "PLAYER_LEFT_CLICK",
    info: {x,y}
  };
}

function playerRightClick(x,y) {

  return {
    type: "PLAYER_RIGHT_CLICK",
    info: {x,y}
  };
}

function setWin(win) {
  return {
    type: "SET_WIN",
    winner: win
  };
}

function playAgain(size) {
  return {
    type: "PLAY_AGAIN",
	size: size
  };
}


export {playerLeftClick, playerRightClick, setWin, playAgain };
