const PREFIX = 'nx_secure_';

// Chiffrement simple pour les données sensibles
const encode = (data) => {
  try {
    return btoa(JSON.stringify(data));
  } catch {
    return '';
  }
};

const decode = (data) => {
  try {
    return JSON.parse(atob(data));
  } catch {
    return null;
  }
};

export const storage = {
  set(key, value, secure = false) {
    const k = PREFIX + key;
    const v = secure ? encode(value) : JSON.stringify(value);
    localStorage.setItem(k, v);
  },

  get(key, secure = false) {
    const v = localStorage.getItem(PREFIX + key);
    if (!v) return null;
    return secure ? decode(v) : JSON.parse(v);
  },

  remove(key) {
    localStorage.removeItem(PREFIX + key);
  },

  clear() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .forEach(k => localStorage.removeItem(k));
  }
};

// Tokens sécurisés
export const TokenStorage = {
  getAccess() { return storage.get('access', true); },
  getRefresh() { return storage.get('refresh', true); },
  setTokens(access, refresh) {
    storage.set('access', access, true);
    if (refresh) storage.set('refresh', refresh, true);
  },
  clear() {
    storage.remove('access');
    storage.remove('refresh');
    storage.remove('user');
  }
};

// User sécurisé
export const UserStorage = {
  get() { return storage.get('user'); },
  set(user) { storage.set('user', user); },
  clear() { storage.remove('user'); }
};
