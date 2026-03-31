const APP_PREFIX = 'repairge';

export const STORAGE_KEYS = {
  CURRENT_USER: `${APP_PREFIX}CurrentUser`,
  USERS: `${APP_PREFIX}Users`,
  COMPANIES: `${APP_PREFIX}Companies`,
  SECTORS: `${APP_PREFIX}Sectors`,
  EQUIPMENT: `${APP_PREFIX}Equipment`,
  TICKETS: `${APP_PREFIX}Tickets`,
  CHECKLISTS: `${APP_PREFIX}Checklists`,
  MESSAGES: `${APP_PREFIX}Messages`,
  SETTINGS: `${APP_PREFIX}Settings`,
  NOTIFICATIONS: `${APP_PREFIX}Notifications`
};

function safeParse(value, fallback = []) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function getData(key) {
  return safeParse(localStorage.getItem(key), []);
}

export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function addItem(key, item) {
  const items = getData(key);

  const prefixMap = {
    [STORAGE_KEYS.USERS]: 'user',
    [STORAGE_KEYS.COMPANIES]: 'company',
    [STORAGE_KEYS.SECTORS]: 'sector',
    [STORAGE_KEYS.EQUIPMENT]: 'equipment',
    [STORAGE_KEYS.TICKETS]: 'ticket',
    [STORAGE_KEYS.CHECKLISTS]: 'checklist',
    [STORAGE_KEYS.MESSAGES]: 'message',
    [STORAGE_KEYS.NOTIFICATIONS]: 'notification'
  };

  const newItem = {
    id: item.id || generateId(prefixMap[key] || 'item'),
    ...item
  };

  items.push(newItem);
  saveData(key, items);

  return newItem;
}

export function updateItem(key, itemId, updatedFields) {
  const items = getData(key);

  const updatedItems = items.map(item =>
    item.id === itemId
      ? { ...item, ...updatedFields }
      : item
  );

  saveData(key, updatedItems);

  return updatedItems.find(item => item.id === itemId) || null;
}

export function deleteItem(key, itemId) {
  const items = getData(key);
  const filteredItems = items.filter(item => item.id !== itemId);

  saveData(key, filteredItems);

  return true;
}

export function getItemById(key, itemId) {
  const items = getData(key);
  return items.find(item => item.id === itemId) || null;
}

export function clearKey(key) {
  localStorage.removeItem(key);
}

export function clearAllAppData() {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });

  localStorage.removeItem('repairgeDeletedMessages');
}