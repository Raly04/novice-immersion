/** @format */

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: {
      type: String,
      require: [true, "text is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", schema);
