const connection = require('./connection');

const collection = 'products';

const find = async (document, filters) => (
  await connection())
    .collection(collection)
    .find(filters).toArray();

const create = async (document) => (
  await connection())
    .collection(collection)
    .insertOne(document);

module.exports = {
  find,
  create,
};
