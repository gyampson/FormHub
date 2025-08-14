document.addEventListener("DOMContentLoaded", function () {
  fetch("backend/read.php")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("entries-body");
      tbody.innerHTML = "";
      if (!Array.isArray(data) || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No entries found.</td></tr>';
        return;
      }
      data.forEach((entry, idx) => {
        const tr = document.createElement("tr");
        tr.style.animation = `fadeInUp 0.6s ease ${idx * 0.05}s both`;
        tr.innerHTML = `
                <td>${entry.id}</td>
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.message}</td>
                <td>
                  <a href="update_form.html?id=${entry.id}" class="action-btn action-edit">✏️ Edit</a>
                  <button onclick="confirmDelete(${entry.id})" class="action-btn action-delete">🗑️ Delete</button>
                </td>
              `;
        tbody.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Error loading entries:", error);
      const tbody = document.getElementById("entries-body");
      tbody.innerHTML = '<tr><td colspan="5">Error loading entries.</td></tr>';
    });
});
function confirmDelete(id) {
  showModal(
    "warning",
    "Delete Entry",
    "Are you sure you want to delete this entry? This action cannot be undone.",
    [
      {
        text: "🗑️ Delete",
        class: "modal-btn-danger",
        action: () => deleteEntry(id),
      },
      {
        text: "❌ Cancel",
        class: "modal-btn-secondary",
        action: hideModal,
      },
    ]
  );
}
function deleteEntry(id) {
  hideModal();
  fetch(`backend/delete.php?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showToast("success", "Entry deleted successfully!");
        setTimeout(() => location.reload(), 1200);
      } else {
        showToast("danger", "Delete failed: " + data.error);
      }
    });
}
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
// Add animated page transitions
function goToPage(url) {
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = url;
  }, 300);
}
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    goToPage(this.href);
  });
});
document.body.style.transition = "opacity 0.3s";
document.body.style.opacity = "1";
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
