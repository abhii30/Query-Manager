const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  status: { type: String, default: "unsolved" },
  replies: [{ message: String, date: { type: Date, default: Date.now } }],
});

module.exports = mongoose.model("Query", querySchema);
