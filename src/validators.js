export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'Ce champ est requis';
    }
    return '';
  },

  email: (value) => {
    if (!value) return '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Email invalide';
    }
    if (value.length > 254) {
      return 'Email trop long';
    }
    return '';
  },

  password: (value) => {
    if (!value) return '';
    if (value.length < 8) return 'Minimum 8 caractères';
    if (!/[A-Z]/.test(value)) return 'Au moins une majuscule';
    if (!/[a-z]/.test(value)) return 'Au moins une minuscule';
    if (!/[0-9]/.test(value)) return 'Au moins un chiffre';
    return '';
  },

  phone: (value) => {
    if (!value) return '';
    const cleaned = value.replace(/[\s.-]/g, '');
    if (!/^\+?[0-9]{8,15}$/.test(cleaned)) {
      return 'Numéro de téléphone invalide';
    }
    return '';
  },

  amount: (value, { min = 0, max = 5000000 } = {}) => {
    if (!value && value !== 0) return '';
    const num = Number(value);
    if (isNaN(num)) return 'Montant invalide';
    if (num < min) return `Minimum ${min} XOF`;
    if (num > max) return `Maximum ${max} XOF`;
    return '';
  },

  username: (value) => {
    if (!value) return '';
    if (value.length < 3) return 'Minimum 3 caractères';
    if (value.length > 30) return 'Maximum 30 caractères';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Caractères non autorisés';
    return '';
  },

  name: (value) => {
    if (!value) return '';
    if (value.length < 2) return 'Minimum 2 caractères';
    if (value.length > 50) return 'Maximum 50 caractères';
    if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(value)) return 'Caractères non autorisés';
    return '';
  }
};
