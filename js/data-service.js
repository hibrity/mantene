import {
  getData,
  saveData,
  addItem,
  updateItem,
  deleteItem,
  getItemById,
  STORAGE_KEYS
} from './storage.js';

/* =========================
   HELPERS
========================= */

function nowIso() {
  return new Date().toISOString();
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

/* =========================
   AUTH / CURRENT USER
========================= */

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) || null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  localStorage.setItem(
    STORAGE_KEYS.CURRENT_USER,
    JSON.stringify(user)
  );
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  window.location.href = 'login.html';
}

/* =========================
   USERS
========================= */

export function getUsers() {
  return getData(STORAGE_KEYS.USERS);
}

export function createUser(userData) {
  return addItem(STORAGE_KEYS.USERS, {
    createdAt: nowIso(),
    updatedAt: nowIso(),
    online: false,
    ...userData,
    email: normalizeEmail(userData.email)
  });
}

export function updateUser(userId, updatedFields) {
  const payload = {
    ...updatedFields,
    updatedAt: nowIso()
  };

  if (payload.email) {
    payload.email = normalizeEmail(payload.email);
  }

  return updateItem(STORAGE_KEYS.USERS, userId, payload);
}

export function deleteUser(userId) {
  return deleteItem(STORAGE_KEYS.USERS, userId);
}

export function getUserById(userId) {
  return getItemById(STORAGE_KEYS.USERS, userId);
}

export function getUserByEmail(email) {
  const users = getUsers();
  const normalized = normalizeEmail(email);
  return users.find(user => normalizeEmail(user.email) === normalized);
}

/* =========================
   COMPANIES
========================= */

export function getCompanies() {
  return getData(STORAGE_KEYS.COMPANIES);
}

export function createCompany(companyData) {
  return addItem(STORAGE_KEYS.COMPANIES, {
    createdAt: nowIso(),
    updatedAt: nowIso(),
    showWhatsapp: true,
    showCalculator: true,
    showCalendar: true,
    whatsappLink: '',
    calendarLink: '',
    ...companyData
  });
}

export function updateCompany(companyId, updatedFields) {
  return updateItem(STORAGE_KEYS.COMPANIES, companyId, {
    ...updatedFields,
    updatedAt: nowIso()
  });
}

export function deleteCompany(companyId) {
  return deleteItem(STORAGE_KEYS.COMPANIES, companyId);
}

export function getCompanyById(companyId) {
  return getItemById(STORAGE_KEYS.COMPANIES, companyId);
}

/* =========================
   SECTORS
========================= */

export function getSectors() {
  return getData(STORAGE_KEYS.SECTORS);
}

export function createSector(sectorData) {
  return addItem(STORAGE_KEYS.SECTORS, {
    createdAt: nowIso(),
    updatedAt: nowIso(),
    ...sectorData
  });
}

export function updateSector(sectorId, updatedFields) {
  return updateItem(STORAGE_KEYS.SECTORS, sectorId, {
    ...updatedFields,
    updatedAt: nowIso()
  });
}

export function deleteSector(sectorId) {
  return deleteItem(STORAGE_KEYS.SECTORS, sectorId);
}

export function getSectorById(sectorId) {
  return getItemById(STORAGE_KEYS.SECTORS, sectorId);
}

/* =========================
   EQUIPMENT
========================= */

export function getEquipment() {
  return getData(STORAGE_KEYS.EQUIPMENT);
}

export function createEquipment(equipmentData) {
  return addItem(STORAGE_KEYS.EQUIPMENT, {
    createdAt: nowIso(),
    updatedAt: nowIso(),
    status: 'ACTIVE',
    ...equipmentData
  });
}

export function updateEquipment(equipmentId, updatedFields) {
  return updateItem(STORAGE_KEYS.EQUIPMENT, equipmentId, {
    ...updatedFields,
    updatedAt: nowIso()
  });
}

export function deleteEquipment(equipmentId) {
  return deleteItem(STORAGE_KEYS.EQUIPMENT, equipmentId);
}

export function getEquipmentById(equipmentId) {
  return getItemById(STORAGE_KEYS.EQUIPMENT, equipmentId);
}

/* =========================
   TICKETS
========================= */

export function getTickets() {
  return getData(STORAGE_KEYS.TICKETS);
}

export function createTicket(ticketData) {
  const priority = ticketData.priority || 'MEDIUM';

  const priorityLabels = {
    LOW: 'Baixa',
    MEDIUM: 'Média',
    HIGH: 'Alta',
    URGENT: 'Urgente'
  };

  return addItem(STORAGE_KEYS.TICKETS, {
    createdAt: nowIso(),
    updatedAt: nowIso(),
    completedAt: null,
    removedAt: null,
    materialsRequested: [],
    solutionNotes: '',
    status: 'OPEN',
    statusLabel: 'Aberto',
    priority,
    priorityLabel: priorityLabels[priority] || 'Média',
    photoURL: null,
    ...ticketData
  });
}

