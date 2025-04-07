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
