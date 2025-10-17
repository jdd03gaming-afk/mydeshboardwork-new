// ===== IMPORTS =====
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ===== LOGIN API =====
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  try {
    const users = JSON.parse(
      fs.readFileSync(path.join(__dirname, "public", "users.json"))
    );
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===== USER DATA API =====
app.get("/api/userdata", (req, res) => {
  try {
    const users = JSON.parse(
      fs.readFileSync(path.join(__dirname, "public", "users.json"))
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to read user data" });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
