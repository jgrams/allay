import React, { Component } from 'react';

import Admin from './Admin';
import PlayGame from './PlayGame';
import api from '../api';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      addGame: false,
      currentGame: false
    };

    this.newGame = this.newGame.bind(this);
    this.createGame = this.createGame.bind(this);
    this.handleGameChange = this.handleGameChange.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handleAddCancel = this.handleAddCancel.bind(this);
  }

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('id') && urlParams.has('player')) {
      const id = urlParams.get('id');
      const player = urlParams.get('player')
        api.player({id: id, 
                    player: player})
           .then(json => this.setState({player: json.players[0]}));
      if (urlParams.has('admin')) {
        api.adminGet({id: id, 
                      player: player, 
                      admin: urlParams.get('admin')})
           .then(json => this.setGame(json));
      } else { 
        api.get({id: id, 
                 player: player})
           .then(json => this.setGame(json, player));   
      }
    }
  }

  setGame(game, playerSlug) {
    this.setState({
      game: game, 
      currentGame: true,
    });
  }

  newGame() {
    this.setState({
      addGame: true,
      game: { numberPlayers: 3, timeLimit: '90' }
    });
  }

  handleAddCancel() {
    this.setState({ addGame: false, game: null });
  }

  createGame() {
    let game = this.state.game;
    api
      .create(game)
      .then(result => {
        this.setState({
          game: result,
          addGame: false,
          shareGame: true,
          currentGame: true,
          player: result.players[0]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleGameChange(event) {
    let game = this.state.game;
    game[event.target.name] = event.target.value;
    this.setState({ game: game });
  }

  handlePlayerChange(event) {
    let player = this.state.player;
    player[event.target.name] = event.target.value;
    this.setState({ player: player });
  }

  render() {
    let game;
    if (this.state.game && this.state.player) {
      game = <PlayGame
            game={this.state.game}
            player={this.state.player}
            submitTurn={this.submitTurn}
            handlePlayerChange={this.handlePlayerChange} />
    }

    return (
      <div>
        <div className="editarea">
          <Admin
            addGame={this.state.addGame}
            onChange={this.handleGameChange}
            game={this.state.game}
            newGame={this.newGame}
            createGame={this.createGame}
            cancelNewGame={this.handleAddCancel}
            shareGame={this.state.shareGame}
          />
        </div>
        <div className="playarea">
          {game}
        </div>
      </div>
    );
  }
}

export default Game;
