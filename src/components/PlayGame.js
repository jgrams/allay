import React from 'react';

const PlayGame = props => {
  if (props.currentGame) {
    return (
      <div>
        <div className="playGame">
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
