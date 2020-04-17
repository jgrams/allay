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
      fetch(`${baseAPI}/game/${game.id}`, {
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
      fetch(`${baseAPI}/game/${game.id}/${game.admin}`, {
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
};

export default gameService;
