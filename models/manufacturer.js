const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const manufacturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "images" }],
  thumbnail: { type: mongoose.Schema.Types.ObjectId, ref: "images" },
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

manufacturerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("manufacturers", manufacturerSchema);
