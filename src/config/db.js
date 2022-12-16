const mongoose = require("mongoose");
const url = process.env.DB_URL;

const connect = () => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log("error in connection");
      } else {
        console.log("mongodb is connected");
      }
    }
  );
};

module.exports = connect;
