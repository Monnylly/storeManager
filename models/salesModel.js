require('dotenv').config();
const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT sp.sale_id AS saleId, s.date, sp.product_id, sp.quantity '
  + ' FROM sales_products AS sp INNER JOIN sales AS s WHERE sp.sale_id = s.id';

  const [sales] = await connection.execute(query);

  return sales;
};

const create = async (sales) => {
  const [{ insertId }] = await connection
  .execute('INSERT INTO sales (date) VALUES (NOW())');
  
  const salesMap = sales.map(({ productId, quantity }) => connection
  .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', 
   [insertId, productId, quantity]));

  await Promise.all(salesMap);
  return insertId;
};

const getById = async (id) => {
  const query = 'SELECT s.date, sp.product_id, sp.quantity '
  + ' FROM sales_products AS sp INNER JOIN sales AS s '
  + 'ON sp.sale_id = s.id WHERE id = ?';

  const [saleData] = await connection.execute(query, [+id]);

  // if (saleData === []) return true;

  return saleData;
};

const update = async (saleId, body) => {
  const query = 'UPDATE sales_products SET quantity = ?, product_id = ? '
  + 'WHERE sale_id = ?';

  const updatePromises = body.map(async ({ product_id: productId, quantity }) => 
   connection.execute(query, [quantity, productId, saleId]));

  return Promise.all(updatePromises);
};

module.exports = { create, getAll, getById, update };