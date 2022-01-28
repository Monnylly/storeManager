const errorGeneric = (err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
};

module.exports = {
  errorGeneric,
};