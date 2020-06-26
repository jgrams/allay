import React from 'react';
import Turn from './Turn';
import Name from './Name';
import ReadyPlayers from './ReadyPlayers';

function PlayGame(props) {
  let display 

  if (props.player.ready) {
    return <ReadyPlayers players={props.game.players} />
  } else {
    return props.game.round === 0 ? <Name player={props.player} 
                                             game={props.game} 
                                             modifyPlayers={props.modifyPlayers} 
                                             modifyPlayer={props.modifyPlayer}/> : 
                                       <Turn player={props.player} 
                                             game={props.game} 
                                             submitTurn={props.submitTurn}/>  
  }
};

export default PlayGame;
