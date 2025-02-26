const express = require('express');
const app = express();
app.disable('x-powered-by');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// environment
const { VERSION } = process.env;

// routes invoke
const userRouter = require('./routes/user');
const pokemonRouter = require('./routes/pokemon');
// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.set('json spaces', 2);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { verifyToken } = require('./middleware/validateToken');
// routes 
app.use(`/api/v${VERSION}/pokemon/*`, verifyToken);
app.use(`/api/v${VERSION}`,userRouter, pokemonRouter);

// verify token

module.exports = app;