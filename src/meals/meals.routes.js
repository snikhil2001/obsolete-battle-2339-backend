const express = require("express");
const Meal = require("./meals.model");

const app = express.Router();

app.get("/", async (req, res) => {
  const meal = await Meal.find();
  return res.send(meal);
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Program.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).send({ product });
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

module.exports = app;
