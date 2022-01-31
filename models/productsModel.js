require('dotenv').config();
// const { updateProdut } = require('../controllers/productsController');
// const { updateProduct } = require('../services/productServices');
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

const getById = async (id) => {
  const [[productId]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return productId;
};

const updateProduct = async (id, name, quantity) => { 
  const [product] = await connection
   .execute('UPDATE products SET name = ?, quantity = ? WHERE id = ?', [name, quantity, id]);
  return product;
  };

  // const update = async (id, name, quantity) => {
  //   const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?;';
  //   await connection.execute(query, [name, quantity, id]);
  // };

module.exports = { createModel, getAll, getByName, getById, updateProduct };
