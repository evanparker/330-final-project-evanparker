const mongoose = require("mongoose");

const manufacturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "images" }],
  website: { type: String },
  description: { type: String },
  socials: [
    {
      service: { type: String },
      link: { type: String }
    }
  ]
});

manufacturerSchema.index({ name: "text" });

module.exports = mongoose.model("manufacturers", manufacturerSchema);
