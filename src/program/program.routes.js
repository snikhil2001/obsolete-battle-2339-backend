const express = require("express");
const Program = require("./program.model");
const authMiddleware = require("../middleware/authMiddleware");

const app = express.Router();

app.get("/", async (req, res) => {
  const { weeks, time } = req.query;

  try {
    const program = await Program.find();
    if (weeks) {
      program = program.filter((el) => {
        return el.week.toLowerCase().includes(weeks);
      });
    }

    if (time) {
      program = program.filter((el) => {
        el.time.includes(time);
      });
    }

    return res.send(program);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
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

app.post("/", authMiddleware, async (req, res) => {
  try {
    const { image, week, time, desc, price } = req.body;
    const product = await Program.create({ image, week, time, desc, price });

    return res.status(201).send({ product });
  } catch (error) {
    return res.status(404).send({ error: "Something went wrong" });
  }
});

app.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { image, week, time, desc, price } = req.body;
    const product = await Program.findByIdAndUpdate(
      id,
      { image, week, time, desc, price },
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
    const product = await Program.findByIdAndDelete(id);

    return res.status(200).send({ product });
  } catch (error) {
    return res.status(404).send({ error: "Something went wrong" });
  }
});

module.exports = app;
