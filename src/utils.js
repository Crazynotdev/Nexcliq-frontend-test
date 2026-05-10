import { CURRENCY } from './config';

export const formatAmount = (amount, currency = CURRENCY) => {
  if (amount == null) return '—';
  return new Intl.NumberFormat('fr-FR').format(amount) + '\u202F' + currency;
};

export const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
};

export const formatTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString('fr-FR', {
    hour: '2-digit', minute: '2-digit'
  });
};

export const getInitials = (name) => {
  return (name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
};

export const truncate = (str, len = 20) => {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '…' : str;
};

export const sanitizeInput = (value) => {
  if (typeof value !== 'string') return value;
  return value.replace(/[<>]/g, '').trim();
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
};
