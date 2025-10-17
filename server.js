// ==========================
// server.js (Render Ready)
// ==========================

// Import required modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware setup
app.use(cors()); // allow cross-origin requests
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --------------------------
// 🔐 LOGIN API
// --------------------------
app.post('/api/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const usersPath = path.join(__dirname, 'public', 'users.json');

    if (!fs.existsSync(usersPath)) {
      return res.status(500).json({ success: false, message: 'Users file not found' });
    }

    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: 'Server error occurred' });
  }
});

// --------------------------
// 📊 USER DATA API
// --------------------------
app.get('/api/userdata', (req, res) => {
  try {
    const usersPath = path.join(__dirname, 'public', 'users.json');

    if (!fs.existsSync(usersPath)) {
      return res.status(500).json({ success: false, message: 'Users file missing' });
    }

    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    res.json(users);
  } catch (err) {
    console.error('Userdata Error:', err);
    res.status(500).json({ success: false, message: 'Server error occurred' });
  }
});

// --------------------------
// 🏠 DEFAULT ROUTE (homepage)
// --------------------------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --------------------------
// 🚀 START SERVER
// --------------------------
app.listen(PORT, () => {
  console.log(`✅ Server running successfully on port ${PORT}`);
});
