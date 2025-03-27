const mongoose = require("mongoose");
const Mini = require("../models/mini");

module.exports = {};

module.exports.getAllMinis = async () => {
  // todo: pagination
  return await Mini.find().lean();
};

module.exports.getAllMinisWithThumnbnail = async () => {
  let minis = await Mini.find()
    .lean()
    .populate({ path: "images", lean: true, perDocumentLimit: 1 });
  return minis;
};

module.exports.getMiniById = async (id) => {
  let mini = await Mini.findById(id)
    .lean()
    .populate({ path: "figure", lean: true })
    .populate({ path: "userId", lean: true, populate: { path: 'avatar', lean: true } })
    .populate({ path: "images", lean: true });
  return mini;
};

module.exports.getMinisByUserId = async (userId) => {
  // todo: pagination
  return await Mini.find({ userId }).lean();
};

module.exports.getMinisByUserIdWithThumbnails = async (userId) => {
  // todo: pagination
  let minis = await Mini.find({ userId })
    .lean()
    .populate({ path: "images", lean: true, perDocumentLimit: 1 });
  return minis;
};

module.exports.getMinisByFigureIdWithThumbnails = async (figureId) => {
  // todo: pagination
  let minis = await Mini.find({ figure: figureId })
    .lean()
    .populate({ path: "images", lean: true, perDocumentLimit: 1 });
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
