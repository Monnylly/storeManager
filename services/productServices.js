require('dotenv').config();

const productModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productModel.getAll();

  return products;
};

const createService = async (name, quantity) => {
  const resp = await productModel.getByName(name);
  if (resp !== undefined) {
    return { re: 'exist' };
  }
  const product = await productModel.createModel(name, quantity);
  return product;
};

module.exports = { 
  getAll,
  createService,
};