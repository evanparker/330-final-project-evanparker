const mongoose = require("mongoose");

const passwordTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  token: { type: String, index: true, required: true, unique: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600
  }
});

module.exports = mongoose.model("passwordTokens", passwordTokenSchema);
