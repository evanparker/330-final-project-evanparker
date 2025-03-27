const mongoose = require("mongoose");
const Figure = require("../models/figure");

module.exports = {};

module.exports.getAllFigures = async () => {
  // todo: pagination
  return await Figure.find().lean().populate({ path: "images", lean: true });
};

module.exports.getFigureById = async (id) => {
  const figure = await Figure.findById(id)
    .lean()
    .populate({ path: "manufacturer", lean: true })
    .populate({ path: "images", lean: true });
  return figure;
};

module.exports.getFiguresBySearch = async (query) => {
  const figures = await Figure.find({ "name": { "$regex": query, "$options": "i" } }).lean().limit(20);
  return figures;
};

module.exports.createFigure = async (obj) => {
  return await Figure.create(obj);
};

module.exports.updateFigure = async (id, obj) => {
  return await Figure.updateOne({ _id: id }, obj, { new: true });
};

module.exports.deleteFigure = async (id) => {
  return await Figure.findOneAndDelete({ _id: id });
};
