const mongoose = require("mongoose");
const Mini = require("../models/mini");
const Image = require("../models/image");

module.exports = {};

module.exports.getAllMinis = async () => {
  // todo: pagination
  return await Mini.find();
};

module.exports.getMiniById = async (id) => {
  let mini = await Mini.findOne({ _id: new mongoose.Types.ObjectId(id) });
  const images = await Image.find({ _id: { $in: mini.images.map(i=>i.toString()) } });
  mini.images = images;
  return mini;
};

module.exports.getMinisByUserId = async (userId) => {
  // todo: pagination
  return await Mini.find({ userId });
};

module.exports.createMini = async (miniObj) => {
  return await Mini.create(miniObj);
};

module.exports.updateMini = async (id, miniObj) => {
  return await Mini.findOneAndUpdate({ _id: id }, miniObj, { new: true });
};

module.exports.deleteMini = async (id) => {
  return await Mini.findOneAndDelete({ _id: id });
};
