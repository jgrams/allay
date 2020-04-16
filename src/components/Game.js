import React, { Component } from 'react';

import EditGame from './EditGame';
import api from '../api';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      games: [],
      creatingGame: false
    };

    this.handleEnableAddMode = this.handleEnableAddMode.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    api.get().then(json => this.setState({ heroes: json }));
  }

  handleSelect(hero) {
    this.setState({ selectedGame: hero });
  }

  handleDelete(event, hero) {
    event.stopPropagation();

    api.destroy(hero).then(() => {
      let heroes = this.state.heroes;
      heroes = heroes.filter(h => h !== hero);
      this.setState({ heroes: heroes });

      if (this.selectedGame === hero) {
        this.setState({ selectedGame: null });
      }
    });
  }

  handleEnableAddMode() {
    this.setState({
      addingGame: true,
      game: { players: '', timeLimit: '' }
    });
  }

  handleCancel() {
    this.setState({ addingGame: false, game: null });
  }

  handleSave() {
    let game = this.state.game;

    if (this.state.addingGame) {
      api
        .game(this.state.game)
        .then(result => {
          console.log('Successfully created!');
          this.setState({
            game: result,
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
      <div>
        <ul className="games">
          {this.state.games.map(game => {
            return (
              <div>Game</div>
            );
          })}
        </ul>
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
      </div>
    );
  }
}

export default Game;
