// ===== LOGIN FUNCTION =====
async function login(event) {
  event.preventDefault(); // Prevent form reload

  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  let errorBox = document.getElementById("error");

  // Create error box dynamically if not found
  if (!errorBox) {
    errorBox = document.createElement("div");
    errorBox.id = "error";
    errorBox.style.color = "red";
    errorBox.style.marginTop = "10px";
    document.getElementById("loginForm").appendChild(errorBox);
  }

  // Clear previous errors
  errorBox.innerText = "";

  if (!username || !password) {
    errorBox.innerText = "⚠️ Please enter both username and password.";
    return;
  }

  // === Static user data (can be replaced with your API later) ===
  const users = [
    {
      username: "harun",
      password: "harun123",
      records: 12,
      balance: 48.5,
      pricePerRecord: 0.4,
      savedData: ["Harun Data 1", "Harun Data 2", "Harun Record 3"]
    },
    {
      username: "sumon",
      password: "sumon123",
      records: 7,
      balance: 28.0,
      pricePerRecord: 0.4,
      savedData: ["Sumon Record 1", "Sumon Record 2"]
    }
  ];

  // === Find user ===
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } else {
    errorBox.innerText = "❌ Invalid username or password.";
  }
}

// ===== Attach Event Listener =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) form.addEventListener("submit", login);
});
