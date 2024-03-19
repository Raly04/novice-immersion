/** @format */

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: {
      type: String,
      require: [true, "Comment is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", schema);
