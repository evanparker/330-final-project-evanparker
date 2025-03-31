const mongoose = require("mongoose");

const figureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "manufacturers"
  },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "images" }],
  thumbnail: { type: mongoose.Schema.Types.ObjectId, ref: "images" },
  description: { type: String },
  website: { type: String },
  partNumber: { type: String },
  artist: { type: String }
});

figureSchema.index({ name: "text", partNumber: "text" });

module.exports = mongoose.model("figures", figureSchema);
