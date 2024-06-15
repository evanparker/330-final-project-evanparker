const mongoose = require("mongoose");

const figureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "manufacturers"
  },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "images" }]
});

module.exports = mongoose.model("figures", figureSchema);
