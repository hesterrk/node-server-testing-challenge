const express = require('express');

const apiRouter = require('./api-router.js');
const rootMiddleware = require('./rootMiddleware');

const server = express();
rootMiddleware(server);

server.use('/api', apiRouter);


module.exports = server;