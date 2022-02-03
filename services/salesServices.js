require('dotenv').config();

const salesModel = require('../models/salesModel');

const { validSale,
  validUpdate } = require('../schemas/validationShemas');

const serialize = (sales) => sales.map((sale) => ({
  productId: sale.product_id,
  quantity: sale.quantity,
}));

const getAll = async () => salesModel.getAll();

const create = async (sales) => {
  const isValid = validSale(sales);

  if (isValid.error) return isValid;

  const salesNew = serialize(sales);

  const id = await salesModel.create(salesNew);

  return { id, itemsSold: [...sales] };
};

const getById = async (id) => {
  const productExist = await salesModel.getById(id);
  if (productExist.length === 0) return { error: { code: 404, message: 'Sale not found' } };
  
  return productExist;
};

const update = async (saleId, body) => {
  const validUp = validUpdate(body);

  if (validUp.error) return validUp;

  await salesModel.update(saleId, body);

  return { saleId, itemUpdated: body };
};

module.exports = {
  create,
  getAll, 
  getById,
  update,
};