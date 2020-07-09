import React from 'react';
import ReadyPlayer from './ReadyPlayer';

function ReadyPlayers(props) {
  const listItems = props.players.map((player) =>
			<ReadyPlayer ready={player.ready} name={player.name} />
	);

	return ( <ul>{listItems}</ul>  );
}

export default ReadyPlayers;
