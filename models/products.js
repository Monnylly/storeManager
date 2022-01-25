const connection = require('./connection');

const create = async (name, quantity) => {
  const [result] = await connection
    .execute('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity]);

  return result;
};

module.exports = create;
