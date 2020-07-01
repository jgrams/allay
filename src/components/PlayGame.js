import React from 'react';
import Turn from './Turn';
import Name from './Name';

function PlayGame(props) {
    return props.game.round === 0 ? <Name player={props.player} 
                                          game={props.game} 
                                          setPlayers={props.setPlayers} 
                                          modifyPlayer={props.modifyPlayer}/> : 
                                    <Turn player={props.player} 
                                          game={props.game} 
                                          submitTurn={props.submitTurn}/>  
};

export default PlayGame;
