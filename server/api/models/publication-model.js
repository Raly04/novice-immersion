/** @format */
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please provide a description"],
      trim: true,
    },
    path: {
      type: String,
    },
    tag: {
      type: [String],
    },
    images: {
      type: [String],
    },
    category: {
      type: String,
      // required: [true, "Please provide a category"],
    },
    date: {
      type: Date,
    },
    reaction: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }],
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Publication", schema);
