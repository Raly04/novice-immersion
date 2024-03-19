/** @format */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide an username"],
    trim: true,
    minlength: 2,
    maxlength: 12,
  },
  password: {
    type: String,
    minlength: 6,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide valid email",
    ],
  },
  level: {
    type: String,
  },
  parcours: {
    type: String,
  },
});

schema.methods.compare = async function (pass) {
  return await bcrypt.compare(this.password, pass);
};
schema.methods.createToken = function () {
  return jwt.sign({ sub: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
schema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", schema);
