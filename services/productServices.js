require('dotenv').config();

const productsModel = require('../models/productsModel');
// const { productNotFound } = require('../middlewares/validationsMiddlewars');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const createService = async (name, quantity) => {
  const resp = await productsModel.getByName(name);
  if (resp !== undefined) {
    return { re: 'exist' };
  }
  const product = await productsModel.createModel(name, quantity);
  return product;
};

const getById = async (id) => {
  const productId = await productsModel.getById(id);
  return productId;
};

const updateProduct = async (id, name, quantity) => {
  const product = await productsModel.getById(id);
  console.log(product);
  if (!product) {
 return {
    status: 404,
    message: 'Product not found',
  }; 
}
  await productsModel.updateProduct(id, name, quantity);
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const product = await productsModel.getById(id);
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