// ====== Load Dashboard Data ======
window.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const welcome = document.getElementById("welcome");
  const totalRecords = document.getElementById("totalRecords");
  const balance = document.getElementById("balance");
  const recordList = document.getElementById("recordList");

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  welcome.textContent = `Welcome, ${user.username}`;
  balance.textContent = user.balance || 0;

  try {
    const res = await fetch("https://mydeshboardwork-new.onrender.com/api/userdata");
    const allUsers = await res.json();
    const currentUser = allUsers.find(u => u.username === user.username);

    if (currentUser && currentUser.records) {
      totalRecords.textContent = currentUser.records.length;
      recordList.innerHTML = currentUser.records
        .map(r => `<li>${r}</li>`)
        .join("");
    } else {
      totalRecords.textContent = 0;
      recordList.innerHTML = "<li>No records found.</li>";
    }
  } catch (err) {
    console.error(err);
    recordList.innerHTML = "<li>Failed to load records.</li>";
  }
});

// ====== Logout Function ======
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
