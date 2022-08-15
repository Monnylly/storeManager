require('dotenv').config();

const blankQuant = (sales) => sales.some(({ quantity }) => !quantity && quantity !== 0);

const blankId = (sales) => sales.some((product) => !product.product_id);

const blankIdProd = ([{ product_id: productId }]) => !productId;

const isQuantityValid = (sales) => sales.some(({ quantity }) => !(+quantity) || quantity < 1);

const validSale = (sales) => {
  switch (true) {
    case blankId(sales): return { error: { code: 400, message: '"product_id" is required' } };
    case blankQuant(sales): return { error: { code: 400, message: '"quantity" is required' } };
    case isQuantityValid(sales): return {
      error: { code: 422, message: '"quantity" must be a number larger than or equal to 1' },
    };
    default: return false;
  }
};

const validUpdate = (body) => {
  switch (true) {
    case blankIdProd(body): return { error: { code: 400, message: '"product_id" is required' } };
    case blankQuant(body): return { error: { code: 400, message: '"quantity" is required' } };
    case isQuantityValid(body): return {
      error: { code: 422, message: '"quantity" must be a number larger than or equal to 1' },
    };
    default: return false;
  }
};

module.exports = {
  validSale,
  validUpdate,
};
