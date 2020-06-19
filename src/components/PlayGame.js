import React from 'react';
import api from '../api';
import Turn from './Turn';
import Name from './Name';


function PlayGame(props) {
  var displayForm = props.game.round === 0 ? <Name player={props.player} game={props.game} /> : 
                                             <Turn player={props.player} game={props.game} />

  return (
    <div>
      <div className="playGame">
        { displayForm }
      </div>
    </div>
  );
};

export default PlayGame;
