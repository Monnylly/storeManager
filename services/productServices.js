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

const getById = async (id) => {
  const productId = await productModel.getById(id);
  return productId;
};

module.exports = { 
  getAll,
  createService,
  getById,
};