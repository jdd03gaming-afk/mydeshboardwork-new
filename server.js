const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'users.json')));
  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.json({ success: true, user });
  else res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.get('/api/userdata', (req, res) => {
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'users.json')));
  res.json(users);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
