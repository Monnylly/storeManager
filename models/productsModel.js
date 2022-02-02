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

const getById = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

const updateProduct = async (id, name, quantity) => { 
  await connection
   .execute('UPDATE products SET name = ?, quantity = ? WHERE id = ?', [name, quantity, id]);
};

const deleteProduct = async (id) => {
  const queryDelete = await connection
    .execute('DELETE FROM products WHERE id = ?;', [id]);
  return queryDelete;
};

module.exports = { createModel, getAll, getByName, getById, updateProduct, deleteProduct };
