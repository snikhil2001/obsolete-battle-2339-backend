const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  image: { type: String, required: true },
  week: { type: String, required: true },
  time: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: String, required: true },
});

const Program = mongoose.model("program", programSchema);

module.exports = Program;
