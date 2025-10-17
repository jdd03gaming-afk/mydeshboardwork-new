async function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorDiv = document.getElementById('error');

  errorDiv.innerText = ""; // Clear previous errors

  if (!username || !password) {
    errorDiv.innerText = "Please enter both username and password.";
    return;
  }

  try {
    const response = await fetch('https://mydeshboardwork-new.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = 'dashboard.html';
    } else {
      errorDiv.innerText = data.message || "Invalid username or password.";
    }
  } catch (err) {
    console.error("Error:", err);
    errorDiv.innerText = "Server not responding. Please try again later.";
  }
}
