import React, { useState, useEffect } from 'react';

function ReadyPlayer({player}) {
	const [ready, setReady] = useState(player.ready);

	useEffect(() => {
	  setReady(player.ready)
	}, [ready]);
  
  if (ready) {
  	return (
      <div className="readyPlayer">
        {player.name} is ready.
      </div>
  	)
	} else return null
};

export default ReadyPlayer;
