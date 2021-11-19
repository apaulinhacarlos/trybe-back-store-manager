const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'sales';

const create = async (document) => (
  await connection())
  .collection(collection)
  .insertOne(document);

const find = async () => (
  await connection())
    .collection(collection)
    .find().toArray();

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const foundDocument = (await connection())
    .collection(collection)
    .findOne({ _id: ObjectId(id) });

  return foundDocument;
};

module.exports = {
  create,
  find,
  findById,
  // update,
  // remove,
};
