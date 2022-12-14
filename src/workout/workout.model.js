const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  primaryvalue: { type: String, required: true },
  trainingtype: { type: String, required: true },
  equipment: { type: String, required: true },
  calories: { type: String, required: true },
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;
