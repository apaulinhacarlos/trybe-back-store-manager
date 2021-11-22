require('dotenv').config();
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/StoreManager`;
const DB_NAME = 'StoreManager';

let teste = null;

const connection = async () => {
  try {
    const ternary = !teste
    ? teste = (await MongoClient.connect(MONGO_DB_URL, OPTIONS)).db(DB_NAME)
    : teste;

    return ternary;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connection };