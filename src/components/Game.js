import React, { useState , useEffect } from 'react';
import Admin from './Admin';
import PlayGame from './PlayGame';
import api from '../api';

function Game(props) {
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
           .then(json => findGame(json));
      } else { 
        api.get({id: id, 
                 player: player})
           .then(json => findGame(json));   
      }
    }
  // empty array causes this function to only get called on initial page load
  }, []);

  const createGame = (game) => {
    setGame(game);
    setPlayer(game.players[0])
    setCurrentGame(true)
  };

  const findGame = (game) => {
    setGame(game);
    setCurrentGame(true);
  };

  const modifyGame = (newGame) => {
    setGame({...newGame, ...game});
  };

  const modifyPlayers = (players) => {
    let modifiedGame = game;
    players.map((newPlayer, index) => {
      modifiedGame.players[index] = {...modifiedGame.players[index], ...newPlayer}
    });
    setGame(modifiedGame);
  };

  const modifyPlayer = (user) => {
    setPlayer({...player, ...user});
  };

  const display = currentGame && player ? <PlayGame
                                            game={game}
                                            player={player}
                                            modifyPlayers={modifyPlayers}
                                            modifyPlayer={modifyPlayer} /> : ''
  return(
    <div className="game">
      <Admin
        game={game}
        createGame={createGame}
        currentGame={currentGame}
        setCurrentGame={setCurrentGame}
      />
      {display}
    </div>
  );
};

export default Game;
