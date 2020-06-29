import React, { useState } from 'react';
import api from '../api';

function Name(props) {
  const [name, setName] = useState(props.player.name);

  const submitPlayerName = () => {
    let modifiedPlayer = props.player
    modifiedPlayer.name = name;
    modifiedPlayer.ready = true;
    api
      .name({_id: props.game._id, player: modifiedPlayer})
      .then(result => {
        props.modifyPlayers(result.players)
        props.modifyPlayer(modifiedPlayer);
      })
      .catch(err => {
        console.log(err);
      });
    const changeStream = api.ready(props.game._id)
    changeStream.onmessage = e => console.log(JSON.parse(e.data));
    changeStream.onerror = function(err) {
      console.error("EventSource failed:", err);
    };
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
    </div>
  );
};

export default Name;
