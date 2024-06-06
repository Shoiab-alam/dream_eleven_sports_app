const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo');
app.use(session({
  secret: 'aljfdhlfakfddbjasddjhldfhlkfddkj',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/DreamEleven' })
}))

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use('/', require('./routes/match'))
app.use('/user', require('./routes/user'));

app.use('/team', require('./routes/Team'));

mongoose.connect('mongodb://127.0.0.1:27017/DreamEleven')
  .then(() => app.listen(PORT,()=> {
    console.log('server listening on port', PORT)
})).catch(err => console.log(err));