require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { getAll, createController } = require('./controllers/productsController');
const { errorGeneric } = require('./middlewares/erroMiddlewares');

const {
  validationName,
  validQuantity,
  validTypeQuant,
} = require('./middlewares/validationsMiddlewars');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAll);

app.post('/products', validationName, 
validQuantity, validTypeQuant, createController);

app.use(errorGeneric);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
