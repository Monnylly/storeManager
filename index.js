require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { 
  getAll, 
  createController,
  getById, 
  updateProdut, 
  deleteProduct } = require('./controllers/productsController');
const { errorGeneric } = require('./middlewares/erroMiddlewares');

const salesController = require('./controllers/salesController');

const {
  validationName,
  validQuantity,
  validTypeQuant,
  // productNotFound,
} = require('./middlewares/validationsMiddlewars');

// const { 
//   validatProductId,
//   validationQuantity,
// } = require('./middlewares/salesMiddlewars');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAll);

app.get('/products/:id', getById);

app.post('/products', validationName, 
validQuantity, validTypeQuant, createController);

app.put('/products/:id', validationName, validTypeQuant, updateProdut);

app.delete('/products/:id', deleteProduct);

app.get('/sales', salesController.getAll);
app.post('/sales', salesController.create);
app.get('/sales/:id', salesController.getById);
app.put('/sales/:id', salesController.update);

app.use(errorGeneric);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
