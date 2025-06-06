const mongoose = require("mongoose");
const Invite = require("../models/invite");

module.exports = {};

module.exports.getAllInvites = async () => {
  return await Invite.find().lean();
};

module.exports.getInviteByCode = async (code) => {
  return await Invite.findOne({code: code}).lean();
};

module.exports.createInvite = async (obj) => {
  return await Invite.create(obj);
};

module.exports.deleteInvite = async (code) => {
  return await Invite.findOneAndDelete({ code: code });
};
