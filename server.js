const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors()); // ✅ Allow all origins (fixes login fetch)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Login API
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
    res.status(500).json({ success: false, message: "Server error reading users.json" });
  }
});

// ✅ User data (optional)
app.get('/api/userdata', (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'users.json')));
    res.json(users);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error reading users.json" });
  }
});

// ✅ Serve HTML
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
