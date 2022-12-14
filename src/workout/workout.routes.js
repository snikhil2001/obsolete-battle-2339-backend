const express = require("express");
const Workout = require("./workout.model");
const authMiddleware = require("../middleware/authMiddleware");

const app = express.Router();

app.get("/", (req, res) => {
  return res.send("hello");
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Workout.findById(id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).send({ product });
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

app.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      image,
      title,
      subtitle,
      primaryvalue,
      trainingtype,
      equipment,
      calories,
    } = req.body;

    const product = await Workout.create({
      image,
      title,
      subtitle,
      primaryvalue,
      trainingtype,
      equipment,
      calories,
    });

    return res.status(201).send({ product });
  } catch (error) {
    return res.status(404).send({ error: "Something went wrong" });
  }
});

app.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      subtitle,
      primaryvalue,
      trainingtype,
      equipment,
      calories,
    } = req.body;
    const product = await Workout.findByIdAndUpdate(
      id,
      {
        image,
        title,
        subtitle,
        primaryvalue,
        trainingtype,
        equipment,
        calories,
      },
      { new: true }
    );

    return res.status(200).send({ product });
  } catch (error) {
    return res.status(404).send({ error: "Something went wrong" });
  }
});

app.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Workout.findByIdAndDelete(id);

    return res.status(200).send({ product });
  } catch (error) {
    return res.status(404).send({ error: "Something went wrong" });
  }
});

module.exports = app;
