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
  favorites: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  blur: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false }
});

miniSchema.index({ name: 1 });

miniSchema.plugin(mongoosePaginate);

miniSchema.pre("find", function () {
  if (!this.options.getDeleted) {
    this.where({ isDeleted: false });
  }
});

miniSchema.pre("findOne", function () {
  if (!this.options.getDeleted) {
    this.where({ isDeleted: false });
  }
});

module.exports = mongoose.model("minis", miniSchema);
