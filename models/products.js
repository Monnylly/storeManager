const connection = require('./connection');

const insertProduct = async (name, quantity) => {
  const [result] = await connection
    .execute('INSERT INTO products name = ? quantity = ?', [name, quantity]);

  return result;
};

module.exports = insertProduct;