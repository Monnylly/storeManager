require('dotenv').config();
const create = require('../models/productsModel');

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
const codeOk = 201;
const unprocessable = 422;
const conflict = 409;

const validateName = (name) => {
  if (blank(name)) return { status: badRequest, message: errors.nameNotExist };
  if (isLength(name, 5)) {
    return { status: unprocessable, message: errors.nameLength };
  } 
  };
  
  const nameEqual = (name) => {
    if (name === create.name) {
      return { status: conflict, message: errors.nameExist };
    }
  };
  
  const validQuantity = (quantity) => {
    if (blank(quantity) && quantity > 0) {
      return {
        status: badRequest,
        message: errors.quantValid,
      };
    }
  };
  
  const validTypeQuant = (quantity) => {
    if (Number(quantity) < 1 || string(quantity)) {
      return {
        status: unprocessable,
        message: errors.quantType,
      };
    }
  };
   
  const nameQuantity = async (name, quantity) => {
    const productCreate = await create(name, quantity);
    return { status: codeOk, message: productCreate };
  };

    module.exports = {
      validateName,
      validQuantity,
      nameQuantity,
      nameEqual,
      validTypeQuant,
    };

    // const validations = async (name, quantity) => {
//   if (blank(name)) return { status: badRequest, message: errors.nameNotExist };
//   if (isLength(name, 5)) { return { status: unprocessable, message: errors.nameLength };}
//   if (await name === create.name) {return { status: conflict, message: errors.nameExist }; }
//   if (blank(quantity) && quantity > 0) {
//     return { status: badRequest,message: errors.quantValid,};};
//   if (Number(quantity) < 1 || string(quantity)) { return { status: unprocessable, message: errors.quantType,};};
//   if (name && quantity) { return  { id, status: codeOk, message: productCreate };}
//   else if { return {} };  
// };

// const validations = async (name, quantity) => {
// //   validateName(name);
// //   nameQuantity(name, quantity);
// //   nameEqual(name);
// //   validTypeQuant(quantity);
// //   validQuantity(quantity);
// // };

// module.exports = { validations };