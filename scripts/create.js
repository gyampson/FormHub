document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const submitBtn = document.getElementById("submit-btn");
  submitBtn.innerHTML = '<span class="loading"></span> Creating...';
  submitBtn.disabled = true;

  const formData = new FormData(this);

  fetch("backend/create.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showToast("success", "Entry created successfully!");
        showModal("success", "Success", "Your entry was created!", []);

        // Auto-close modal after 2 seconds and reset form
        setTimeout(() => {
          hideModal();
          document.getElementById("create-form").reset();
        }, 2000);

      } else {
        showToast("danger", "Create failed: " + data.error);
        showModal("danger", "Error", "Create failed: " + data.error, [
          { text: "Close", class: "modal-btn-secondary", action: hideModal },
        ]);
      }
    })
    .catch((error) => {
      showToast("danger", "Create failed: " + error);
      showModal("danger", "Error", "Create failed: " + error, [
        { text: "Close", class: "modal-btn-secondary", action: hideModal },
      ]);
    })
    .finally(() => {
      submitBtn.innerHTML = "✨ Create Entry";
      submitBtn.disabled = false;
    });
});

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

  // Use your .visible class for smooth fade in
  overlay.classList.add("visible");
}

function hideModal() {
  document.getElementById("modal-overlay").classList.remove("visible");
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
