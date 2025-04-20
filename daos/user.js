const User = require("../models/user");
const Mini = require("../models/mini");

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

module.exports.addFavorite = async (userId, _id) => {
  const user = await User.findOne({ _id: userId });
  user.favorites.set(_id, _id);
  await Mini.findByIdAndUpdate(_id, { $inc: { favorites: 1 } });
  return await user.save();
};
module.exports.removeFavorite = async (userId, _id) => {
  const user = await User.findOne({ _id: userId });
  user.favorites.set(_id, null);
  await Mini.findByIdAndUpdate(_id, { $inc: { favorites: -1 } });
  return await user.save();
};
