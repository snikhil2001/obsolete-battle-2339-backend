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

app.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    let product = await Cart.findById(id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (product.user.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .send({ message: "You are deleting other cart items" });
    }

    product = await Cart.findByIdAndDelete(id);
    return res.send({ message: "product deleted successfully", product });
  } catch (error) {
    return res.send({ error: error.message });
  }
});

module.exports = app;
