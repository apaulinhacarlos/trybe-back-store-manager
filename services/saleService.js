const saleModel = require('../models/saleModel');
const { validateQuantity } = require('./salesUtils');

const create = async (sales) => {
  const errors = [];
  const mappedSales = await sales.map((item) => {
    const validatedQuantity = validateQuantity(item.quantity);
    if (validatedQuantity) errors.push(validatedQuantity);
    return item;
  });

  if (errors.length > 0) return errors[0];

  return saleModel.create({ itensSold: mappedSales });
};

module.exports = {
  create,
  // find,
  // findById,
  // update,
  // remove,
};