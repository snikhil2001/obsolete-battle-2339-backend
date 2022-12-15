const express = require("express");
const Workout = require("./workout.model");
const authMiddleware = require("../middleware/authMiddleware");

const app = express.Router();

app.get("/", async (req, res) => {
  let {
    title,
    time,
    calories,
    bodyfocus,
    trainingtype,
    equipment,
    limit,
    page,
  } = req.query;

  try {
    if (!limit) {
      limit = 40;
    }

    if (!page) {
      page = 1;
    }

    let product = await Workout.find()
      .limit(+limit)
      .skip((+page - 1) * +limit);

    if (title) {
      product = product.filter((el) => {
        return (
          el.title.toLowerCase().includes(title) || el.title.includes(title)
        );
      });
    }

    if (time) {
      product = product.filter((el) => {
        return (
          el.primaryvalue.toLowerCase().includes(time + " " + "Min") ||
          el.primaryvalue.includes(time + " " + "Min")
        );
      });
    }

    if (calories) {
      product = product.filter((el) => {
        return el.calories === calories;
      });
    }

    if (bodyfocus) {
      product = product.filter((el) => {
        return (
          el.primaryvalue.toLowerCase().includes(bodyfocus) ||
          el.primaryvalue.includes(bodyfocus)
        );
      });
    }

    if (trainingtype) {
      product = product.filter((el) => {
        return (
          el.trainingtype.toLowerCase().includes(trainingtype) ||
          el.trainingtype.includes(trainingtype)
        );
      });
    }

    if (equipment) {
      product = product.filter((el) => {
        return (
          el.equipment.toLowerCase().includes(equipment) ||
          el.equipment.includes(equipment)
        );
      });
    }

    return res.send(product);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
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
