const mongoose = require("mongoose");
const Mini = require("../models/mini");

module.exports = {};

module.exports.getAllMinis = async () => {
  // todo: pagination
  return await Mini.find();
};

module.exports.getMiniById = async (id) => {
  let mini = await Mini.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
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
        userId: { $first: "$userId" },
        images: { $push: "$images" }
      }
    }
  ]);
  if (mini.length === 0) {
    mini = await Mini.find({ _id: new mongoose.Types.ObjectId(id)})
  }
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
