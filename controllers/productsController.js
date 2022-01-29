require('dotenv').config();
const productServices = require('../services/productServices');

const OK = 200;

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
    const product = await productServices.createService(name, quantity);
    if (product.re === 'exist') {
      return res.status(409).json({ message: 'Product already exists' });
    }
    return res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = { createController, getAll };
