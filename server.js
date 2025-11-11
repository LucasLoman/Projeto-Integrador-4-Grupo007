
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataPath = path.join(__dirname, 'data.json');

app.post('/dados', (req, res) => {
  let current = [];
  if (fs.existsSync(dataPath)) current = JSON.parse(fs.readFileSync(dataPath));
  current.push({ ...req.body, timestamp: Date.now() });
  fs.writeFileSync(dataPath, JSON.stringify(current, null, 2));
  res.json({ ok: true });
});

app.get('/historico', (req, res) => {
  if (!fs.existsSync(dataPath)) return res.json([]);
  res.json(JSON.parse(fs.readFileSync(dataPath)));
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
