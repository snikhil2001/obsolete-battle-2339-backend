const express = require("express");
const Pilot = require("./pilot.model");

const app = express.Router();

app.get("/", async (req, res) => {
  const pilot = await Pilot.find();
  return res.send(pilot);
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Pilot.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).send({ product });
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

module.exports = app;
