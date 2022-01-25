const express = require('express');

const router = express.Router();

const create = require('../models/products');

router.get('/', async (_req, res) => {
  const product = await create.getAll();

  res.status(200).json(product);
});

module.exports = router;