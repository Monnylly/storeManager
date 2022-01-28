module.exports = (quantity) => {
  if (!quantity && quantity > 0) {
    return {
      status: 400,
      message: '"quantity" is required',
    };
  }
  if (Number(quantity) < 1 || Number.toString(Number(quantity))) {
    return {
      status: 422,
      message: '"quantity" must be a number larger than or equal to 1',
    };
  }
};