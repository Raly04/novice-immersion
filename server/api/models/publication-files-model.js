/** @format */

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    publication: { type: mongoose.Schema.Types.ObjectId, ref: "Publication" },
    file_name: { 
        type : String
    },
    text: {
      type: String,
      require: [true, "Comment is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PublicationFiles", schema);