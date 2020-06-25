import React, { useState , useEffect } from 'react';
import Admin from './Admin';
import PlayGame from './PlayGame';
import api from '../api';

function Game(props) {
  const [addGame, setAddGame] = useState(false);
  const [currentGame, setCurrentGame] = useState(false);
  const [game, setGame] = useState(null);
  const [player, setPlayer] = useState(null);

  useEffect(() =>  {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('id') && urlParams.has('player')) {
      const id = urlParams.get('id');
      const player = urlParams.get('player')
      api.player({id: id, 
                  player: player})
         .then(json => setPlayer(json.players[0]));
      if (urlParams.has('admin')) {
        api.adminGet({id: id, 
                      player: player, 
                      admin: urlParams.get('admin')})
           .then(json => foundGame(json));
      } else { 
        api.get({id: id, 
                 player: player})
           .then(json => foundGame(json));   
      }
    }
  // empty akrray cuases function to only get called on initial page load
  }, []);

  const foundGame = (game) => {
    setGame(game);
    setCurrentGame(true);
  };

  const newGame = () => {
    setGame({ numberPlayers: 3, timeLimit: '90' });
    setAddGame(true);
  };

  const handleAddCancel = () => {
    setAddGame(false);
    setGame(null);
  };

  const createGame = () => {
    api
      .create(game)
      .then(result => {
        setGame(result)
        setPlayer(result.players[0])
        setAddGame(false)
        setCurrentGame(true)
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleGameChange = (event) => {
    let modifiedGame = game;
    modifiedGame[event.target.name] = event.target.value;
    setGame({ modifiedGame });
  }

  const handlePlayerChange = (event) => {
    let modifiedPlayer = player;
    modifiedPlayer[event.target.name] = event.target.value;
    setPlayer({ modifiedPlayer });
  }

  return(
    <div className="game">
      <div className="editarea">
        <Admin
          addGame={addGame}
          onChange={handleGameChange}
          game={game}
          newGame={newGame}
          createGame={createGame}
          cancelNewGame={handleAddCancel}
        />
      </div>
      <div className="playarea">
        <PlayGame
          game={game}
          currentGame={currentGame}
          player={player}
          setGame={setGame}
          handlePlayerChange={handlePlayerChange} />
      </div>
    </div>
  );
};

export default Game;
