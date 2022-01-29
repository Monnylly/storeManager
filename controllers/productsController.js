require('dotenv').config();
const productServices = require('../services/productServices');

const OK = 200;

const getAll = async (req, res, next) => {
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

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const productid = await productServices.getById(id);
    if (productid) {
      return res.status(200).json(productid);
    }
    return res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createController, getAll, getById };
