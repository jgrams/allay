import React from 'react';

const PlayGame = props => {
  if (props.currentGame) {
    return (
      <div>
        <div className="playGame">
          <div>
            <label for="name">Put Your Game Name On</label>
            <input name='name' 
                   placeholder="Your Name" 
                   value={props.name}
                   onChange={props.onChange}>
            </input>
            <button onClick={props.onClick}>I'm Ready</button>
          </div>
          <div>Game On</div>
        </div>
      </div>
    );
  }
  else {
    return <div />;
  }
};

export default PlayGame;
