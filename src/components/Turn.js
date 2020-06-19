import React from 'react';
import api from '../api';

function SubmitName(props) {

  return (
    <div>
      <label for="name">The Question:</label>
      <input name='name'
             placeholder="Your Name" 
             value={props.player.name}
             onChange={props.handlePlayerChange}>
      </input>
      <button onClick={() => props.submitPlayerName}>Let's Play!</button>
    </div>
  );
};

export default SubmitName;
