const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
