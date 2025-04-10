const mongoose = require("mongoose");
const Mini = require("../models/mini");

module.exports = {};

const getMinis = async (dbQuery = {}, queryParams = {}, options = {}) => {
  const limit = queryParams.limit === undefined ? 20 : queryParams.limit;
  const offset = queryParams.offset === undefined ? 0 : queryParams.offset;

  const result = Mini.paginate(dbQuery, {
    populate: "thumbnail",
    lean: true,
    offset,
    limit,
    sort: { createdAt: -1 },
    ...options
  });

  return result;
};

module.exports.getAllMinis = async (queryParams = {}) => {
  return getMinis({}, queryParams);
};

module.exports.getMinisBySearch = async (queryParams) => {
  return getMinis(
    { name: { $regex: queryParams.search, $options: "i" } },
    queryParams,
    { sort: { name: 1 } }
  );
};

module.exports.getMiniById = async (id) => {
  let mini = await Mini.findById(id)
    .lean()
    .populate({ path: "figure", lean: true })
    .populate({
      path: "userId",
      lean: true,
      populate: { path: "avatar", lean: true }
    })
    .populate({ path: "images", lean: true });
  return mini;
};

module.exports.getMinisByUserId = async (userId, queryParams = {}) => {
  return getMinis({ userId }, queryParams);
};

module.exports.getMinisByFigureId = async (figureId, queryParams = {}) => {
  return getMinis({ figure: figureId }, queryParams);
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
