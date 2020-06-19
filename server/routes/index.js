const express = require('express');
const router = express.Router();

const gameService = require('../game-service');
const playerService = require('../player-service');

router.get('/game/:id/:player', (req, res) => {
  gameService.get(req, res);
});

router.get('/game/:id/:player/:admin', (req, res) => {
  gameService.adminGet(req, res);
});

router.get('/player/:id/:player', (req, res) => {
  playerService.get(req, res);
});

router.post('/game', (req, res) => {
  gameService.update(req, res);
});

router.put('/game', (req, res) => {
  gameService.create(req, res);
});

router.post('/player/name', (req, res) => {
  playerService.name(req, res);
});

router.post('/game/turn', (req, res) => {
  playerService.turn(req, res);
});

module.exports = router;
