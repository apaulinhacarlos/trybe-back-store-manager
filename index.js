const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', () => console.log('Metodo post'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
