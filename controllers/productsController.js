require('dotenv').config();
const { productServices } = require('../services/productServices');

const OK = 200;
const codeOk = 201;

const getAll = async (_req, res, next) => {
  try {
    const productsServ = await productServices.getAll();
    return res.status(OK).json(productsServ);
  } catch (err) {
    next(err);
  }
};

const createController = async (req, res, next) => {
  const { name, quantity } = req.body;
  try {
    const product = await productServices.createService({ name, quantity });

    if (product.status) {
      return res.status(product.status).json({ message: product.message });
    }

    return res.status(codeOk).json({ id: product.id, name, quantity });
  } catch (err) {
    next(err);
  }
};

module.exports = { createController, getAll };
