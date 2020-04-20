import React, { useState } from 'react';
import api from '../api';


function PlayGame(props) {

  return (
    <div>
      <div className="playGame">
        <div>
          <label for="name">Put Your Game Name On:</label>
          <input name='name'
                 placeholder="Your Name" 
                 value={props.player.name}
                 onChange={props.handlePlayerChange}>
          </input>
          <button onClick={() => props.submitPlayerChange}>Let's Play!</button>
        </div>
      </div>
    </div>
  );
};

export default PlayGame;
