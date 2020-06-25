import React from 'react';
import Turn from './Turn';
import Name from './Name';
import ReadyPlayers from './ReadyPlayers';


function PlayGame(props) {
  let displayForm
  let readyPlayers 

  if (props.currentGame && props.game) {
    displayForm = props.game.round === 0 ? <Name player={props.player} game={props.game} setGame={props.setGame} handlePlayerChange={props.handlePlayerChange}/> : 
                                           <Turn player={props.player} game={props.game} submitTurn={props.submitTurn}/> 
    readyPlayers = <ReadyPlayers players={props.game.players} />
  }

  return (
    <div>
      <div className="playGame">
        { displayForm }
      </div>
      { readyPlayers }
    </div>
  );
};

export default PlayGame;
