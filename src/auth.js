import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from './api';
import { API } from './config';
import { TokenStorage, UserStorage } from './storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = TokenStorage.getAccess();
    if (token) {
      api.get(API.endpoints.me)
        .then(u => { setUser(u); UserStorage.set(u); })
        .catch(() => { TokenStorage.clear(); setUser(null); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const { access, refresh } = await api.post(API.endpoints.login, { email, password });
    TokenStorage.setTokens(access, refresh);
    const user = await api.get(API.endpoints.me);
    setUser(user);
    UserStorage.set(user);
  }, []);

  const register = useCallback(async (data) => {
    await api.post(API.endpoints.register, data);
  }, []);

  const logout = useCallback(() => {
    TokenStorage.clear();
    UserStorage.clear();
    setUser(null);
  }, []);

  const updateUser = useCallback(async (data) => {
    const updated = await api.patch(API.endpoints.updateProfile, data);
    setUser(updated);
    UserStorage.set(updated);
  }, []);

  if (loading) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        background: 'linear-gradient(160deg, #042F2A, #0B6B5C, #040F0C)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 20, zIndex: 9999
      }}>
        <img src="https://eliteprotech-url.zone.id/1778405107000vkzl8u.jpg"
          alt="NexCliq" style={{ width: 80, height: 80, borderRadius: 20, objectFit: 'cover' }} />
        <div style={{ width: 24, height: 24, border: '3px solid rgba(255,255,255,0.2)', borderTopColor: '#C4B49A', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user, login, register, logout, updateUser,
      isAuth: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
