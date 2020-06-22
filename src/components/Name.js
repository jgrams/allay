import React, { useState } from 'react';
import api from '../api';

function Name(props) {
  function submitPlayerName() {
    api
      .name({_id: props.game._id, player: props.player})
      .then(result => {
        props.setGame(result);
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
             value={props.player.name}
             onChange={props.handlePlayerChange}>
      </input>
      <button onClick={submitPlayerName}>Let's Play!</button>
    </div>
  );
};

export default Name;
