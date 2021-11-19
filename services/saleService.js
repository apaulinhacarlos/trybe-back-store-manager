const saleModel = require('../models/saleModel');
const { validateQuantity } = require('./salesUtils');
const productModel = require('../models/productModel');

const create = async (sales) => {
  const errors = [];
  const mappedSales = await sales.map((item) => {
    const validatedQuantity = validateQuantity(item.quantity);
    if (validatedQuantity) errors.push(validatedQuantity);
    return item;
  });

  if (errors.length > 0) return errors[0];

  await productModel.updateBySale(mappedSales);
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
  
  // ESTOU AQUI!
  console.log(id, sale);
  // await productModel.updateBySale(mappedSales);
  return saleModel.update(id, sale);
};

const remove = async (id) => saleModel.remove(id);

const findByIdForRemove = async (id) => {
  const foundSale = await saleModel.findById(id);
  if (!foundSale) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }
  return foundSale; 
};

module.exports = {
  create,
  find,
  findById,
  update,
  remove,
  findByIdForRemove,
};