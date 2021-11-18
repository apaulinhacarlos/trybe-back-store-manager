const express = require('express');
const error = require('./middleware/error');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
// const PORT = 3001;

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', routes);

app.use(error);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
