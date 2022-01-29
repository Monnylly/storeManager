require('dotenv').config();
const connection = require('./connection');

const getAll = async () => {
  const [product] = await connection.execute('SELECT * FROM products');

  return product;
};

const createModel = async (name, quantity) => {
  const [product] = await connection
   .execute('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity]);
  return {
    id: product.insertId,
    name,
    quantity,
  };
};

const getByName = async (name) => {
 const [[product]] = await connection.execute('SELECT  * FROM products WHERE name = ?', [name]);
 return product;
};

module.exports = { createModel, getAll, getByName };
