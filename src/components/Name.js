import React, { useState } from 'react';
import api from '../api';

function Name(props) {
  const [name, setName] = useState(props.player.name);

  function submitPlayerName() {
    let player = props.player;
    player.name = name;
    console.log(player);
    api
      .name({_id: props.game._id, player: player})
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <label for="name">Put Your Game Name On:</label>
      <input name='name'
             placeholder="Your Name" 
             value={name}
             onChange={(e) => setName(e.currentTarget.value)}>
      </input>
      <button onClick={submitPlayerName}>Let's Play!</button>
    </div>
  );
};

export default Name;
