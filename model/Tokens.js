const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      max: 25,
      min: 6,
    },
    token: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "tokens",
  }
);

module.exports = mongoose.model("Tokens", tokenSchema);
