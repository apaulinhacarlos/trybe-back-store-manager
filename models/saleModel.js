// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'sales';

const create = async (document) => (
  await connection())
  .collection(collection)
  .insertOne(document);

module.exports = {
  create,
  // find,
  // findById,
  // update,
  // remove,
};
