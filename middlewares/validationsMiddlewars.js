require('dotenv').config();
// const { validationsShemas } = require('../schemas/validationsSchemas');

const errors = {
  nameLength: '"name" length must be at least 5 characters long',
  nameNotExist: '"name" is required',
  nameExist: 'Product already exists',
  quantValid: '"quantity" is required',
  quantType: '"quantity" must be a number larger than or equal to 1',
};

// const blank = (value) => (!value);
const string = (value) => (typeof value === 'string');
const isLength = (value, min) => (value.length < min);

const badRequest = 400;
// const codeOk = 201;
const unprocessable = 422;

const validationName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(badRequest).json({ message: errors.nameNotExist });
  if (isLength(name, 5)) {
    return res.status(unprocessable).json({ message: errors.nameLength });
  } 
  next();
};

const validQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity === undefined) {
    return res.status(badRequest).json({ message: errors.quantValid });
    }
  next();
};

const validTypeQuant = (req, res, next) => {
  const { quantity } = req.body;
  if (Number(quantity) < 1 || string(quantity)) {
    return res.status(unprocessable).json({ message: errors.quantType });
    }
  next();
};

module.exports = {
  validationName,
  validQuantity,
  validTypeQuant,
  // productNotFound,
  // nameQuantity,
};
