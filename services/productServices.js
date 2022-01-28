require('dotenv').config();

const productModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productModel.getAll();

  return products;
};

const createService = async (req, res) => {
  const product = await productModel.createModel();
  res.status(200).json(product);
};

module.exports = { 
  createService,
  getAll,
};