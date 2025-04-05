const mongoose = require("mongoose");
const Manufacturer = require("../models/manufacturer");

module.exports = {};

const getManufacturers = async (
  dbQuery = {},
  queryParams = {},
  options = {}
) => {
  const limit = queryParams.limit === undefined ? 20 : queryParams.limit;
  const offset = queryParams.offset === undefined ? 0 : queryParams.offset;

  const result = Manufacturer.paginate(dbQuery, {
    populate: "thumbnail",
    lean: true,
    offset,
    limit,
    ...options
  });

  return result;
};

module.exports.getAllManufacturers = async (queryParams) => {
  return getManufacturers({}, queryParams);
};

module.exports.getManufacturerById = async (id) => {
  const manufacturer = await Manufacturer.findById(id)
    .lean()
    .populate({ path: "images", lean: true });
  return manufacturer;
};

module.exports.getManufacturersBySearch = async (queryParams) => {
  return getManufacturers(
    { name: { $regex: queryParams.search, $options: "i" } },
    queryParams,
    { sort: { name: 1 } }
  );
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
