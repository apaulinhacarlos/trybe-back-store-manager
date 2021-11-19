const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'products';

const create = async (document) => (
  await connection())
  .collection(collection)
  .insertOne(document);
  
const find = async (filters) => (
  await connection())
    .collection(collection)
    .find(filters).toArray();

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const product = (await connection())
    .collection(collection)
    .findOne({ _id: ObjectId(id) });

  return product;
};

const update = async (document) => {
  const { id, ...documentWithoutId } = document;
  if (!ObjectId.isValid(id)) return false;

  const product = (await connection())
    .collection(collection)
    .updateOne(
      { _id: ObjectId(id) },
      { $set: documentWithoutId },
    );

  return product;
};

module.exports = {
  create,
  find,
  findById,
  update,
};
