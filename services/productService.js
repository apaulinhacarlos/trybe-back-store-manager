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

const find = async () => productModel.find();

const findById = async (id) => {
  const found = await productModel.findById(id);
  if (!found) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return found; 
};
 
const update = async (product) => {
  const name = validateName(product.name);
  const quantity = validateQuantity(product.quantity);

  if (name) return name;
  if (quantity) return quantity;

  return productModel.update(product);
};

module.exports = {
  create,
  find,
  findById,
  update,
};
