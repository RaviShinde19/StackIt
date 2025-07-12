// models/Question.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  tags:        [{ type: String }],
  user:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);