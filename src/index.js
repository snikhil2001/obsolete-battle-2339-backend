const express = require("express");
require("dotenv").config();
const connect = require("./config/db");
const cors = require("cors");
const PORT = process.env.PORT || 5050;

const authRouter = require("./auth/auth.routes");
const productRouter = require("./product/product.routes");
const cartRouter = require("./cart/cart.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);

app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(PORT, async () => {
  await connect();
  console.log(`listening on port ${PORT}`);
});
