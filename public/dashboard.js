// ===== DASHBOARD PAGE =====

// Dummy user data (later তুমি চাওলে এগুলো database বা Firebase এ নিতে পারো)
const userData = {
  sumon: {
    username: "sumon",
    totalRecords: 250,
    balance: 1200,
    pricePerRecord: 5,
    records: [
      "Record #1 - Login Success",
      "Record #2 - Data Synced",
      "Record #3 - Payment Received"
    ]
  },
  harun: {
    username: "harun",
    totalRecords: 400,
    balance: 3200,
    pricePerRecord: 8,
    records: [
      "Record #1 - API Connected",
      "Record #2 - New Client Added",
      "Record #3 - Withdraw Success"
    ]
  }
};

// ===== PAGE LOAD =====
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("⚠️ Please login first!");
    window.location.href = "index.html";
    return;
  }

  // Show welcome
  document.getElementById("welcomeUser").textContent = `Welcome, ${user.username}!`;

  // Get user data
  const data = userData[user.username];
  if (!data) {
    alert("User data not found!");
    return;
  }

  // Update dashboard stats
  document.getElementById("totalRecords").textContent = data.totalRecords;
  document.getElementById("balance").textContent = data.balance + "৳";
  document.getElementById("pricePerRecord").textContent = data.pricePerRecord + "৳";

  // Show saved records
  const list = document.getElementById("recordList");
  list.innerHTML = "";
  data.records.forEach((rec) => {
    const li = document.createElement("li");
    li.textContent = rec;
    list.appendChild(li);
  });
});

// ===== LOGOUT FUNCTION =====
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
