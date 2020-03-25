const express = require('express');

const apiRouter = require('./api-router.js');
const rootMiddleware = require('./rootMiddleware');

const server = express();
rootMiddleware(server);

server.use('/api', apiRouter);

//opening route
server.get("/", (req, res) => {
    res.status(200).json({ message: "all working" });
  });


module.exports = server;