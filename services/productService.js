const productModel = require('../models/productModel');
const {
  validateName,
  validateQuantity,
  validateNameInDB,
} = require('./utils');

const create = async (product) => {
  const validatedName = validateName(product.name);
  const validatedQuantity = validateQuantity(product.quantity);
  const validatedNameInDB = await validateNameInDB(product.name);

  if (validatedName) return validatedName;
  if (validatedQuantity) return validatedQuantity;
  if (validatedNameInDB) return validatedNameInDB;

  return productModel.create(product);
};

const find = async () => productModel.find();

const findById = async (id) => {
  const foundProduct = await productModel.findById(id);
  if (!foundProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return foundProduct; 
};
 
const update = async (product) => {
  const validatedName = validateName(product.name);
  const validatedQuantity = validateQuantity(product.quantity);

  if (validatedName) return validatedName;
  if (validatedQuantity) return validatedQuantity;

  return productModel.update(product);
};

const remove = async (id) => productModel.remove(id);

module.exports = {
  create,
  find,
  findById,
  update,
  remove,
};
