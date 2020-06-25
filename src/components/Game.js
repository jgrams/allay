import React, { useState } from 'react';
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
         .then(json => this.setState({player: json.players[0]}));
      if (urlParams.has('admin')) {
        slug = urlParams.get('admin');
        api.adminGet({id: id, 
                      player: player, 
                      admin: slug})
           .then(json => setGame(json));
      } else { 
        api.get({id: id, 
                 player: player})
           .then(json => setGame(json));   
      }
    }
  });

  newGame() {
    setGame({ numberPlayers: 3, timeLimit: '90' });
    addGame(true);
  }

  handleAddCancel() {
    addGame(false);
    setGame(null);
  }

  createGame() {
    let game = this.state.game;
    api
      .create(game)
      .then(result => {
        setGame(result)
        setPlayer(result.players[0])
        addGame(false)
        currentGame(true)
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleGameChange(event) {
    let modifiedGame = game;
    modifiedGame[event.target.name] = event.target.value;
    setGame({ modifiedGame });
  }

  handlePlayerChange(event) {
    let modifiedPlayer = player;
    modifiedPlayer[event.target.name] = event.target.value;
    setPlayer({ modifiedPlayer });
  }

  return(
    if (game && player) {
      game = <PlayGame
            game={game}
            player={player}
            setGame={setGame}
            handlePlayerChange={handlePlayerChange} />
    }
    <div>
      <div className="editarea">
        <Admin
          addGame={addGame}
          onChange={handleGameChange}
          game={game}
          newGame={newGame}
          createGame={createGame}
          cancelNewGame={handleAddCancel}
          shareGame={shareGame}
        />
      </div>
      <div className="playarea">
        {game}
      </div>
  );
};

export default Game;
