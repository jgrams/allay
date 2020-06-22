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

router.get('/stream', function (req, res, next) {
  //when using text/plain it did not stream
  //without charset=utf-8, it only worked in Chrome, not Firefox
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  res.write("Thinking...");
  sendAndSleep(res, 1);
});


var sendAndSleep = function (response, counter) {
  if (counter > 10) {
    response.end();
  } else {
    response.write(" ;i=" + counter);
    counter++;
    setTimeout(function () {
      sendAndSleep(response, counter);
    }, 1000)
  };
};

module.exports = router;
