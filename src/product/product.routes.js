const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Product = require("./product.model");

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
    category,
    weeks,
  } = req.query;

  try {
    if (!limit) {
      limit = 40;
    }

    if (!page) {
      page = 1;
    }

    let product = await Product.find({ category })
      .limit(+limit)
      .skip((+page - 1) * +limit);

    if (weeks) {
      product = product.filter((el) => {
        return el.week.toLowerCase().includes(weeks);
      });
    }

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
    const product = await Product.findById(id);

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
      week,
      time,
      desc,
      price,
      category,
    } = req.body;

    if (req.role !== "admin") {
      return res.status(403).send({ message: "You are not an admin" });
    }

    const product = await Product.create({
      image,
      title,
      subtitle,
      primaryvalue,
      trainingtype,
      equipment,
      calories,
      week,
      time,
      desc,
      price,
      category,
    });

    return res.status(201).send({ product });
  } catch (error) {
    return res.status(404).send({ error: "Something went wrong" });
  }
});

app.patch("/:id", authMiddleware, async (req, res) => {
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
      week,
      time,
      desc,
      price,
      category,
    } = req.body;

    if (req.role !== "admin") {
      return res.status(403).send({ message: "You are not an admin" });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        image,
        title,
        subtitle,
        primaryvalue,
        trainingtype,
        equipment,
        calories,
        week,
        time,
        desc,
        price,
        category,
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

    if (req.role !== "admin") {
      return res.status(403).send({ message: "You are not an admin" });
    }

    const product = await Product.findById(id);

    return res.send({ message: "Deleted successfully", product });

    // const product = await Product.findByIdAndDelete(id);

    return res.status(200).send({ product });
  } catch (error) {
    return res.status(404).send({ error: "Something went wrong" });
  }
});

module.exports = app;
