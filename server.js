const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===== Login API =====
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  try {
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'users.json')));
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===== Dashboard Data (Optional) =====
app.get('/api/userdata', (req, res) => {
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'users.json')));
  res.json(users);
});

// ===== Serve Frontend =====
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
