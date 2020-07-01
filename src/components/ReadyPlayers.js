import React from 'react';
import ReadyPlayer from './ReadyPlayer';

function ReadyPlayers(props) {
	const ready = props.players.map(function(player, index) {
	    return <ReadyPlayer key={player._id} player={player} /> 
	});

  return (
    <div className="readyPlayers">
      { ready }
    </div>
  );
};

export default ReadyPlayers;
