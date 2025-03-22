const mongoose = require("mongoose");
const Mini = require("../models/mini");
const Image = require("../models/image");

module.exports = {};

module.exports.getAllMinis = async () => {
  // todo: pagination
  return await Mini.find();
};

module.exports.getAllMinisWithThumnbnail = async () => {
  // todo: pagination
  let minis = await Mini.find();
  for (let mini of minis) {
    if(mini.images.length > 0) {
      const image = await Image.findOne({_id: new mongoose.mongoose.Types.ObjectId(mini.images[0]._id)})
      mini.images = [image];
    }
  }
  return minis;
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

module.exports.getMinisByUserIdWithThumbnails = async (userId) => {
  // todo: pagination
  let minis = await Mini.find({ userId });
  for (let mini of minis) {
    if(mini.images.length > 0) {
      const image = await Image.findOne({_id: new mongoose.mongoose.Types.ObjectId(mini.images[0]._id)})
      mini.images = [image];
    }
  }
  return minis;
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
