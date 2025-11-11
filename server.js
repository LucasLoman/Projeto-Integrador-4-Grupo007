const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let dbFile = './dados.json';

app.post('/api/energia', (req, res) => {
  const dado = req.body;
  console.log('Recebido:', dado);

  let historico = JSON.parse(fs.readFileSync(dbFile));
  historico.push(dado);
  fs.writeFileSync(dbFile, JSON.stringify(historico, null, 2));

  res.json({ status: 'ok' });
});

app.get('/api/historico', (req, res) => {
  const historico = JSON.parse(fs.readFileSync(dbFile));
  res.json(historico);
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
