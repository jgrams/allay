import React from 'react';
import ShareGame from './ShareGame';

const Admin = props => {
  if (!props.game) {
      return <button onClick={props.newGame}>Create A New Game</button>;
  } else if (props.addGame) {
    return (
      <div>
        <div className="editfields">
          <div>
            <label>Number Of Players: </label>
            <input
                type="number"
                min="2"
                max="100"
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
        <button onClick={props.cancelNewGame}>Cancel</button>
        <button onClick={props.createGame}>Save</button>
      </div>
    );
  } else if (!props.game.admin) {
    return <div />;
  } else {
    return <ShareGame
            game={props.game}
            shareGame={props.shareGame}
            onCancel={props.handleShareCancel}
            onClick={props.handleShare}
          />;
  }
};

export default Admin;
