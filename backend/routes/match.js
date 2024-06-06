const express = require('express');
const Router = express.Router();
const matchController = require('../controllers/match');

Router.get('/matches', matchController.getAllData)
Router.get('/matches/:id', matchController.getDataById)

module.exports = Router;