// models/Answer.js
const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  content:     { type: String, required: true },
  question:    { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  user:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  votes:       { type: Number, default: 0 },
  isAccepted:  { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);