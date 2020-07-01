const baseAPI = '/api';

const gameService = {
  create(game) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/game`, {
        method: 'PUT',
        body: JSON.stringify(game),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  update(game) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/game`, {
        method: 'POST',
        body: JSON.stringify(game),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  get(game) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/game/${game.id}/${game.player}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  adminGet(game) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/game/${game.id}/${game.player}/${game.admin}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  player(game) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/player/${game.id}/${game.player}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  name(player) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/player/name`, {
        method: 'POST',
        body: JSON.stringify(player),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  ready(gameId) {
    const url = `${baseAPI}/ready/${gameId}`
    return new EventSource(url)
  },

};

export default gameService;
