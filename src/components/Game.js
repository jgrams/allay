import React, { Component } from 'react';

import EditGame from './EditGame';
import api from '../api';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      creatingGame: false
    };

    this.handleEnableAddMode = this.handleEnableAddMode.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    api.get().then(json => this.setState({ heroes: json }));
  }

  handleEnableAddMode() {
    this.setState({
      addingGame: true,
      game: { numberPlayers: '', timeLimit: '90' }
    });
  }

  handleCancel() {
    this.setState({ addingGame: false, game: null });
  }

  handleSave() {
    let game = this.state.game;

    if (this.state.addingGame) {
      api
        .create(game)
        .then(result => {
          console.log('Successfully created!');
          this.setState({
            game: game,
            addingGame: false,
            currentGame: true
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      api
        .update(this.state.game)
        .catch(err => {});
    }
  }

  handleOnChange(event) {
    let game = this.state.game;
    game[event.target.name] = event.target.value;
    this.setState({ game: game });
  }

  render() {
    return (
        <div className="editarea">
          <button onClick={this.handleEnableAddMode}>Create A New Game</button>
          <EditGame
            addingGame={this.state.addingGame}
            onChange={this.handleOnChange}
            game={this.state.game}
            onSave={this.handleSave}
            onCancel={this.handleCancel}
          />
        </div>
    );
  }
}

export default Game;
