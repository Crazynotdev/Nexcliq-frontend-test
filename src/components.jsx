import { useState } from 'react';
import { ChevronLeft, CheckCircle2, XCircle, Info } from 'lucide-react';
import { getInitials, formatAmount, formatDate, truncate } from './utils';
import { APP, CURRENCY } from './config';

// Logo
export function LogoIcon({ size = 24 }) {
  return (
    <img src={APP.logo} alt={APP.name} width={size} height={size}
      style={{ objectFit: 'cover', borderRadius: size * 0.3 }} />
  );
}

// Avatar
export function Avatar({ name, size = 40, light }) {
  const initials = getInitials(name);
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.35,
      background: light ? 'rgba(255,255,255,0.15)' : 'var(--teal-pale)',
      color: light ? '#fff' : 'var(--teal)',
      border: light ? '2px solid rgba(255,255,255,0.2)' : 'none',
    }}>{initials}</div>
  );
}

// Back Button
export function BackBtn({ onClick }) {
  return (
    <button className="btn-icon" onClick={onClick} aria-label="Retour">
      <ChevronLeft size={20} strokeWidth={2.5} />
    </button>
  );
}

// Status Badge
export function StatusBadge({ status }) {
  const map = {
    SUCCESSFUL: ['badge-success', 'Réussi'],
    PENDING: ['badge-pending', 'En cours'],
    RUNNING: ['badge-pending', 'En cours'],
    FAILED: ['badge-failed', 'Échoué'],
    COMPLETED: ['badge-success', 'Terminé'],
  };
  const [cls, label] = map[status] || ['badge-pending', status || '—'];
  return <span className={`badge ${cls}`}><span className="badge-dot" />{label}</span>;
}

// Empty State
export function EmptyState({ icon, title, sub, children }) {
  return (
    <div className="empty">
      <div className="empty-icon">{icon}</div>
      <div className="empty-title">{title}</div>
      {sub && <div className="empty-sub">{sub}</div>}
      {children}
    </div>
  );
}

// Toggle
export function Toggle({ checked, onChange }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <div className="toggle-track" />
      <div className="toggle-thumb" />
    </label>
  );
}

// Toast Provider
import { createContext, useContext, useCallback } from 'react';
const ToastCtx = createContext(null);
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = 'info') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const icons = { success: CheckCircle2, error: XCircle, info: Info };

  return (
    <ToastCtx.Provider value={add}>
      {children}
      <div className="toast-container">
        {toasts.map(t => {
          const I = icons[t.type] || Info;
          return (
            <div key={t.id} className={`toast toast-${t.type}`}>
              <I size={15} className="toast-icon" /><span>{t.msg}</span>
            </div>
          );
        })}
      </div>
    </ToastCtx.Provider>
  );
}

// Bottom Nav
export function BottomNav({ active, onNavigate, isAdmin }) {
  const { Home, Clock, Send, User, Shield } = require('lucide-react');
  const items = [
    { id: 'home', icon: <Home size={18} />, label: 'Accueil' },
    { id: 'history', icon: <Clock size={18} />, label: 'Historique' },
    { id: 'send', icon: <Send size={18} />, label: 'Envoyer' },
    { id: 'profile', icon: <User size={18} />, label: 'Profil' },
    ...(isAdmin ? [{ id: 'admin', icon: <Shield size={18} />, label: 'Admin' }] : []),
  ];

  return (
    <nav className="bottom-nav">
      {items.map(item => (
        <div key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}>
          <div className="nav-pill">{item.icon}</div>
          <span className="nav-label">{item.label}</span>
        </div>
      ))}
    </nav>
  );
}
