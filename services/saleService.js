const saleModel = require('../models/saleModel');
const { validateQuantity, validateProduct } = require('./salesUtils');
const productModel = require('../models/productModel');

const create = async (sales) => {
  const error = [];
  
  const mappedSales = await Promise.all(sales.map(async (item) => {
    const validatedQuantity = validateQuantity(item.quantity);
    if (validatedQuantity) error.push(validatedQuantity);
    const productFound = await validateProduct(item);
    if (productFound) error.push(productFound);
    return item;
  }));

  if (error.length > 0) return error[0];

  await productModel.updateBySale(mappedSales);
  return saleModel.create({ itensSold: mappedSales });
};

const find = async () => saleModel.find();

const findById = async (id) => {
  const saleFound = await saleModel.findById(id);
  if (!saleFound) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return saleFound; 
};

const update = async (id, sale) => {
  const validatedQuantity = validateQuantity(sale[0].quantity);

  if (validatedQuantity) return validatedQuantity;
  
  return saleModel.update(id, sale);
};

const remove = async (id, sale) => {
  await productModel.updateBySaleRemoved(sale.itensSold[0]);
  return saleModel.remove(id);
};

const findByIdForRemove = async (id) => {
  const saleFound = await saleModel.findById(id);
  if (!saleFound) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }
  return saleFound; 
};

module.exports = {
  create,
  find,
  findById,
  update,
  remove,
  findByIdForRemove,
};