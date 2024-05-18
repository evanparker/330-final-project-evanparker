const Mini = require('../models/mini');

module.exports = {};

module.exports.getAllMinis = async () => {
  // todo: pagination
  return await Mini.find();
}

module.exports.getMiniById = async ( id ) => {
  return await Mini.findOne({_id: id});
}

module.exports.getMinisByUserId = async ( userId ) => {
  // todo: pagination
  return await Mini.find({userId});
}

module.exports.createMini = async ( miniObj ) => {
  return await Mini.create(miniObj);
}

module.exports.updateMini = async ( id, miniObj ) => {
  return await Mini.findOneAndUpdate({_id: id}, miniObj);
}

module.exports.deleteMini = async ( id ) => {
  return await Mini.findOneAndDelete({_id: id});
}
