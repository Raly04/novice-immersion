/** @format */

const mongoose = require("mongoose")

const schema = new mongoose.Schema(
  {
    user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Reaction", schema)
