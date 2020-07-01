import React, { useState, useEffect } from 'react';
import api from '../api';
import ReadyPlayers from './ReadyPlayers';

function Name(props) {
  const [name, setName] = useState(props.player.name);

  useEffect(() =>  {
    let readySource = api.ready(props.game._id)
    readySource.onmessage = e => props.setPlayers(JSON.parse(e.data))
    readySource.onerror = e => console.log(e)
  }, []);

  const submitPlayerName = () => {
    let modifiedPlayer = props.player
    modifiedPlayer.name = name
    modifiedPlayer.ready = true
    api
      .name({_id: props.game._id, player: modifiedPlayer})
      .then(result => props.modifyPlayer(modifiedPlayer))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <label htmlFor="name">Put Your Game Name On:</label>
      <input name='name'
             placeholder="Your Name" 
             value={name}
             onChange={(e) => setName(e.target.value)}>
      </input>
      <button onClick={submitPlayerName}>Let's Play!</button>
      <ReadyPlayers players={props.game.players} />
    </div>
  );
};

export default Name;
