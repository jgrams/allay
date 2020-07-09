import React, { useState, useEffect } from 'react';
import Turn from './Turn';
import Name from './Name';

function PlayGame(props) {
  const [round, setRound] = useState(props.game.round);

  useEffect(() => {
    setRound(props.game.round)
  }, [props.game.round]);

  if (round === 0) {
      return <Name player={props.player}
          game={props.game}
          setPlayers={props.setPlayers}
          modifyPlayer={props.modifyPlayer}/>
  } else {
      return <Turn player={props.player}
          game={props.game}
          submitTurn={props.submitTurn}
          target="answer"
          label="What's your answer:"
          buttonText="Submit"/>
  }
};

export default PlayGame;
