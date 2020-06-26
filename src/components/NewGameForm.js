import React, { useState } from 'react';
import api from '../api';

function NewGameForm(props){
  const [numberPlayers, setNumberPlayers] = useState(3);
  const [timeLimit, setTimeLimit] = useState('90');

  const createGame = () => {
    api
      .create({numberPlayers: numberPlayers, timeLimit: timeLimit})
      .then(result => {
        props.createGame(result)
        props.setAddGame(false)
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
     <div>
        <div className="editfields">
          <div>
            <label>Number Of Players: </label>
            <input
                type="number"
                min="2"
                max="20"
                name="numberPlayers"
                placeholder="Number of Players"
                value={numberPlayers}
                onChange={(e) => setNumberPlayers(e.target.value)}
              />
          </div>
          <div>
            <label>Time Limit: </label>
            <select name="timeLimit" 
                    value={timeLimit} 
                    onChange={ (e) => setTimeLimit(e.target.value) }>
              <option value="30">Lightning Rounds</option>
              <option value="90">Standard Game</option>
              <option value="180">Long Turns</option>
              <option value="8000000">Practically Forever</option>
            </select>
          </div>
        </div>
        <button onClick={() => props.setAddGame(false)}>Cancel</button>
        <button onClick={createGame}>Save</button>
      </div>
  );
};

export default NewGameForm;
