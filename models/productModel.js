const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'products';

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

const update = async ({ id, ...documentWithoutId }) => {
  if (!ObjectId.isValid(id)) return false;

  const updatedDocument = (await connection())
    .collection(collection)
    .updateOne(
      { _id: ObjectId(id) },
      { $set: documentWithoutId },
    );

  return updatedDocument;
};

const remove = async (id) => (
  await connection())
    .collection(collection)
    .deleteOne({ _id: ObjectId(id) });

module.exports = {
  create,
  find,
  findById,
  update,
  remove,
};
