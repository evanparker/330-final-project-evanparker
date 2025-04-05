const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const manufacturerSchema = new mongoose.Schema({
  name: { type: String, index: true, required: true },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "images" }],
  thumbnail: { type: mongoose.Schema.Types.ObjectId, ref: "images" },
  website: { type: String },
  description: { type: String },
  socials: [
    {
      service: { type: String },
      link: { type: String }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

manufacturerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("manufacturers", manufacturerSchema);
