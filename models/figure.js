const mongoose = require("mongoose");

const figureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "manufacturers"
  },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "images" }]
});

figureSchema.index({ name: 'text' });

module.exports = mongoose.model("figures", figureSchema);
