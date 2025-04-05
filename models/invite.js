const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  code: { type: String, index: true, required: true, unique: true },
  expires: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model("invite", inviteSchema);
