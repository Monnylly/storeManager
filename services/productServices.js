require('dotenv').config();

const productsModel = require('../models/productsModel');
// const { productNotFound } = require('../middlewares/validationsMiddlewars');
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

const updateProduct = async (id, name, quantity) => {
  const product = await productModel.getById(id);
  if (!product) {
 return {
    status: 404,
    message: 'Product not found',
  }; 
}
  await productModel.updateProduct(id, name, quantity);
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const product = await productModel.getById(id);
  if (!product) {
 return {
    status: 404,
    message: 'Product not found',
  }; 
}
  await productsModel.deleteProduct(id);
};

module.exports = { 
  getAll,
  createService,
  getById,
  updateProduct,
  deleteProduct,
};