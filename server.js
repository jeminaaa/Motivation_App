const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const quotes = JSON.parse(fs.readFileSync(path.join(__dirname, 'qoutes.json'), 'utf8'));

app.get('/api/motivation', (req, res) => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(random);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
