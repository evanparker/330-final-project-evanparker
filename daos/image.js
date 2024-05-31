const Image = require("../models/image");

module.exports = {};

module.exports.getAllImages = async () => {
  // todo: pagination
  return await Image.find();
};

module.exports.getImageById = async (id) => {
  return await Image.findOne({ _id: id });
};

module.exports.getImagesByIds = async (ids) => {
  return await Image.find({ _id: { $in: ids } });
};

module.exports.getImagesByUserId = async (userId) => {
  // todo: pagination
  return await Image.find({ userId });
};

module.exports.createImage = async (ImageObj) => {
  return await Image.create(ImageObj);
};

module.exports.deleteImage = async (id) => {
  return await Image.findOneAndDelete({ _id: id });
};
