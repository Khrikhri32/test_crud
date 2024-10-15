const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://127.0.0.1:${PORT}`);
});
