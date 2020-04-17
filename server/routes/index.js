const express = require('express');
const router = express.Router();

const gameService = require('../game-service');

router.get('/game', (req, res) => {
  gameService.get(req, res);
});

router.post('/game', (req, res) => {
  gameService.update(req, res);
});

// router.delete('/hero/:id', (req, res) => {
//   heroesService.destroy(req, res);
// });

router.put('/game', (req, res) => {
  gameService.create(req, res);
});

module.exports = router;
