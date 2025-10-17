// ====== Login Function ======
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (!username || !password) {
    error.innerText = "Please enter both username and password.";
    return;
  }

  try {
    const response = await fetch("https://mydeshboardwork-new.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      // Save user info in local storage
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
      error.innerText = data.message || "Invalid username or password.";
    }
  } catch (err) {
    console.error(err);
    error.innerText = "Server error. Please try again later.";
  }
}

// ====== Auto Redirect if Already Logged In ======
window.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");
  if (user && window.location.pathname.includes("index.html")) {
    window.location.href = "dashboard.html";
  }
});
