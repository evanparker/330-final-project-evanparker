const mongoose = require("mongoose");
const Figure = require("../models/figure");

module.exports = {};

module.exports.getAllFigures = async () => {
  // todo: pagination
  return await Figure.find();
};

module.exports.getFigureById = async (id) => {
  const figure = await Figure.findOne({ _id: id }).lean();

  const aggregationPipeline = [
    { $match: { _id: new mongoose.Types.ObjectId(id) } }
  ];

  if (figure?.manufacturerId) {
    aggregationPipeline.push(
      {
        $lookup: {
          from: "manufacturers",
          localField: "manufacturerId",
          foreignField: "_id",
          as: "manufacturer"
        }
      },
      { $unwind: { path: "$manufacturer" } }
    );
  }

  if (figure?.images?.length > 0) {
    aggregationPipeline.push(
      { $unwind: { path: "$images" } },
      {
        $lookup: {
          from: "images",
          localField: "images",
          foreignField: "_id",
          as: "images"
        }
      },
      { $unwind: { path: "$images" } },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          manufacturer: { $first: "$manufacturer" },
          images: { $push: "$images" }
        }
      }
    );
  }

  return (await Figure.aggregate(aggregationPipeline))[0];
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
