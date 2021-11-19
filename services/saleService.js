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

const find = async () => saleModel.find();

const findById = async (id) => {
  const foundSale = await saleModel.findById(id);
  if (!foundSale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return foundSale; 
};

const update = async (id, sale) => {
  const validatedQuantity = validateQuantity(sale[0].quantity);

  if (validatedQuantity) return validatedQuantity;
  
  return saleModel.update(id, sale);
};

module.exports = {
  create,
  find,
  findById,
  update,
  // remove,
};