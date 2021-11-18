const connection = require('./connection');

const collection = 'products';

const create = async (document) => (
  await connection())
    .collection(collection)
    .insertOne(document);

module.exports = {
  create,
};