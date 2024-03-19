/** @format */

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connect = (url) => {
  return mongoose.connect(url);
};

module.exports = connect;
