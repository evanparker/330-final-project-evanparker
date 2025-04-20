const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true
  },
  password: { type: String, required: true },
  roles: { type: [String], required: true },
  avatar: { type: mongoose.Schema.Types.ObjectId, ref: "images" },
  website: { type: String },
  description: { type: String },
  socials: [
    {
      service: { type: String },
      link: { type: String }
    }
  ],
  favorites: {
    type: Map,
    of: mongoose.Schema.Types.ObjectId,
    ref: "minis",
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// userSchema.pre("save", async function (next) {
//   const bcryptSalt = Number(process.env.BCRYPT_SALT);
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
//   this.password = hash;
//   next();
// });

module.exports = mongoose.model("users", userSchema);

// Example of a Map referencing multiple collections:
// https://github.com/Automattic/mongoose/issues/10584
// favorites: {
//   type: Map,
//   of: {
//     modelId: String,
//     data: [
//       {
//         _id: mongoose.Schema.Types.ObjectId,
//         ref: (doc) => doc.parent().modelId
//       }
//     ]
//   }
// },
