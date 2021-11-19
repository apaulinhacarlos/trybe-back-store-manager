const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productService.create({ name, quantity });

    if (newProduct.err && newProduct.err.code === 'invalid_data') {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: newProduct.err });
    }

    return res.status(StatusCodes.CREATED).json(newProduct.ops[0]);
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const productList = await productService.find();

    if (!productList) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: productList.err });
    }

    return res.status(StatusCodes.OK).json({ products: productList });
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundProduct = await productService.findById(id);

    if (foundProduct.err && foundProduct.err.code === 'invalid_data') {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: foundProduct.err });
    }

    return res.status(StatusCodes.OK).json(foundProduct);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const updatedProduct = await productService.update({ id, name, quantity });

    if (updatedProduct.err && updatedProduct.err.code === 'invalid_data') {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: updatedProduct.err });
    }

    const foundProduct = await productService.findById(id);
    return res.status(StatusCodes.OK).json(foundProduct);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundProduct = await productService.findById(id);

    if (foundProduct.err && foundProduct.err.code === 'invalid_data') {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: foundProduct.err });
    }

    await productService.remove(id);
    return res.status(StatusCodes.OK).json(foundProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  find,
  findById,
  update,
  remove,
};
