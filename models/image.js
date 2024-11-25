const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  cloudinaryCloudName: { type: String, required: true },
  cloudinaryPublicId: { type: String, required: true }
});

module.exports = mongoose.model("images", imageSchema);
