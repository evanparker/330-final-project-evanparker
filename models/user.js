const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], required: true },
  avatar: { type: mongoose.Schema.Types.ObjectId, ref: "images" }
});

module.exports = mongoose.model("users", userSchema);
