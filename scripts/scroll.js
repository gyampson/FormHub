document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile menu toggle ---
  const navbarToggle = document.querySelector(".navbar-toggle");
  const navbarLinks = document.querySelector(".navbar-links");

  if (navbarToggle && navbarLinks) {
    navbarToggle.addEventListener("click", () => {
      navbarLinks.classList.toggle("show");
    });
  }

  // --- Scroll reveal effect ---
  const revealElements = document.querySelectorAll(".scroll-reveal");

  const revealOnScroll = () => {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add("visible");
      }
    });
  };

  // Run once on load
  revealOnScroll();

  // Attach listeners
  window.addEventListener("scroll", revealOnScroll);
});
