const mongoose = require("mongoose");
const Manufacturer = require("../models/manufacturer");

module.exports = {};

module.exports.getAllManufacturers = async () => {
  // todo: pagination
  return await Manufacturer.find().lean();
};

module.exports.getManufacturerById = async (id) => {
  // return await Manufacturer.findOne({ _id: id });
  const manufacturer = await Manufacturer.findOne({ _id: id })
    .lean()
    .populate({ path: "images", lean: true });
  return manufacturer;
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
