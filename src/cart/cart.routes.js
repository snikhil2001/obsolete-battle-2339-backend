const express = require("express");

const app = express.Router();

app.get("/", async (req, res) => {
  return res.send("hello");
});

module.exports = app;
