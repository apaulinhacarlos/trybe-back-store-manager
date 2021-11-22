const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const collection = 'sales';

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

const update = async (id, document) => {
  if (!ObjectId.isValid(id)) return false;

  const updatedDocument = (await mongoConnection.connection())
    .collection(collection)
    .updateOne(
      { _id: ObjectId(id) },
      { $set: {
          itensSold: document,
        },
      },
    );

  return updatedDocument;
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const removedDocument = (await mongoConnection.connection())
    .collection(collection)
    .deleteOne({ _id: ObjectId(id) });

  return removedDocument;
};

module.exports = {
  create,
  find,
  findById,
  update,
  remove,
};
