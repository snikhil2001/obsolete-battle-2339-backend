const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  week: { type: String, required: true },
  time: { type: String, required: true },
  price: { type: String, required: true },
});

const Meal = mongoose.model("meal", mealSchema);

module.exports = Meal;
