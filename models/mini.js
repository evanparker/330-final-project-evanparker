const mongoose = require("mongoose");

const miniSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "images" }],
  figureId: { type: mongoose.Schema.Types.ObjectId, ref: "figures" }
});

module.exports = mongoose.model("minis", miniSchema);
