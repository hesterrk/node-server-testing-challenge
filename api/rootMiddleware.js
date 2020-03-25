const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use((err, req, res, next) => {
    res.status(500).json({
      message: "Something went wrong"
    });
  });
};