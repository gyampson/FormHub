// Get entry ID from URL
function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}
const entryId = getIdFromUrl();
// Fetch entry data
fetch(`backend/get_form.php?id=${entryId}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.error) throw new Error(data.error);
    document.getElementById("name").value = data.name;
    document.getElementById("email").value = data.email;
    document.getElementById("message").value = data.message;
  })
  .catch((error) => {
    document.getElementById("update-status").textContent =
      "Error loading entry: " + error;
  });
// Modal and Toast functions
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
// Update form submit handler to use modal and toast
const updateForm = document.getElementById("update-form");
if (updateForm) {
  updateForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    formData.append("id", getIdFromUrl());
    fetch("backend/update.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showToast("success", "Entry updated successfully!");
          showModal("success", "Success", "Your entry was updated!", [
            { text: "OK", class: "modal-btn-primary", action: hideModal },
          ]);
        } else {
          showToast("danger", "Update failed: " + data.error);
          showModal("danger", "Error", "Update failed: " + data.error, [
            {
              text: "Close",
              class: "modal-btn-secondary",
              action: hideModal,
            },
          ]);
        }
      })
      .catch((error) => {
        showToast("danger", "Update failed: " + error);
        showModal("danger", "Error", "Update failed: " + error, [
          {
            text: "Close",
            class: "modal-btn-secondary",
            action: hideModal,
          },
        ]);
      });
  });
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
