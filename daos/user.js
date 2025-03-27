const User = require("../models/user");

module.exports = {};

module.exports.createUser = async (userData) => {
  return await User.create(userData);
};

module.exports.findUserByEmail = async (email) => {
  return await User.findOne({ email })
    .lean()
    .populate({ path: "avatar", lean: true });
};

module.exports.findUserByUsername = async (username) => {
  return await User.findOne({ username })
    .lean()
    .populate({ path: "avatar", lean: true });
};

module.exports.findUserById = async (_id) => {
  return await User.findById(_id)
    .lean()
    .populate({ path: "avatar", lean: true });
};

module.exports.updateUserPassword = async (userId, password) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    { password },
    { new: true }
  );
};

module.exports.updateUser = async (userId, userObj) => {
  delete userObj.password;
  return await User.findOneAndUpdate({ _id: userId }, userObj, { new: true });
};
