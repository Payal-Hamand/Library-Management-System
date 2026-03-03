const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "borrowed"],
      default: "available",
    },
    publishedYear: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);