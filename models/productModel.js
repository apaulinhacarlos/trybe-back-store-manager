const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const collection = 'products';

const create = async (document) => (
  await mongoConnection.connection())
  .collection(collection)
  .insertOne(document);
  
const find = async () => (
  await mongoConnection.connection())
    .collection(collection)
    .find().toArray();

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const foundDocument = (await mongoConnection.connection())
    .collection(collection)
    .findOne({ _id: ObjectId(id) });

  return foundDocument;
};

const update = async ({ id, ...documentWithoutId }) => {
  if (!ObjectId.isValid(id)) return false;

  const updatedDocument = (await mongoConnection.connection())
    .collection(collection)
    .updateOne(
      { _id: ObjectId(id) },
      { $set: documentWithoutId },
    );

  return updatedDocument;
};

const remove = async (id) => (
  await mongoConnection.connection())
    .collection(collection)
    .deleteOne({ _id: ObjectId(id) });

const updateBySale = async (document) => {
  const updatedDocument = (await mongoConnection.connection())
    .collection(collection)
    .updateOne(
      { _id: ObjectId(document[0].productId) },
      { $inc: { quantity: -document[0].quantity } },
    );

  return updatedDocument;
};

const updateBySaleRemoved = async (document) => {
  const updatedDocument = (await mongoConnection.connection())
    .collection(collection)
    .updateOne(
      { _id: ObjectId(document.productId) },
      { $inc: { quantity: document.quantity } },
    );

  return updatedDocument;
};

module.exports = {
  create,
  find,
  findById,
  update,
  remove,
  updateBySale,
  updateBySaleRemoved,
};
