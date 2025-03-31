const mongoose = require("mongoose");
const Manufacturer = require("../models/manufacturer");

module.exports = {};

module.exports.getAllManufacturers = async () => {
  // todo: pagination
  return await Manufacturer.find()
    .lean()
    .populate({ path: "thumbnail", lean: true });
};

module.exports.getManufacturerById = async (id) => {
  const manufacturer = await Manufacturer.findById(id)
    .lean()
    .populate({ path: "images", lean: true });
  return manufacturer;
};

module.exports.getManufacturersBySearch = async (query) => {
  const manufacturers = await Manufacturer.find({
    name: { $regex: query, $options: "i" }
  })
    .lean()
    .sort({ name: 1 })
    .limit(20);
  return manufacturers;
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
