require('dotenv').config();

const salesServices = require('../services/salesServices');

const getAll = async (_req, res) => {
  const sales = await salesServices.getAll();

  return res.status(200).json(sales);
};

const create = async (req, res, next) => {
  const sales = await salesServices.create(req.body);

  if (sales.error) return next(sales.error);

  return res.status(201).json(sales);
};

  const getById = async (req, res, next) => {
  const { id } = req.params;

  const sales = await salesServices.getById(id);

  if (sales.error) return next(sales.error);

  return res.status(200).json(sales);
};

const update = async (req, res, next) => {
  const { id } = req.params;

  const sales = await salesServices.update(+id, req.body);

  if (sales.error) return next(sales.error);

  return res.status(200).json(sales);
};

module.exports = { 
  create,
  getAll,
  getById,
  update,
};