import React, { Component } from 'react';

import AddGame from './AddGame';
import PlayGame from './PlayGame';
import ShareGame from './ShareGame';
import api from '../api';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      addGame: false,
      editGame: false,
      currentGame: false,
      shareGame: false,
      admin: false,
    };

    this.handleEnableAddMode = this.handleEnableAddMode.bind(this);
    this.handleEnableEditMode = this.handleEnableEditMode.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleAddCancel = this.handleAddCancel.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
    this.handleShareCancel = this.handleShareCancel.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('id')) {
      const id = urlParams.get('id');
      if (urlParams.has('admin')) {
        api
          .adminGet({id: id, admin: urlParams.get('admin')})
          .then(json => this.setState({ game: json, admin: true, currentGame: true}));
      } else if (urlParams.has('player')) { 
        api
          .get({id: id})
          .then(json => this.setState({ game: json, currentGame: true }));
      }
    }
  }

  handleEnableAddMode() {
    this.setState({
      addGame: true,
      game: { numberPlayers: '', timeLimit: '90' }
    });
  }

  handleEnableEditMode() {
    this.setState({
      editGame: true,
    });
  }

  handleAddCancel() {
    this.setState({ addGame: false, game: null });
  }

  handleEditCancel() {
    this.setState({ editGame: false });
  }

  handleShareCancel() {
    this.setState({ shareGame: false });
  }

  handleShare() {
    this.setState({ shareGame: true });
  }

  handleSave() {
    let game = this.state.game;

    if (this.state.addGame) {
      api
        .create(game)
        .then(result => {
          console.log('Successfully created!');
          this.setState({
            game: result,
            addGame: false,
            currentGame: true,
            admin: true,
            shareGame: true,
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      api
        .update(this.state.game)
        .then(result => {
          this.setState({
            game: result,
            editGame: false
          });
        })
        .catch(err => {});
    }
  }

  handleOnChange(event) {
    let game = this.state.game;
    game[event.target.name] = event.target.value;
    this.setState({ game: game });
  }

  render() {
    let button;
    let cancelAction;
    if (!this.state.currentGame ) {
      button = <button onClick={this.handleEnableAddMode}>Create A New Game</button>;
      cancelAction = this.handleAddCancel;
    } else if (this.state.admin) {
      if (!this.state.editGame) {
        button = <button onClick={this.handleEnableEditMode}>Edit Game Settings</button>;
      }
      cancelAction = this.handleEditCancel;
    }

    return (
      <div>
        <div className="editarea">
          {button}
          <AddGame
            addGame={this.state.addGame}
            editGame={this.state.editGame}
            onChange={this.handleOnChange}
            game={this.state.game}
            onSave={this.handleSave}
            onCancel={cancelAction}
          />
          <ShareGame
            game={this.state.game}
            currentGame={this.state.currentGame}
            shareGame={this.state.shareGame}
            onCancel={this.handleShareCancel}
            onClick={this.handleShare}
            admin={this.state.admin}
          />
        </div>
        <div className="playarea">
          <PlayGame
            game={this.state.game}
            submitTurn={this.submitTurn}
            currentGame={this.state.currentGame}
          />
        </div>
      </div>
    );
  }
}

export default Game;
