const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  username: { type: String },
  password: String,
  confirmpassword: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const User = mongoose.model("user", authSchema);

module.exports = User;
