const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  image: { type: String }
});

module.exports = mongoose.model("images", imageSchema);