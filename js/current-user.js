// js/current-user.js

const STORAGE_KEY = "repairgeCurrentUser";

const fallbackUser = {
  id: "demo-admin",
  uid: "demo-admin",
  name: "Administrador",
  email: "admin@repairge.com",
  role: "Administrador",
  companyId: "empresa-demo",
  companyName: "Empresa Demo"
};

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return fallbackUser;
    }

    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object") {
      return fallbackUser;
    }

    return {
      ...fallbackUser,
      ...parsed
    };
  } catch (error) {
    console.error("Erro ao ler usuário atual:", error);
    return fallbackUser;
  }
}

function setCurrentUser(userData) {
  try {
    const safeUser = {
      ...fallbackUser,
      ...userData
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    return safeUser;
  } catch (error) {
    console.error("Erro ao salvar usuário atual:", error);
    return null;
  }
}

function clearCurrentUser() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Erro ao limpar usuário atual:", error);
  }
}

function isLoggedIn() {
  const user = getCurrentUser();
  return !!user && !!user.companyId;
}

function requireUser(redirectTo = "login.html") {
  const user = getCurrentUser();

  if (!user || !user.companyId) {
    window.location.href = redirectTo;
    return null;
  }

  return user;
}

function requireRole(allowedRoles = [], redirectTo = "dashboard.html") {
  const user = getCurrentUser();

  if (!allowedRoles.length) {
    return user;
  }

  if (!allowedRoles.includes(user.role)) {
    window.location.href = redirectTo;
    return null;
  }

  return user;
}

function updateCurrentUserHeader(options = {}) {
  const {
    initialsSelector = "[data-user-initials]",
    nameSelector = "[data-user-name]",
    roleSelector = "[data-user-role]",
    companySelector = "[data-user-company]"
  } = options;

  const user = getCurrentUser();

  const initialsEls = document.querySelectorAll(initialsSelector);
  const nameEls = document.querySelectorAll(nameSelector);
  const roleEls = document.querySelectorAll(roleSelector);
  const companyEls = document.querySelectorAll(companySelector);

  const initials = (user.name || "AD")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || "")
    .join("") || "AD";

  initialsEls.forEach(el => {
    el.textContent = initials;
  });

  nameEls.forEach(el => {
    el.textContent = user.name || fallbackUser.name;
  });

  roleEls.forEach(el => {
    el.textContent = user.role || fallbackUser.role;
  });

  companyEls.forEach(el => {
    el.textContent = user.companyName || fallbackUser.companyName;
  });
}

function bootstrapCurrentUser() {
  const existing = localStorage.getItem(STORAGE_KEY);

  if (!existing) {
    setCurrentUser(fallbackUser);
  }
}

bootstrapCurrentUser();

window.RepairgeCurrentUser = {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
  isLoggedIn,
  requireUser,
  requireRole,
  updateCurrentUserHeader
};