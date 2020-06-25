import React from 'react';

function ReadyPlayers(props) {
	let ready = props.players.map(function(player, index) {
	  if (player.ready) {
	    return <div key={index}>{player.name} is ready.</div>
	  }
	});

  return (
    <div className="readyPlayers">
      { ready }
    </div>
  );
};

export default ReadyPlayers;
