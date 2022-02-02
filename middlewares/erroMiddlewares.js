const errorGeneric = (err, _req, res, _next) => {
  res.status(err.code).json({ message: err.message });
};

module.exports = {
  errorGeneric,
};