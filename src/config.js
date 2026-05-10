export const APP = {
  name: 'NexCliq',
  version: '1.0.0',
  tagline: 'Pay and Receive anywhere with ease',
  description: 'Transfer money, pay online and get paid without limitation',
  company: 'WEMOVE',
  logo: 'https://eliteprotech-url.zone.id/1778405107000vkzl8u.jpg',
};

export const API = {
  base: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',// a changer..
  timeout: 15000,
  endpoints: {
    login: '/auth/token/',
    refresh: '/auth/token/refresh/',
    register: '/users/',
    me: '/users/me/',
    changePassword: '/users/change_password/',
    updateProfile: '/users/profiles/me/',
    wallets: '/wallets/',
    transfers: '/transfers/',
    transferStatus: (id) => `/transfers/${id}/`,
    reconciliation: '/admin/reconciliation/reports/',
    discrepancies: '/admin/discrepancies/',
    resolveDiscrepancy: (id) => `/admin/discrepancies/${id}/`,
    health: '/health/',
  }
};

export const CURRENCY = 'XOF';
export const MAX_AMOUNT = 5000000;
export const MIN_AMOUNT = 100;
