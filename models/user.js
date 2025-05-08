const mongoose = require("mongoose");
const reservedNames = require("../utils/reservedNames");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: [true, "Username already in use"],
    immutable: true,
    trim: true,
    validate: [
      {
        validator: (val) => {
          return !reservedNames.includes(val);
        },
        message: "Username already in use"
      },
      {
        validator: (val) => {
          return val.length >= 3 && val.length <= 30;
        },
        message: "Username must be between 3 and 30 characters"
      },
      {
        validator: /^[a-z0-9-_]+$/,
        message:
          "Username must consist of only lowercase characters, numbers, dashes, and underscores"
      }
    ]
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: [true, "Email must be unique"],
    immutable: true,
    validate: [
      {
        validator: /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/,
        message: "Must be a valid email address"
      }
    ],
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
  violations: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model("users", userSchema);

// userSchema.pre("save", async function (next) {
//   const bcryptSalt = Number(process.env.BCRYPT_SALT);
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
//   this.password = hash;
//   next();
// });

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
