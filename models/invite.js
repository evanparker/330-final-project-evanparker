const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  code: { type: String, index: true, required: true, unique: true },
  expires: { type: Date }
});

module.exports = mongoose.model("invite", inviteSchema);
