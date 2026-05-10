import { useState, useEffect, useCallback } from 'react';
import {
  Home, ArrowUpRight, ArrowDownLeft, Clock, User, Bell, ChevronRight,
  Eye, EyeOff, Copy, Check, RefreshCw, AlertTriangle, LogOut, Lock,
  Wallet, Shield, Settings, Phone, Mail, CheckCircle2, Loader2,
  Filter, Send, Download, CreditCard, X, TrendingUp, Sun, Moon,
  Plus, Search, Star, Zap, ArrowRight, Sparkles
} from 'lucide-react';
import { api } from './api';
import { API, APP, CURRENCY } from './config';
import { useAuth } from './auth';
import { useToast } from './components';
import { useTheme } from './theme';
import { formatAmount, formatDate, truncate } from './utils';

// ═══════════════════════════════════════════════════════════
// LANDING - Style Pesse/Elegostra
// ═══════════════════════════════════════════════════════════
export function LandingScreen({ onLogin, onRegister }) {
  const { theme, isDark, toggle } = useTheme();

  return (
    <div style={{ minHeight: '100dvh', background: theme.bg, fontFamily: "'Inter', 'Sora', sans-serif", display: 'flex', flexDirection: 'column', transition: 'all 0.3s' }}>
      
      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px',
        background: theme.navBg,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.border}`,
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={APP.logo} alt="NexCliq" style={{ width: 28, height: 28, borderRadius: 7, objectFit: 'cover' }} />
          <span style={{ fontSize: 17, fontWeight: 800, color: theme.text, letterSpacing: -0.5 }}>
            nexcli<span style={{ color: '#C4B49A' }}>q</span>
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Theme Toggle */}
          <button onClick={toggle} style={{
            width: 36, height: 36, borderRadius: 10,
            background: theme.surface, border: `1px solid ${theme.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: theme.textSecondary,
          }}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={onLogin} style={{
            padding: '8px 18px', borderRadius: 10,
            border: `1.5px solid ${theme.border}`,
            background: 'transparent', color: theme.text,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            fontFamily: "'Inter', 'Sora', sans-serif"
          }}>Login</button>
          <button onClick={onRegister} style={{
            padding: '8px 18px', borderRadius: 10, border: 'none',
            background: theme.accent, color: '#fff',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            fontFamily: "'Inter', 'Sora', sans-serif"
          }}>Sign Up</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ flex: 1, padding: '40px 20px 0', maxWidth: 480, margin: '0 auto', width: '100%' }}>
        
        <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.12, color: theme.text, letterSpacing: -1.5, margin: '0 0 12px 0' }}>
          Pay and Receive<br />
          <span style={{ color: theme.accent }}>anywhere</span> with ease
        </h1>
        
        <p style={{ fontSize: 14, color: theme.textSecondary, lineHeight: 1.65, marginBottom: 24 }}>
          {APP.description}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <button onClick={onRegister} style={{
            padding: '14px 26px', borderRadius: 12, border: 'none',
            background: theme.accent, color: '#fff',
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
            fontFamily: "'Inter', 'Sora', sans-serif"
          }}>
            Get Started
          </button>
          <button style={{
            padding: '14px 26px', borderRadius: 12,
            border: `1.5px solid ${theme.border}`,
            background: 'transparent', color: theme.text,
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
            fontFamily: "'Inter', 'Sora', sans-serif"
          }}>
            Contact
          </button>
        </div>

        {/* Image */}
        <div style={{ width: '100%', height: 180, borderRadius: 18, overflow: 'hidden', marginBottom: 24, border: `1px solid ${theme.border}` }}>
          <img src={APP.heroImage} alt="NexCliq" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <div style={{ padding: 18, borderRadius: 16, background: theme.incomeBg, color: theme.incomeText }}>
            <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Income</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>13,592,000 XOF</div>
            <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4 }}>+12.5% this month</div>
          </div>
          <div style={{ padding: 18, borderRadius: 16, background: theme.expenseBg, border: `1px solid ${theme.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Expenses</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: theme.expenseText }}>12,167,000 XOF</div>
            <div style={{ fontSize: 10, color: theme.textSecondary, marginTop: 4 }}>-3.2% this month</div>
          </div>
        </div>

        {/* Goal */}
        <div style={{ padding: 18, borderRadius: 16, background: theme.goalBg, border: `1px solid ${theme.border}`, marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Goal</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: theme.accent }}>56K <span style={{ fontSize: 12, color: theme.textSecondary }}>XOF</span></div>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: isDark ? 'rgba(11,107,92,0.15)' : '#E8F0ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={16} color={theme.accent} />
            </div>
          </div>
          <div style={{ height: 4, background: isDark ? 'rgba(255,255,255,0.08)' : '#E8ECEA', borderRadius: 2, marginBottom: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '68%', background: theme.accent, borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 10, color: theme.textSecondary }}>Remuneration growth</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: theme.accent, marginTop: 4 }}>24,345 XOF</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '18px', borderTop: `1px solid ${theme.border}` }}>
        <p style={{ fontSize: 11, color: theme.textSecondary, margin: 0 }}>
          Powered by <span style={{ fontWeight: 700 }}>{APP.company}</span>
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// HOME - Dashboard Style Pesse
// ═══════════════════════════════════════════════════════════
export function HomeScreen({ onNavigate }) {
  const { user } = useAuth();
  const { theme, isDark, toggle } = useTheme();
  const [wallet, setWallet] = useState(null);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balanceVisible, setBalanceVisible] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(API.endpoints.wallets).catch(() => null),
      api.get(API.endpoints.transfers + '?limit=5').catch(() => null),
    ]).then(([w, t]) => {
      if (w?.results?.length) setWallet(w.results[0]);
      else if (w && !w.results) setWallet(w);
      setTransfers(t?.results || []);
    }).finally(() => setLoading(false));
  }, []);

  const name = user?.first_name || user?.username || 'Utilisateur';

  return (
    <div style={{ minHeight: '100dvh', background: theme.bg, transition: 'all 0.3s', paddingBottom: 100 }}>
      
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px',
        background: theme.navBg, backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.border}`,
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div>
          <div style={{ fontSize: 11, color: theme.textSecondary, fontWeight: 500 }}>Good morning,</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: theme.text, letterSpacing: -0.3 }}>{name}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={toggle} style={{
            width: 36, height: 36, borderRadius: 10,
            background: theme.surface, border: `1px solid ${theme.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: theme.textSecondary,
          }}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => onNavigate('notifications')} style={{
            width: 36, height: 36, borderRadius: 10,
            background: theme.surface, border: `1px solid ${theme.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: theme.textSecondary,
          }}>
            <Bell size={16} />
          </button>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: isDark ? 'rgba(11,107,92,0.2)' : '#E3F2EF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 14, color: theme.accent,
          }}>
            {(name || 'U')[0].toUpperCase()}
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px' }}>
        
        {/* Balance Card - Style Pesse */}
        <div style={{
          background: `linear-gradient(145deg, ${isDark ? '#0B6B5C' : '#0B6B5C'}, ${isDark ? '#073D34' : '#06433C'})`,
          borderRadius: 20, padding: '24px 20px',
          color: '#fff', marginBottom: 16,
          boxShadow: '0 8px 32px rgba(11,107,92,0.15)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {wallet?.provider || 'Main'} card balance
            </div>
            <button onClick={() => setBalanceVisible(v => !v)} style={{
              background: 'none', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.6
            }}>
              {balanceVisible ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1.5 }}>
            {loading ? <Loader2 size={24} className="spin" style={{ opacity: 0.5 }} /> :
              balanceVisible ? formatAmount(wallet?.balance) : '••••••'
            }
          </div>
          <div style={{ fontSize: 11, opacity: 0.5, marginTop: 4 }}>
            Money hold <span style={{ fontWeight: 600, opacity: 0.8 }}>2,500 XOF</span>
          </div>
        </div>

        {/* Quick Actions - 2 boutons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          <button onClick={() => onNavigate('send')} style={{
            padding: '16px', borderRadius: 16,
            background: theme.surface, border: `1px solid ${theme.border}`,
            color: theme.text, fontSize: 14, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Send size={16} />Send
          </button>
          <button onClick={() => onNavigate('receive')} style={{
            padding: '16px', borderRadius: 16,
            background: theme.surface, border: `1px solid ${theme.border}`,
            color: theme.text, fontSize: 14, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Download size={16} />Receive
          </button>
        </div>

        {/* Send Again - Style Pesse */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>Send again</span>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', color: theme.accent,
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <Plus size={14} />Add
            </button>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
            {['S Rijal', 'Ferina C', 'Daffa T', 'Bayu S', 'Christian K'].map((n, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                flexShrink: 0, cursor: 'pointer',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: i === 0 ? theme.accent : theme.surface,
                  border: `1px solid ${theme.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 600, fontSize: 13,
                  color: i === 0 ? '#fff' : theme.textSecondary,
                }}>
                  {n[0]}
                </div>
                <span style={{ fontSize: 10, color: theme.textSecondary, fontWeight: 500 }}>{n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>History transaction</span>
            <button onClick={() => onNavigate('history')} style={{
              background: 'none', border: 'none', color: theme.accent,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              see more
            </button>
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: 24 }}><Loader2 size={20} className="spin" style={{ color: theme.accent }} /></div>
          ) : transfers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 24, color: theme.textSecondary, fontSize: 13 }}>
              No transactions yet
            </div>
          ) : (
            <div style={{ borderRadius: 16, background: theme.surface, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
              {transfers.map((tx, i) => (
                <div key={tx.id || i} onClick={() => onNavigate('txDetail', tx)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', cursor: 'pointer',
                  borderBottom: i < transfers.length - 1 ? `1px solid ${theme.border}` : 'none',
                  transition: 'background 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 12,
                      background: tx.direction === 'IN' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {tx.direction === 'IN'
                        ? <ArrowDownLeft size={16} color="#10B981" />
                        : <ArrowUpRight size={16} color="#EF4444" />
                      }
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>
                        {tx.receiver_phone || tx.sender_phone || 'Transfer'}
                      </div>
                      <div style={{ fontSize: 10, color: theme.textSecondary, marginTop: 1 }}>
                        {formatDate(tx.created_at)}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: tx.direction === 'IN' ? '#10B981' : theme.text }}>
                    {tx.direction === 'IN' ? '+' : '−'}{formatAmount(tx.amount, tx.currency)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Bottom Nav */}
      <nav style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 'calc(100% - 24px)', maxWidth: 456,
        background: theme.navBg, backdropFilter: 'blur(24px)',
        border: `1px solid ${theme.border}`, borderRadius: 20,
        display: 'flex', justifyContent: 'space-around',
        padding: '10px 8px', margin: '0 12px 12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        {[
          { id: 'home', icon: <Home size={20} />, label: 'Home' },
          { id: 'history', icon: <Clock size={20} />, label: 'History' },
          { id: 'send', icon: <Send size={20} />, label: 'Send' },
          { id: 'profile', icon: <User size={20} />, label: 'Profile' },
        ].map(item => (
          <button key={item.id} onClick={() => onNavigate(item.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'none', border: 'none',
            color: item.id === 'home' ? theme.accent : theme.textSecondary,
            cursor: 'pointer', fontFamily: 'inherit',
            padding: '6px 16px', borderRadius: 12,
          }}>
            {item.icon}
            <span style={{ fontSize: 10, fontWeight: 600 }}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// LOGIN SCREEN
// ═══════════════════════════════════════════════════════════
export function LoginScreen({ onBack, onSuccess, onRegister }) {
  const { login } = useAuth();
  const toast = useToast();
  const { theme, isDark, toggle } = useTheme();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const submit = async () => {
    const e = {};
    if (!form.email) e.email = 'Email required';
    if (!form.password) e.password = 'Password required';
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try { await login(form.email, form.password); toast('Welcome!', 'success'); onSuccess(); }
    catch (err) { toast(err.message, 'error'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100dvh', background: theme.bg, transition: 'all 0.3s' }}>
      <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: theme.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button onClick={toggle} style={{ width: 36, height: 36, borderRadius: 10, background: theme.surface, border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: theme.textSecondary }}>
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
      
      <div style={{ padding: '40px 20px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: theme.text, marginBottom: 32 }}>Welcome back</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>Email</label>
            <input type="email" placeholder="you@example.com" value={form.email}
              onChange={e => setForm(f => ({...f, email: e.target.value}))}
              style={{
                width: '100%', padding: '14px 16px', borderRadius: 12,
                background: theme.inputBg, border: `1.5px solid ${errors.email ? '#EF4444' : theme.inputBorder}`,
                color: theme.text, fontSize: 14, outline: 'none', fontFamily: 'inherit',
              }} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPwd ? 'text' : 'password'} placeholder="••••••••" value={form.password}
                onChange={e => setForm(f => ({...f, password: e.target.value}))}
                style={{
                  width: '100%', padding: '14px 44px 14px 16px', borderRadius: 12,
                  background: theme.inputBg, border: `1.5px solid ${errors.password ? '#EF4444' : theme.inputBorder}`,
                  color: theme.text, fontSize: 14, outline: 'none', fontFamily: 'inherit',
                }} />
              <button onClick={() => setShowPwd(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: theme.textSecondary, cursor: 'pointer' }}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button onClick={submit} disabled={loading} style={{
            width: '100%', padding: '15px', borderRadius: 12, border: 'none',
            background: theme.accent, color: '#fff', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit', marginTop: 8,
            opacity: loading ? 0.6 : 1,
          }}>
            {loading ? <Loader2 size={18} className="spin" /> : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// REGISTER SCREEN
// ═══════════════════════════════════════════════════════════
export function RegisterScreen({ onBack, onSuccess }) {
  const { register } = useAuth();
  const toast = useToast();
  const { theme, isDark, toggle } = useTheme();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', username: '', phone: '', password: '', password2: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate1 = () => {
    const e = {};
    if (!form.first_name) e.first_name = 'Required';
    if (!form.last_name) e.last_name = 'Required';
    if (!form.email) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.username || form.username.length < 3) e.username = 'Min 3 characters';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const validate2 = () => {
    const e = {};
    if (!form.password || form.password.length < 8) e.password = 'Min 8 characters';
    if (form.password !== form.password2) e.password2 = 'Passwords do not match';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async () => {
    if (!validate2()) return;
    setLoading(true);
    try { await register(form); onSuccess(); }
    catch (err) { toast(err.message, 'error'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100dvh', background: theme.bg, transition: 'all 0.3s' }}>
      <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={step === 1 ? onBack : () => setStep(1)} style={{ background: 'none', border: 'none', color: theme.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button onClick={toggle} style={{ width: 36, height: 36, borderRadius: 10, background: theme.surface, border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: theme.textSecondary }}>
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
      
      <div style={{ padding: '40px 20px' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Step {step}/2</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: theme.text, margin: 0 }}>{step === 1 ? 'Create account' : 'Secure access'}</h1>
          <div style={{ height: 3, background: isDark ? 'rgba(255,255,255,0.08)' : '#E8ECEA', borderRadius: 2, marginTop: 16, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: step === 1 ? '50%' : '100%', background: theme.accent, borderRadius: 2, transition: 'width 0.3s' }} />
          </div>
        </div>

        {step === 1 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['first_name', 'First name'], ['last_name', 'Last name']].map(([k, l]) => (
                <div key={k}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>{l}</label>
                  <input type="text" placeholder={k === 'first_name' ? 'John' : 'Doe'} value={form[k]}
                    onChange={e => setForm(f => ({...f, [k]: e.target.value}))}
                    style={{ width: '100%', padding: '13px 14px', borderRadius: 12, background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}`, color: theme.text, fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
                </div>
              ))}
            </div>
            {['email', 'username'].map(k => (
              <div key={k}>
                <label style={{ fontSize: 11, fontWeight: 700, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>{k === 'email' ? 'Email' : 'Username'}</label>
                <input type={k === 'email' ? 'email' : 'text'} placeholder={k === 'email' ? 'you@example.com' : '@username'} value={form[k]}
                  onChange={e => setForm(f => ({...f, [k]: e.target.value}))}
                  style={{ width: '100%', padding: '13px 14px', borderRadius: 12, background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}`, color: theme.text, fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
              </div>
            ))}
            <button onClick={() => validate1() && setStep(2)} style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: theme.accent, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 }}>
              Continue
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {['password', 'password2'].map(k => (
              <div key={k}>
                <label style={{ fontSize: 11, fontWeight: 700, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>{k === 'password' ? 'Password' : 'Confirm password'}</label>
                <input type="password" placeholder="••••••••" value={form[k]}
                  onChange={e => setForm(f => ({...f, [k]: e.target.value}))}
                  style={{ width: '100%', padding: '13px 14px', borderRadius: 12, background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}`, color: theme.text, fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
              </div>
            ))}
            <button onClick={submit} disabled={loading} style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: theme.accent, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8, opacity: loading ? 0.6 : 1 }}>
              {loading ? <Loader2 size={18} className="spin" /> : 'Create account'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ROUTER
// ═══════════════════════════════════════════════════════════
export function AppRouter() {
  const { isAuth } = useAuth();
  const [screen, setScreen] = useState(isAuth ? 'home' : 'landing');
  const [stack, setStack] = useState([]);
  const [data, setData] = useState(null);

  const navigate = (to, d = null) => { setStack(s => [...s, screen]); setScreen(to); setData(d); };
  const goBack = () => { const prev = stack[stack.length - 1] || 'home'; setStack(s => s.slice(0, -1)); setScreen(prev); setData(null); };

  if (!isAuth) {
    if (screen === 'login') return <LoginScreen onBack={goBack} onSuccess={() => { setScreen('home'); setStack([]); }} onRegister={() => setScreen('register')} />;
    if (screen === 'register') return <RegisterScreen onBack={goBack} onSuccess={() => setScreen('login')} />;
    return <LandingScreen onLogin={() => navigate('login')} onRegister={() => navigate('register')} />;
  }

  return (
    <div className="app-shell">
      {screen === 'home' && <HomeScreen onNavigate={navigate} />}
      {screen === 'history' && <HistoryScreen onBack={goBack} onTxClick={tx => navigate('txDetail', tx)} />}
      {screen === 'send' && <SendScreen onBack={goBack} />}
      {screen === 'receive' && <ReceiveScreen onBack={goBack} />}
      {screen === 'profile' && <ProfileScreen onNavigate={navigate} />}
      {screen === 'txDetail' && <TransferDetailScreen tx={data} onBack={goBack} />}
    </div>
  );
}
