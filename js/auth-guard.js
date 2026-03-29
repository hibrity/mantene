// js/auth-guard.js

document.addEventListener("DOMContentLoaded", () => {
  const currentUserApi = window.RepairgeCurrentUser;

  if (!currentUserApi) {
    console.error("RepairgeCurrentUser não encontrado.");
    return;
  }

  const user = currentUserApi.getCurrentUser();

  const publicPages = [
    "login.html",
    "cadastro.html",
    "register.html",
    "esqueci-senha.html",
    "reset-password.html",
    "index.html"
  ];

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const isPublicPage = publicPages.includes(currentPage);

  if (!isPublicPage && !currentUserApi.isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }

  if ((currentPage === "login.html" || currentPage === "cadastro.html") && currentUserApi.isLoggedIn()) {
    window.location.href = "dashboard.html";
    return;
  }

  const adminOnlyPages = [
    "usuarios.html",
    "configuracoes.html",
    "mensagens-apagadas.html"
  ];

  const technicianPages = [
    "tickets.html",
    "novo-ticket.html",
    "tickets-concluidos.html",
    "tickets-removidos.html",
    "checklist-diario.html",
    "checklists-realizados.html"
  ];

  if (adminOnlyPages.includes(currentPage)) {
    const allowedRoles = ["Administrador"];

    if (!allowedRoles.includes(user.role)) {
      alert("Você não tem permissão para acessar esta página.");
      window.location.href = "dashboard.html";
      return;
    }
  }

  if (technicianPages.includes(currentPage)) {
    const allowedRoles = ["Administrador", "Técnico"];

    if (!allowedRoles.includes(user.role)) {
      alert("Você não tem permissão para acessar esta página.");
      window.location.href = "dashboard.html";
      return;
    }
  }

  currentUserApi.updateCurrentUserHeader();
});