const express = require('express');
const Router = express.Router();
const userController = require('../controllers/user');

Router.post('/signup', userController.postSignup);
Router.post('/login', userController.postLogin);
Router.get('/', userController.getAllData);
Router.get('/logout', (req,res) => {
    req.session.destroy(function(err) {
        res.json({message:'successfully logged out'})
      })      
})

module.exports = Router;