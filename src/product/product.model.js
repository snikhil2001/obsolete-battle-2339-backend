const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: { type: String },
  title: { type: String },
  subtitle: { type: String },
  primaryvalue: { type: String },
  trainingtype: { type: String },
  equipment: { type: String },
  calories: { type: String },
  week: { type: String },
  time: { type: String },
  desc: { type: String },
  price: { type: String },
  category: { type: String, required: true },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
