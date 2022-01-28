require('dotenv').config();
const { validationsShemas } = require('../schemas/validationsSchemas');

const validationCreate = (req, res, next) => {
  const { name, quantity } = req.body;
  const validCreat = validationsShemas.validations(name, quantity);

  if (validCreat.message) {
 return res.status(validCreat.satus)
  .message({ message: validCreat.message }); 
}
  next();
};

module.exports = {
  validationCreate,
};
