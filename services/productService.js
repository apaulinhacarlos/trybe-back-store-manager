const productModel = require('../models/productModel');
const {
  validateName,
  validateQuantity,
  validateNameInDB,
} = require('./utils');

const create = async (product) => {
  const name = validateName(product.name);
  const quantity = validateQuantity(product.quantity);
  const nameInDB = await validateNameInDB(product.name);

  if (name) return name;
  if (quantity) return quantity;
  if (nameInDB) return nameInDB;

  return productModel.create(product);
};
 
module.exports = {
  create,
};
