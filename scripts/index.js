function showModal(type, title, message, buttons) {
  const overlay = document.getElementById("modal-overlay");
  const icon = document.getElementById("modal-icon");
  const titleEl = document.getElementById("modal-title");
  const messageEl = document.getElementById("modal-message");
  const actionsEl = document.getElementById("modal-actions");

  icon.className = `modal-icon ${type}`;
  icon.textContent = getModalIcon(type);
  titleEl.textContent = title;
  messageEl.textContent = message;
  actionsEl.innerHTML = "";

  buttons.forEach((button) => {
    const btn = document.createElement("button");
    btn.className = `modal-btn ${button.class}`;
    btn.textContent = button.text;
    btn.onclick = button.action;
    actionsEl.appendChild(btn);
  });

  overlay.classList.add("active");
}

function hideModal() {
  document.getElementById("modal-overlay").classList.remove("active");
}

function getModalIcon(type) {
  const icons = {
    success: "✅",
    warning: "⚠️",
    danger: "❌",
    info: "ℹ️",
  };
  return icons[type] || "ℹ️";
}

function showToast(type, message) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast show ${type}`;
  toast.innerHTML = `<span class='toast-icon'>${getModalIcon(
    type
  )}</span><span class='toast-message'>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}

function goToPage(url) {
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = url;
  }, 300);
}

window.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }
});
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
}
window.toggleTheme = toggleTheme;