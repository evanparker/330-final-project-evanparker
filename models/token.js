const mongoose = require('mongoose');

// - Token
//   - `userId`
//   - `token`

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  token: { type: String, index: true, required: true, unique: true}
});


module.exports = mongoose.model("tokens", tokenSchema);