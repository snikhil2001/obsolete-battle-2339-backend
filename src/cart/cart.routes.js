const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Cart = require("./cart.model");

const app = express.Router();

app.get("/", authMiddleware, async (req, res) => {
  try {
    let products = await Cart.find({ user: req.userId }).populate("product");
    return res.send(products);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

app.post("/", authMiddleware, async (req, res) => {
  try {
    let products = await Cart.create({ ...req.body, user: req.userId });

    return res.send(products);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Cart.findById(id);

    if (product.user !== req.userId) {
      return res
        .status(403)
        .send({ message: "You are deleting other cart items" });
    }

    product = await Cart.findByIdAndDelete(id);

    return res.send({ product });
  } catch (error) {}
});

module.exports = app;
