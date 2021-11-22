const productModel = require('../models/productModel');

const stockProblemError = {
  err: {
    statusCode: 404,
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

const invalidDataError = {
  err: {
    statusCode: 422,
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const validateQuantity = (quantity) => {
  if (quantity < 0 || quantity === 0 || typeof quantity !== 'number') {
    return invalidDataError;
  }
  return false;
};

const validateProduct = async ({ productId, quantity }) => {
  const productFound = await productModel.findById(productId);
  if (!productFound) {
    return invalidDataError;
  }

  if (productFound.quantity < quantity) {
    return stockProblemError;
  }

  return false;
};

module.exports = {
  validateQuantity,
  validateProduct,
};
