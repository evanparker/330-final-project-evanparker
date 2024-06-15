const mongoose = require("mongoose");

const manufacturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "images" }]
});

module.exports = mongoose.model("manufacturers", manufacturerSchema);