export function updateTicket(ticketId, updatedFields) {
  return updateItem(STORAGE_KEYS.TICKETS, ticketId, {
    ...updatedFields,
    updatedAt: nowIso()
  });
}

export function deleteTicket(ticketId) {
  return deleteItem(STORAGE_KEYS.TICKETS, ticketId);
}

export function getTicketById(ticketId) {
  return getItemById(STORAGE_KEYS.TICKETS, ticketId);
}

/* =========================
   CHECKLISTS
========================= */

export function getChecklists() {
  return getData(STORAGE_KEYS.CHECKLISTS);
}

export function createChecklist(checklistData) {
  return addItem(STORAGE_KEYS.CHECKLISTS, {
    createdAt: nowIso(),
    updatedAt: nowIso(),
    date: nowIso(),
    photoURL: null,
    ...checklistData
  });
}

export function updateChecklist(checklistId, updatedFields) {
  return updateItem(STORAGE_KEYS.CHECKLISTS, checklistId, {
    ...updatedFields,
    updatedAt: nowIso()
  });
}

export function deleteChecklist(checklistId) {
  return deleteItem(STORAGE_KEYS.CHECKLISTS, checklistId);
}

export function getChecklistById(checklistId) {
  return getItemById(STORAGE_KEYS.CHECKLISTS, checklistId);
}

/* =========================
   MESSAGES / CHAT
========================= */

export function getMessages() {
  return getData(STORAGE_KEYS.MESSAGES);
}

export function createMessage(messageData) {
  return addItem(STORAGE_KEYS.MESSAGES, {
    createdAt: nowIso(),
    updatedAt: nowIso(),
    read: false,
    ...messageData
  });
}

export function updateMessage(messageId, updatedFields) {
  return updateItem(STORAGE_KEYS.MESSAGES, messageId, {
    ...updatedFields,
    updatedAt: nowIso()
  });
}

export function deleteMessage(messageId) {
  return deleteItem(STORAGE_KEYS.MESSAGES, messageId);
}

export function getMessageById(messageId) {
  return getItemById(STORAGE_KEYS.MESSAGES, messageId);
}

/* =========================
   SETTINGS
========================= */

export function getSettings() {
  return getData(STORAGE_KEYS.SETTINGS);
}

export function saveSettings(settingsData) {
  saveData(STORAGE_KEYS.SETTINGS, settingsData);
}

/* =========================
   NOTIFICATIONS
========================= */

export function getNotifications() {
  return getData(STORAGE_KEYS.NOTIFICATIONS);
}

export function createNotification(notificationData) {
  return addItem(STORAGE_KEYS.NOTIFICATIONS, {
    createdAt: nowIso(),
    updatedAt: nowIso(),
    read: false,
    ...notificationData
  });
}

export function updateNotification(notificationId, updatedFields) {
  return updateItem(STORAGE_KEYS.NOTIFICATIONS, notificationId, {
    ...updatedFields,
    updatedAt: nowIso()
  });
}

export function deleteNotification(notificationId) {
  return deleteItem(STORAGE_KEYS.NOTIFICATIONS, notificationId);
}

/* =========================
   DASHBOARD HELPERS
========================= */

export function getDashboardStats(companyId = null) {
  const tickets = companyId
    ? getTickets().filter(ticket => ticket.companyId === companyId)
    : getTickets();

  const equipment = companyId
    ? getEquipment().filter(eq => eq.companyId === companyId)
    : getEquipment();

  const sectors = companyId
    ? getSectors().filter(sector => sector.companyId === companyId)
    : getSectors();

  const users = companyId
    ? getUsers().filter(user => user.companyId === companyId)
    : getUsers();

  const checklists = companyId
    ? getChecklists().filter(checklist => checklist.companyId === companyId)
    : getChecklists();

  return {
    totalTickets: tickets.length,
    openTickets: tickets.filter(ticket => ticket.status === 'OPEN').length,
    resolvedTickets: tickets.filter(ticket => ticket.status === 'RESOLVED').length,
    removedTickets: tickets.filter(ticket => ticket.status === 'REMOVED').length,
    totalEquipment: equipment.length,
    activeEquipment: equipment.filter(eq => eq.status === 'ACTIVE').length,
    maintenanceEquipment: equipment.filter(eq => eq.status === 'MAINTENANCE').length,
    totalSectors: sectors.length,
    totalUsers: users.length,
    totalChecklists: checklists.length
  };
}