const mongoose = require("mongoose");
const Manufacturer = require("../models/manufacturer");

module.exports = {};

module.exports.getAllManufacturers = async () => {
  // todo: pagination
  return await Manufacturer.find();
};

module.exports.getManufacturerById = async (id) => {
  // return await Manufacturer.findOne({ _id: id });
  const manufacturer = await Manufacturer.findOne({ _id: id }).lean();
  if (manufacturer?.images?.length > 0) {
    return (
      await Manufacturer.aggregate([
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
            images: { $push: "$images" }
          }
        }
      ])
    )[0];
  } else {
    return manufacturer;
  }
};

module.exports.createManufacturer = async (obj) => {
  return await Manufacturer.create(obj);
};

module.exports.updateManufacturer = async (id, obj) => {
  return await Manufacturer.updateOne({ _id: id }, obj, { new: true });
};

module.exports.deleteManufacturer = async (id) => {
  return await Manufacturer.findOneAndDelete({ _id: id });
};
