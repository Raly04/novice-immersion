/** @format */

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date_event: {
      type: Date,
    },
    title: {
      type: String,
      required: [true, "please provide a title"],
    },
    path: {
      type: String,
    },
    interested: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Evenement", schema);
