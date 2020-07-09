import React from 'react';

function ReadyPlayers(props) {
	return props.ready ? <li>{props.name} is ready.</li> : null
}

export default ReadyPlayers;
