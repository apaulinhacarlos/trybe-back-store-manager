const productModel = require('../models/productModel');

const validateName = (name) => {
  if (name.length < 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  return false;
};

const validateQuantity = (quantity) => {
  if (quantity < 0 || quantity === 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return false;
};

const validateNameInDB = async (product) => {
  const { name } = product;
  const findDB = await productModel.find(name);
  const result = findDB.find((item) => item.name.toUpperCase().includes(name.toUpperCase()));

  if (result) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return false;
};

const create = async (product) => {
  const name = validateName(product.name);
  const quantity = validateQuantity(product.quantity);
  const nameInDB = await validateNameInDB(product);

  if (name) return name;
  if (quantity) return quantity;
  if (nameInDB) return nameInDB;

  return productModel.create(product);
};
 
module.exports = {
  create,
};
