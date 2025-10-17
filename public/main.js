// ===== LOGIN FUNCTION =====
async function login(event) {
  event.preventDefault(); // Prevent page reload

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  let errorBox = document.getElementById("error");

  // create error box dynamically if not found
  if (!errorBox) {
    errorBox = document.createElement("div");
    errorBox.id = "error";
    errorBox.style.color = "red";
    errorBox.style.marginTop = "10px";
    document.getElementById("loginForm").appendChild(errorBox);
  }

  // clear old error
  errorBox.innerText = "";

  if (!username || !password) {
    errorBox.innerText = "⚠️ Please enter both username and password.";
    return;
  }

  try {
    const response = await fetch("https://mydeshboardwork-new.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Save logged in user data to local storage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard page
      window.location.href = "dashboard.html";
    } else {
      errorBox.innerText = "❌ Invalid username or password.";
    }
  } catch (err) {
    console.error("Login error:", err);
    errorBox.innerText = "🚨 Server error! Please try again later.";
  }
}

// ===== Attach Event Listener =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) form.addEventListener("submit", login);
});
