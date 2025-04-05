const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const miniSchema = new mongoose.Schema({
  name: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "images" }],
  thumbnail: { type: mongoose.Schema.Types.ObjectId, ref: "images" },
  figure: { type: mongoose.Schema.Types.ObjectId, ref: "figures" },
  description: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

miniSchema.index({ name: 1 });

miniSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("minis", miniSchema);
