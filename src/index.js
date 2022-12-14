const express = require("express");
require("dotenv").config();
const connect = require("./config/db");
const cors = require("cors");

const authRouter = require("./auth/auth.routes");
const workoutRouter = require("./workout/workout.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth", authRouter);
app.use("/workout", workoutRouter);

app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(8080, async () => {
  await connect();
  console.log("listening on port 8080");
});
