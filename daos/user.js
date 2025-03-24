const User = require("../models/user");

module.exports = {};

module.exports.createUser = async (userData) => {
  return await User.create(userData);
};

module.exports.findUserByEmail = async (email) => {
  return await User.findOne({ email }).lean();
};

module.exports.findUserByUsername = async (username) => {
  return await User.findOne({ username }).lean();
};

module.exports.findUserById = async (_id) => {
  return await User.findOne({ _id }).lean();
};

module.exports.updateUserPassword = async (userId, password) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    { password },
    { new: true }
  );
};
