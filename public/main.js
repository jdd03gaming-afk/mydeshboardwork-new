// ===== LOGIN FUNCTION =====
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("error");

  // clear old error
  if (errorBox) errorBox.innerText = "";

  if (!username || !password) {
    if (errorBox) errorBox.innerText = "Please enter both username and password.";
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
      if (errorBox) errorBox.innerText = "❌ Invalid username or password.";
      else alert("❌ Invalid username or password.");
    }
  } catch (err) {
    console.error("Login error:", err);
    if (errorBox) errorBox.innerText = "Server error! Please try again later.";
    else alert("Server error! Please try again later.");
  }
}
