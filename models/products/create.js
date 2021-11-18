const connection = require('../connection');

const createModel = async (collection, document) => (
  await connection())
    .collection(collection)
    .insertOne(document);

module.exports = createModel;