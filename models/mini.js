const mongoose = require('mongoose');

// - Mini
//   - `userId`
//   - `images`: [Image]


const miniSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "images" }]
});


module.exports = mongoose.model("minis", miniSchema);