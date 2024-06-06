const express = require('express');
const Router = express.Router();
const teamController = require('../controllers/Team');

Router.get('/:id', teamController.getAllData);
Router.post('/', teamController.postData);
Router.get('/players/:matchId/:userId', teamController.getPlayers);

module.exports = Router;