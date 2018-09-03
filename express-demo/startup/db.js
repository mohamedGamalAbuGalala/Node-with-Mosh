const mongoose = require("mongoose");
const winston = require("winston");

module.exports = () => {
  mongoose
    .connect(
      "mongodb://localhost/expressDemo",
      { useNewUrlParser: true }
    )
    .then(() => winston.info("Connected to mongoDB..."));
};
