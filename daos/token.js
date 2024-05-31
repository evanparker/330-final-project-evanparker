const Token = require("../models/token");
const crypto = require("crypto");

module.exports = {};

module.exports.makeTokenForUserId = async (userId) => {
  const buffer = await crypto.randomBytes(48);
  const token = buffer.toString("hex");
  return await Token.create({ userId, token });
};

module.exports.getUserIdFromToken = async (tokenString) => {
  const token = await Token.findOne({ token: tokenString });
  return token ? token.userId : null;
};

module.exports.removeToken = async (tokenString) => {
  return await Token.findOneAndDelete({ token: tokenString });
};
