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
    api.ready(props.game._id, props.player.slug)
       .then(result => {
        console.log(result);
       })
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
