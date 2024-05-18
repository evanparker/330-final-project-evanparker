const mongoose = require('mongoose');

// - User
//   - `username`: string, index, unique
//   - `email`: string, index, unique
//   - `password`: string, encrypt
//   - `roles`: [string]

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], required: true }
});


module.exports = mongoose.model("users", userSchema);