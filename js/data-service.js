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
   AUTH / CURRENT USER
========================= */

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
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
  return addItem(STORAGE_KEYS.USERS, userData);
}

export function updateUser(userId, updatedFields) {
  return updateItem(STORAGE_KEYS.USERS, userId, updatedFields);
}

export function deleteUser(userId) {
  return deleteItem(STORAGE_KEYS.USERS, userId);
}

export function getUserById(userId) {
  return getItemById(STORAGE_KEYS.USERS, userId);
}

export function getUserByEmail(email) {
  const users = getUsers();
  return users.find(user => user.email === email);
}

/* =========================
   COMPANIES
========================= */

export function getCompanies() {
  return getData(STORAGE_KEYS.COMPANIES);
}

export function createCompany(companyData) {
  return addItem(STORAGE_KEYS.COMPANIES, companyData);
}

export function updateCompany(companyId, updatedFields) {
  return updateItem(STORAGE_KEYS.COMPANIES, companyId, updatedFields);
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
  return addItem(STORAGE_KEYS.SECTORS, sectorData);
}

export function updateSector(sectorId, updatedFields) {
  return updateItem(STORAGE_KEYS.SECTORS, sectorId, updatedFields);
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
  return addItem(STORAGE_KEYS.EQUIPMENT, equipmentData);
}

export function updateEquipment(equipmentId, updatedFields) {
  return updateItem(STORAGE_KEYS.EQUIPMENT, equipmentId, updatedFields);
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
  return addItem(STORAGE_KEYS.TICKETS, {
    status: 'Aberto',
    priority: 'Média',
    ...ticketData
  });
}

export function updateTicket(ticketId, updatedFields) {
  return updateItem(STORAGE_KEYS.TICKETS, ticketId, updatedFields);
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
  return addItem(STORAGE_KEYS.CHECKLISTS, checklistData);
}

export function updateChecklist(checklistId, updatedFields) {
  return updateItem(STORAGE_KEYS.CHECKLISTS, checklistId, updatedFields);
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
  return addItem(STORAGE_KEYS.MESSAGES, messageData);
}

export function deleteMessage(messageId) {
  return deleteItem(STORAGE_KEYS.MESSAGES, messageId);
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
    read: false,
    ...notificationData
  });
}

export function updateNotification(notificationId, updatedFields) {
  return updateItem(STORAGE_KEYS.NOTIFICATIONS, notificationId, updatedFields);
}

export function deleteNotification(notificationId) {
  return deleteItem(STORAGE_KEYS.NOTIFICATIONS, notificationId);
}

/* =========================
   DASHBOARD HELPERS
========================= */

export function getDashboardStats() {
  const tickets = getTickets();
  const equipment = getEquipment();
  const sectors = getSectors();
  const users = getUsers();

  return {
    totalTickets: tickets.length,
    openTickets: tickets.filter(ticket => ticket.status === 'Aberto').length,
    totalEquipment: equipment.length,
    activeEquipment: equipment.filter(eq => eq.status === 'ACTIVE').length,
    totalSectors: sectors.length,
    totalUsers: users.length
  };
}