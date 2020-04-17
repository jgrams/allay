import React from 'react';

const EditGame = props => {
  if (props.createGame) {
    return (
      <div>
        <div className="editfields">
          <div>
            <label>Number Of Players: </label>
            <input
                type="number"
                min="2"
                name="numberPlayers"
                placeholder="Number of Players"
                value={props.game.numberPlayers}
                onChange={props.onChange}
              />
          </div>
          <div>
            <label>Time Limit: </label>
            <select name="timeLimit" 
                    value={props.game.timeLimit} 
                    onChange={props.onChange}>
              <option value="30">Lightning Rounds</option>
              <option value="90">Standard Game</option>
              <option value="180">Long Turns</option>
              <option value="8000000">Practically Forever</option>
            </select>
          </div>
        </div>
        <button onClick={props.onCancel}>Cancel</button>
        <button onClick={props.onSave}>Save</button>
      </div>
    );
  } else {
    return <div />;
  }
};

export default EditGame;
