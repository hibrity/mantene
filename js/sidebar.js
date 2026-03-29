// js/sidebar.js

function initializeSidebar() {
  const openButton = document.getElementById("openSidebarBtn");
  const closeButton = document.getElementById("closeSidebarBtn");
  const sidebar = document.getElementById("sidebarMobile");
  const overlay = document.getElementById("sidebarMobileOverlay");

  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.remove("-translate-x-full");
    overlay?.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  function closeSidebar() {
    sidebar.classList.add("-translate-x-full");
    overlay?.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  openButton?.addEventListener("click", openSidebar);
  closeButton?.addEventListener("click", closeSidebar);
  overlay?.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeSidebar();
    }
  });

  window.RepairgeSidebar = {
    openSidebar,
    closeSidebar
  };
}

document.addEventListener("DOMContentLoaded", initializeSidebar);