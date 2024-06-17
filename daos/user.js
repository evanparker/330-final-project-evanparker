const User = require("../models/user");

module.exports = {};

module.exports.createUser = async (userData) => {
  return await User.create(userData);
};

module.exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports.findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

module.exports.findUserById = async (_id) => {
  return await User.findOne({ _id });
};

module.exports.updateUserPassword = async (userId, password) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    { password },
    { new: true }
  );
};
