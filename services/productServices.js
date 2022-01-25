const express = require('express');

const router = express.Router();

const insertProduct = require('../models/products');

router.get('/', async (_req, res) => {
  const product = await insertProduct.getAll();

  res.status(200).json(product);
});

module.exports = router;