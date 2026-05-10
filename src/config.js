export const APP = {
  name: 'NexCliq',
  version: '2.0.0',
  tagline: 'Pay and Receive anywhere with ease',
  description: 'Transfer money, pay online and get paid without limitation. Fast, secure, and reconciled automatically.',
  company: 'WEMOVE',
  logo: 'https://eliteprotech-url.zone.id/1778405107000vkzl8u.jpg',
  heroImage: 'https://eliteprotech-url.zone.id/1778436354039dvorw8.jpg',
};

export const API = {
  base: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
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
    health: '/health/',
  }
};

export const CURRENCY = 'XOF';
