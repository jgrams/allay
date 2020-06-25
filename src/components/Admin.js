import React, { useState } from 'react';
import ShareGame from './ShareGame';
import NewGameForm from './NewGameForm';

function Admin(props) {
  const [addGame, setAddGame] = useState(false);

  if (!props.currentGame && !addGame) {
    return <button onClick={() => setAddGame(true)}>Create A New Game</button>;
  } else if (addGame) {
    return < NewGameForm 
             createGame={props.createGame}
             setAddGame={setAddGame} />
  } else if (props.game && props.game.admin) {
    return < ShareGame game={props.game} />;
  } else {
    return <div></div>
  }
};

export default Admin;
