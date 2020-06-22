import React, { useState } from 'react';
import api from '../api';
import Turn from './Turn';
import Name from './Name';
import ReadyPlayers from './ReadyPlayers';


function PlayGame(props) {
  var displayForm = props.game.round === 0 ? <Name player={props.player} game={props.game} setGame={props.setGame} handlePlayerChange={props.handlePlayerChange}/> : 
                                             <Turn player={props.player} game={props.game} submitTurn={props.submitTurn}/>

  return (
    <div>
      <div className="playGame">
        { displayForm }
      </div>
      <ReadyPlayers players={props.game.players} />
    </div>
  );
};

export default PlayGame;
