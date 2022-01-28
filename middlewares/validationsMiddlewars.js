require('dotenv').config();
const productsModel = require('../models/productsModel');
// const { validationsShemas } = require('../schemas/validationsSchemas');

const errors = {
  nameLength: '"name" length must be at least 5 characters long',
  nameNotExist: '"name" is required',
  nameExist: 'Product already exists',
  quantValid: '"quantity" is required',
  quantType: '"quantity" must be a number larger than or equal to 1',
};

const blank = (value) => (!value);
const string = (value) => (typeof value === 'string');
const isLength = (value, min) => (value.length < min);

const badRequest = 400;
// const codeOk = 201;
const unprocessable = 422;
const conflict = 409;

const validationName = (req, res, next) => {
  const { name } = req.body;
  if (blank(name)) return res.status(badRequest).message({ message: errors.nameNotExist });
  if (isLength(name, 5)) {
    return res.status(unprocessable).message({ message: errors.nameLength });
  } 
  next();
};

const nameEqual = async (req, res, next) => {
  const { name } = req.body;
  if (await name === productsModel.getAll.name) {
    return res.status(conflict).message({ message: errors.nameExist });
  }
  next();
};

const validQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (blank(quantity) && quantity > 0) {
    return res.status(badRequest).message({ message: errors.quantValid });
    }
  next();
};

const validTypeQuant = (req, res, next) => {
  const { quantity } = req.body;
  if (Number(quantity) < 1 || string(quantity)) {
    return res.status(unprocessable).message({ message: errors.quantType });
    }
  next();
};

// const nameQuantity = (req, res) => {
//   const { name, quantity } = req.body;
//   const productCreate = productsModel.getAll(name, quantity);
//   return res.status(codeOk).message({ message: productCreate });
// };

module.exports = {
  validationName,
  nameEqual,
  validQuantity,
  validTypeQuant,
  // nameQuantity,
};
