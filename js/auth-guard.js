// js/auth-guard.js

document.addEventListener("DOMContentLoaded", () => {
  const currentUserApi = window.RepairgeCurrentUser;

  if (!currentUserApi) {
    console.error("RepairgeCurrentUser não encontrado.");
    return;
  }

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

  const isLoggedIn = currentUserApi.isLoggedIn();
  const user = currentUserApi.getCurrentUser();

  // Se não estiver logado e a página for privada, manda para login
  if (!isPublicPage && !isLoggedIn) {
    window.location.href = "login.html";
    return;
  }

  // Se já estiver logado, não deixa voltar para login/cadastro
  if (
    isLoggedIn &&
    ["login.html", "cadastro.html", "register.html"].includes(currentPage)
  ) {
    window.location.href = "dashboard.html";
    return;
  }

  // Se a página é pública, não precisa validar cargos
  if (isPublicPage) {
    if (currentUserApi.updateCurrentUserHeader) {
      currentUserApi.updateCurrentUserHeader();
    }
    return;
  }

  // Segurança extra
  if (!user || !user.role) {
    window.location.href = "login.html";
    return;
  }

  // Permissões por página
  const pagePermissions = {
    "dashboard.html": ["Administrador", "Supervisor", "Técnico", "Operador"],
    "chat.html": ["Administrador", "Supervisor", "Técnico", "Operador"],

    "usuarios.html": ["Administrador"],
    "configuracoes.html": ["Administrador"],
    "mensagens-apagadas.html": ["Administrador"],

    "setores.html": ["Administrador", "Supervisor"],
    "equipamentos.html": ["Administrador", "Supervisor", "Técnico"],

    "tickets.html": ["Administrador", "Supervisor", "Técnico"],
    "novo-ticket.html": ["Administrador", "Supervisor", "Técnico", "Operador"],
    "tickets-concluidos.html": ["Administrador", "Supervisor", "Técnico"],
    "tickets-removidos.html": ["Administrador", "Supervisor"],

    "checklist-diario.html": ["Administrador", "Supervisor", "Técnico", "Operador"],
    "checklists-realizados.html": ["Administrador", "Supervisor", "Técnico"]
  };

  const allowedRoles = pagePermissions[currentPage];

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    alert("Você não tem permissão para acessar esta página.");
    window.location.href = "dashboard.html";
    return;
  }

  if (currentUserApi.updateCurrentUserHeader) {
    currentUserApi.updateCurrentUserHeader();
  }
});