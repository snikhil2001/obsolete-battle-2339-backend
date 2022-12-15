const mongoose = require("mongoose");

const pilotSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  week: { type: String, required: true },
  time: { type: String, required: true },
  price: { type: String, required: true },
});

const Pilot = mongoose.model("pilot", pilotSchema);

module.exports = Pilot;
