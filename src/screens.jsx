// ═══════════════════════════════════════════════════════════
// SCREENS.JSX - CORRIGÉ (tous les imports + tous les écrans)
// ═══════════════════════════════════════════════════════════
import { useState, useEffect, useCallback } from 'react';
import {
  Home, ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Clock,
  User, Settings, Bell, ChevronRight, Eye, EyeOff,
  Copy, Check, RefreshCw, AlertTriangle, LogOut, Lock,
  Wallet, Shield, BarChart3, Layers, Phone, Mail,
  CheckCircle2, Loader2, Filter, Activity, Zap, Send, Download,
  CreditCard, Globe, X, Sparkles, ArrowRight, TrendingUp,
  Sun, Moon, Plus, Star, Search
} from 'lucide-react';
import { api } from './api';
import { API, APP, CURRENCY } from './config';
import { useAuth } from './auth';
import { useToast, Avatar, BackBtn, StatusBadge, EmptyState, Toggle } from './components';
import { useTheme } from './theme';
import { formatAmount, formatDate, formatTime, truncate } from './utils';

// ═══════════════════════════════════════════════════════════
// LANDING SCREEN
// ═══════════════════════════════════════════════════════════
export function LandingScreen({ onLogin, onRegister }) {
  const { theme, isDark, toggle } = useTheme();

  return (
    <div style={{
      minHeight: '100dvh',
      background: isDark 
        ? '#0A0D0F' 
        : 'linear-gradient(180deg, #FFFFFF 0%, #F8FAF9 40%, #EDF5F0 70%, #FCFAF7 100%)',
      fontFamily: "'Inter', 'Sora', sans-serif",
      display: 'flex', flexDirection: 'column',
      transition: 'background 0.4s ease',
      position: 'relative', overflow: 'hidden',
    }}>
      
      {/* Vert qui se mélange au blanc - effet aurore */}
      {!isDark && (
        <>
          <div style={{
            position: 'absolute', top: '-80px', right: '-60px',
            width: 280, height: 280, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(11,107,92,0.08) 0%, rgba(16,160,132,0.04) 40%, transparent 70%)',
            pointerEvents: 'none', filter: 'blur(20px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '20%', left: '-40px',
            width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,180,154,0.06) 0%, transparent 70%)',
            pointerEvents: 'none', filter: 'blur(20px)',
          }} />
        </>
      )}

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px',
        background: isDark ? 'rgba(10,13,15,0.9)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
        position: 'relative', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={APP.logo} alt="NexCliq" style={{ width: 24, height: 24, borderRadius: 6, objectFit: 'cover' }} />
          <span style={{ fontSize: 16, fontWeight: 800, color: isDark ? '#EDF0F2' : '#111815', letterSpacing: -0.3 }}>
            nexcli<span style={{ color: '#C4B49A' }}>q</span>
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={toggle} style={{
            width: 36, height: 36, borderRadius: 10,
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            border: 'none', cursor: 'pointer',
            color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={onLogin} style={{
            padding: '8px 18px', borderRadius: 8,
            border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
            background: 'transparent',
            color: isDark ? '#ccc' : '#444',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
          }}>Login</button>
          <button onClick={onRegister} style={{
            padding: '8px 18px', borderRadius: 8, border: 'none',
            background: '#0B6B5C', color: '#fff',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>Sign Up</button>
        </div>
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <div style={{ flex: 1, padding: '40px 20px 0', maxWidth: 440, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        
        <h1 style={{
          fontSize: 38, fontWeight: 800, lineHeight: 1.12,
          color: isDark ? '#EDF0F2' : '#0D1A15',
          letterSpacing: -1.5, margin: '0 0 14px 0'
        }}>
          Pay and Receive<br />
          <span style={{ color: '#0B6B5C' }}>anywhere</span> with ease
        </h1>
        
        <p style={{
          fontSize: 14, color: isDark ? '#7B8A99' : '#5D6E68',
          lineHeight: 1.7, marginBottom: 28,
        }}>
          Transfer money, pay online and get paid without limitation.
          Fast, secure, and reconciled automatically.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <button onClick={onRegister} style={{
            padding: '14px 26px', borderRadius: 10, border: 'none',
            background: '#0B6B5C', color: '#fff',
            fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Get Started
          </button>
          <button style={{
            padding: '14px 26px', borderRadius: 10,
            border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
            background: 'transparent',
            color: isDark ? 'rgba(255,255,255,0.7)' : '#444',
            fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Contact a Team
          </button>
        </div>

        {/* ═══════ IMAGE - Flyer bien visible ═══════ */}
        <div style={{
          width: '100%', height: 220, borderRadius: 16,
          overflow: 'hidden', marginBottom: 28,
          boxShadow: isDark 
            ? '0 4px 24px rgba(0,0,0,0.3)' 
            : '0 4px 24px rgba(11,107,92,0.08)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(11,107,92,0.06)'}`,
        }}>
          <img 
            src="https://eliteprotech-url.zone.id/1778436354039dvorw8.jpg"
            alt="NexCliq App"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* ═══════ ABOUT CARDS - Remplacent les prix ═══════ */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: isDark ? '#EDF0F2' : '#0D1A15', marginBottom: 10, letterSpacing: -0.3 }}>
            About
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            {[
              { icon: <Zap size={20} color="#0B6B5C" />, title: 'Fast Transfer', sub: 'Less than 30 seconds per transaction' },
              { icon: <Shield size={20} color="#0B6B5C" />, title: 'Secure', sub: 'End-to-end encrypted transfers' },
              { icon: <Globe size={20} color="#0B6B5C" />, title: 'Multi-network', sub: 'MTN MoMo & Orange Money' },
              { icon: <CheckCircle2 size={20} color="#0B6B5C" />, title: 'Reconciled', sub: '0% data loss guaranteed' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: 18, borderRadius: 16,
                background: isDark ? '#14181B' : '#FFFFFF',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#E8ECEA'}`,
              }}>
                <div style={{ marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: isDark ? '#EDF0F2' : '#0D1A15', marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: isDark ? '#7B8A99' : '#6B7B74', lineHeight: 1.5 }}>{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Mission Card */}
          <div style={{
            padding: 20, borderRadius: 16,
            background: isDark ? '#14181B' : '#FFFFFF',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#E8ECEA'}`,
            marginBottom: 36,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: isDark ? '#7B8A99' : '#999', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
                  Our Mission
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0B6B5C' }}>
                  Resume growth
                </div>
              </div>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: isDark ? 'rgba(11,107,92,0.15)' : '#EDF5F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <TrendingUp size={18} color="#0B6B5C" />
              </div>
            </div>
            <p style={{ fontSize: 13, color: isDark ? '#7B8A99' : '#6B7B74', lineHeight: 1.6, margin: 0 }}>
              We help freelancers and businesses receive and send money across Africa — fast, secure, and reconciled automatically.
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center', padding: '20px',
        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
        position: 'relative', zIndex: 1,
      }}>
        <p style={{ fontSize: 11, color: isDark ? 'rgba(255,255,255,0.25)' : '#BBB', margin: 0 }}>
          Powered by <span style={{ fontWeight: 700, color: isDark ? 'rgba(255,255,255,0.35)' : '#999' }}>{APP.company}</span>
        </p>
      </div>

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
    if (!form.email) e.email = 'Email requis';
    if (!form.password) e.password = 'Mot de passe requis';
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try { await login(form.email, form.password); toast('Bienvenue !', 'success'); onSuccess(); }
    catch (err) { toast(err.message, 'error'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#060C0A' }}>
      <div style={{ padding: '16px 18px', display: 'flex', justifyContent: 'space-between' }}>
        <BackBtn onClick={onBack} />
        <button onClick={toggle} style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
      <div style={{ padding: '40px 18px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#E8EDF2', marginBottom: 28 }}>Bon retour !</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#7B8A99', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Email</label>
            <input type="email" placeholder="vous@exemple.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} style={{ width: '100%', padding: '14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#7B8A99', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Mot de passe</label>
            <div style={{ position: 'relative' }}>
              <input type={showPwd ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} style={{ width: '100%', padding: '14px 44px 14px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
              <button onClick={() => setShowPwd(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#7B8A99', cursor: 'pointer' }}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button onClick={submit} disabled={loading} style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: '#0B6B5C', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 }}>
            {loading ? <Loader2 size={18} className="spin" /> : 'Se connecter'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#7B8A99' }}>
            Pas de compte ? <span onClick={onRegister} style={{ color: '#34D399', cursor: 'pointer', fontWeight: 600 }}>S'inscrire</span>
          </p>
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
  const { isDark, toggle } = useTheme();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', username: '', phone: '', password: '', password2: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate1 = () => {
    const e = {};
    if (!form.first_name) e.first_name = 'Requis';
    if (!form.last_name) e.last_name = 'Requis';
    if (!form.email) e.email = 'Requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (!form.username || form.username.length < 3) e.username = 'Min 3 caractères';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const validate2 = () => {
    const e = {};
    if (!form.password || form.password.length < 8) e.password = 'Min 8 caractères';
    if (form.password !== form.password2) e.password2 = 'Ne correspondent pas';
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
    <div style={{ minHeight: '100dvh', background: '#060C0A' }}>
      <div style={{ padding: '16px 18px', display: 'flex', justifyContent: 'space-between' }}>
        <BackBtn onClick={step === 1 ? onBack : () => setStep(1)} />
        <button onClick={toggle} style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
      <div style={{ padding: '40px 18px' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#7B8A99', textTransform: 'uppercase', marginBottom: 4 }}>Étape {step}/2</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#E8EDF2', margin: 0 }}>{step === 1 ? 'Créer un compte' : 'Sécuriser l\'accès'}</h1>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginTop: 16, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: step === 1 ? '50%' : '100%', background: '#0B6B5C', borderRadius: 2, transition: 'width 0.3s' }} />
          </div>
        </div>
        {step === 1 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['first_name', 'Prénom'], ['last_name', 'Nom']].map(([k, l]) => (
                <div key={k}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#7B8A99', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{l}</label>
                  <input placeholder={k === 'first_name' ? 'Jean' : 'Dupont'} value={form[k]} onChange={e => setForm(f => ({...f, [k]: e.target.value}))} style={{ width: '100%', padding: '13px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
                </div>
              ))}
            </div>
            {['email', 'username'].map(k => (
              <div key={k}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#7B8A99', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{k === 'email' ? 'Email' : 'Nom d\'utilisateur'}</label>
                <input type={k === 'email' ? 'email' : 'text'} placeholder={k === 'email' ? 'vous@exemple.com' : '@pseudo'} value={form[k]} onChange={e => setForm(f => ({...f, [k]: e.target.value}))} style={{ width: '100%', padding: '13px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
              </div>
            ))}
            <button onClick={() => validate1() && setStep(2)} style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: '#0B6B5C', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 }}>
              Continuer <ChevronRight size={15} style={{ marginLeft: 4 }} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['password', 'password2'].map(k => (
              <div key={k}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#7B8A99', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{k === 'password' ? 'Mot de passe' : 'Confirmer'}</label>
                <input type="password" placeholder="••••••••" value={form[k]} onChange={e => setForm(f => ({...f, [k]: e.target.value}))} style={{ width: '100%', padding: '13px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
              </div>
            ))}
            <button onClick={submit} disabled={loading} style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: '#0B6B5C', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 }}>
              {loading ? <Loader2 size={18} className="spin" /> : 'Créer le compte'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// HOME SCREEN
// ═══════════════════════════════════════════════════════════
export function HomeScreen({ onNavigate }) {
  const { user } = useAuth();
  const { isDark, toggle } = useTheme();
  const [wallet, setWallet] = useState(null);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(API.endpoints.wallets).catch(() => null),
      api.get(API.endpoints.transfers + '?limit=5').catch(() => null),
    ]).then(([w, t]) => {
      if (w?.results?.length) setWallet(w.results[0]);
      else if (w) setWallet(w);
      setTransfers(t?.results || []);
    }).finally(() => setLoading(false));
  }, []);

  const name = user?.first_name || user?.username || 'Utilisateur';

  return (
    <div style={{ minHeight: '100dvh', background: '#060C0A', paddingBottom: 100 }}>
      <div style={{ padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(6,12,10,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div>
          <div style={{ fontSize: 11, color: '#7B8A99', fontWeight: 500 }}>Bonjour,</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#E8EDF2' }}>{name}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={toggle} style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button onClick={() => onNavigate('notifications')} style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
            <Bell size={15} />
          </button>
        </div>
      </div>

      <div style={{ padding: '20px 16px' }}>
        {/* Balance Card */}
        <div style={{ background: 'linear-gradient(145deg, #0B6B5C, #073D34)', borderRadius: 20, padding: '24px 20px', color: '#fff', marginBottom: 16 }}>
          <div style={{ fontSize: 11, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
            {wallet?.provider || 'Main'} card balance
          </div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>
            {loading ? <Loader2 size={24} className="spin" /> : formatAmount(wallet?.balance) || '0 XOF'}
          </div>
          <div style={{ fontSize: 11, opacity: 0.5, marginTop: 4 }}>Money hold 2,500 XOF</div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          <button onClick={() => onNavigate('send')} style={{ padding: '16px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#E8EDF2', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Send size={16} />Send
          </button>
          <button onClick={() => onNavigate('receive')} style={{ padding: '16px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#E8EDF2', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Download size={16} />Receive
          </button>
        </div>

        {/* Recent */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#E8EDF2', marginBottom: 8 }}>Transactions récentes</div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 20 }}><Loader2 size={18} className="spin" style={{ color: '#0B6B5C' }} /></div>
          ) : transfers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 20, color: '#7B8A99', fontSize: 13 }}>Aucune transaction</div>
          ) : (
            <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              {transfers.map((tx, i) => (
                <div key={tx.id || i} onClick={() => onNavigate('txDetail', tx)} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer', borderBottom: i < transfers.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#E8EDF2' }}>{tx.receiver_phone || tx.sender_phone || 'Transfert'}</div>
                    <div style={{ fontSize: 10, color: '#7B8A99', marginTop: 2 }}>{formatDate(tx.created_at)}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: tx.direction === 'IN' ? '#34D399' : '#E8EDF2' }}>
                    {tx.direction === 'IN' ? '+' : '−'}{formatAmount(tx.amount, tx.currency)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <nav style={{ position: 'fixed', bottom: 12, left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 24px)', maxWidth: 456, background: 'rgba(6,12,10,0.9)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, display: 'flex', justifyContent: 'space-around', padding: '10px 8px' }}>
        {[
          { id: 'home', icon: <Home size={20} />, label: 'Home' },
          { id: 'history', icon: <Clock size={20} />, label: 'History' },
          { id: 'send', icon: <Send size={20} />, label: 'Send' },
          { id: 'profile', icon: <User size={20} />, label: 'Profile' },
        ].map(item => (
          <button key={item.id} onClick={() => onNavigate(item.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', color: '#7B8A99', cursor: 'pointer', fontFamily: 'inherit' }}>
            {item.icon}
            <span style={{ fontSize: 10, fontWeight: 600 }}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// HISTORY SCREEN
// ═══════════════════════════════════════════════════════════
export function HistoryScreen({ onBack, onTxClick }) {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(API.endpoints.transfers)
      .then(d => setTransfers(d?.results || (Array.isArray(d) ? d : [])))
      .catch(() => setTransfers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: '100dvh', background: '#060C0A' }}>
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(6,12,10,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 100 }}>
        <BackBtn onClick={onBack} />
        <span style={{ fontSize: 16, fontWeight: 700, color: '#E8EDF2' }}>Historique</span>
      </div>
      <div style={{ padding: '16px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 32 }}><Loader2 size={20} className="spin" style={{ color: '#0B6B5C' }} /></div>
        ) : transfers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 32, color: '#7B8A99' }}>Aucune transaction</div>
        ) : (
          <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            {transfers.map((tx, i) => (
              <div key={tx.id || i} onClick={() => onTxClick?.(tx)} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer', borderBottom: i < transfers.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#E8EDF2' }}>{tx.receiver_phone || tx.sender_phone || 'Transfert'}</div>
                  <div style={{ fontSize: 10, color: '#7B8A99', marginTop: 2 }}>{formatDate(tx.created_at)}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: tx.direction === 'IN' ? '#34D399' : '#E8EDF2' }}>
                  {tx.direction === 'IN' ? '+' : '−'}{formatAmount(tx.amount, tx.currency)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SEND SCREEN
// ═══════════════════════════════════════════════════════════
export function SendScreen({ onBack }) {
  const toast = useToast();
  const { isDark, toggle } = useTheme();
  const [step, setStep] = useState(1);
  const [provider, setProvider] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const providers = [
    { id: 'MTN', label: 'MTN MoMo', sub: 'Mobile Money', color: '#D4870A', bg: 'rgba(212,135,10,0.1)' },
    { id: 'ORANGE', label: 'Orange Money', sub: 'Orange Money', color: '#FF6600', bg: 'rgba(255,102,0,0.1)' },
  ];

  const appendDigit = (d) => {
    if (d === 'del') { setAmount(a => a.slice(0, -1)); return; }
    if (d === '000') { setAmount(a => a ? a + '000' : ''); return; }
    if (amount.length >= 9) return;
    setAmount(a => a + d);
  };

  const submit = async () => {
    if (!phone || !amount || !provider) return;
    setLoading(true);
    try {
      const data = await api.post(API.endpoints.transfers, { receiver_phone: phone, amount: Number(amount), provider_to: provider, note });
      setResult(data); setStep(4);
      toast('Transfert initié !', 'success');
    } catch (err) { toast(err.message, 'error'); }
    finally { setLoading(false); }
  };

  if (step === 4 && result) return (
    <div style={{ minHeight: '100dvh', background: '#060C0A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 20 }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckCircle2 size={32} color="#10B981" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: '#fff' }}>{formatAmount(result.amount || amount)}</div>
        <div style={{ fontSize: 14, color: '#7B8A99', marginTop: 6 }}>Envoyé vers {result.receiver_phone || phone}</div>
      </div>
      <button onClick={onBack} style={{ padding: '15px 24px', borderRadius: 12, background: '#0B6B5C', color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>Retour</button>
    </div>
  );

  return (
    <div style={{ minHeight: '100dvh', background: '#060C0A' }}>
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(6,12,10,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 100 }}>
        <BackBtn onClick={step === 1 ? onBack : () => setStep(s => s - 1)} />
        <span style={{ fontSize: 16, fontWeight: 700, color: '#E8EDF2' }}>Envoyer</span>
        <button onClick={toggle} style={{ marginLeft: 'auto', width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>

      <div style={{ padding: '20px 16px' }}>
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#E8EDF2', marginBottom: 10 }}>Choisir le réseau</div>
              {providers.map(p => (
                <div key={p.id} onClick={() => setProvider(p.id)} style={{ padding: '14px 16px', marginBottom: 8, borderRadius: 14, background: p.bg, border: provider === p.id ? `2px solid ${p.color}` : '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: p.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: p.color, fontSize: 16 }}>{p.id[0]}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#E8EDF2' }}>{p.label}</div>
                    <div style={{ fontSize: 11, color: '#7B8A99' }}>{p.sub}</div>
                  </div>
                  {provider === p.id && <Check size={16} color={p.color} style={{ marginLeft: 'auto' }} />}
                </div>
              ))}
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#7B8A99', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Numéro du destinataire</label>
              <input type="tel" placeholder="+221 7X XXX XX XX" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#7B8A99', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Note</label>
              <input placeholder="Pour quoi ?" value={note} onChange={e => setNote(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
            </div>
            <button onClick={() => { provider && phone ? setStep(2) : toast('Champs requis', 'error'); }} disabled={!provider || !phone} style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: '#0B6B5C', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: !provider || !phone ? 0.5 : 1 }}>
              Continuer <ChevronRight size={15} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#7B8A99', marginBottom: 6 }}>Montant à envoyer</div>
              <div style={{ fontSize: 44, fontWeight: 800, color: '#fff' }}><sup style={{ fontSize: 18 }}>XOF </sup>{amount || '0'}</div>
              <div style={{ fontSize: 12, color: '#7B8A99', marginTop: 6 }}>→ {phone} · {provider}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {['1','2','3','4','5','6','7','8','9','000','0','del'].map(k => (
                <div key={k} onClick={() => appendDigit(k)} style={{ height: 56, borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: k === 'del' ? 13 : 20, fontWeight: 700, color: '#fff', cursor: 'pointer', userSelect: 'none' }}>
                  {k === 'del' ? '⌫' : k}
                </div>
              ))}
            </div>
            <button onClick={() => Number(amount) > 0 ? setStep(3) : toast('Saisir un montant', 'error')} disabled={!amount} style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: '#0B6B5C', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: !amount ? 0.5 : 1 }}>
              Continuer <ChevronRight size={15} />
            </button>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'linear-gradient(145deg, #0B6B5C, #073D34)', borderRadius: 20, padding: '24px 20px', color: '#fff' }}>
              <div style={{ fontSize: 11, opacity: 0.7 }}>Vous envoyez</div>
              <div style={{ fontSize: 34, fontWeight: 800 }}><sup style={{ fontSize: 16 }}>XOF </sup>{Number(amount).toLocaleString('fr-FR')}</div>
            </div>
            <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px' }}>
              {[['Destinataire', phone], ['Réseau', provider], ['Note', note || '—']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: 13, color: '#7B8A99' }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#E8EDF2' }}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={submit} disabled={loading} style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: '#0B6B5C', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              {loading ? <Loader2 size={18} className="spin" /> : 'Confirmer l\'envoi'}
            </button>
            <button onClick={() => setStep(2)} style={{ padding: '14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#7B8A99', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Modifier le montant</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// RECEIVE SCREEN
// ═══════════════════════════════════════════════════════════
export function ReceiveScreen({ onBack }) {
  const { user } = useAuth();
  const { isDark, toggle } = useTheme();
  const [copied, setCopied] = useState(false);
  const phone = user?.phone || 'Non renseigné';

  const copy = () => {
    navigator.clipboard.writeText(phone).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#060C0A' }}>
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(6,12,10,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <BackBtn onClick={onBack} />
        <span style={{ fontSize: 16, fontWeight: 700, color: '#E8EDF2' }}>Recevoir</span>
        <button onClick={toggle} style={{ marginLeft: 'auto', width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', gap: 24 }}>
        <div style={{ fontSize: 14, color: '#7B8A99', textAlign: 'center' }}>Partagez votre numéro pour recevoir des fonds</div>
        <div style={{ width: 140, height: 140, borderRadius: 30, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Phone size={48} color="#0B6B5C" />
        </div>
        <div style={{ width: '100%', padding: 18, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#7B8A99', marginBottom: 6 }}>Votre numéro</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#E8EDF2', fontFamily: "'JetBrains Mono', monospace" }}>{phone}</div>
        </div>
        <button onClick={copy} style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: '#0B6B5C', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {copied ? <><Check size={16} />Copié !</> : <><Copy size={16} />Copier le numéro</>}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TRANSFER DETAIL SCREEN
// ═══════════════════════════════════════════════════════════
export function TransferDetailScreen({ tx, onBack }) {
  const [detail, setDetail] = useState(tx);
  const [loading, setLoading] = useState(false);

  const refresh = () => {
    if (!tx?.id) return;
    setLoading(true);
    api.get(API.endpoints.transferStatus(tx.id)).then(setDetail).finally(() => setLoading(false));
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#060C0A' }}>
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(6,12,10,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <BackBtn onClick={onBack} />
        <span style={{ fontSize: 16, fontWeight: 700, color: '#E8EDF2' }}>Détail</span>
        <button onClick={refresh} disabled={loading} style={{ marginLeft: 'auto', width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
          {loading ? <Loader2 size={14} className="spin" /> : <RefreshCw size={14} />}
        </button>
      </div>
      <div style={{ padding: '24px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 34, fontWeight: 800, color: '#fff' }}>{formatAmount(detail?.amount, detail?.currency)}</div>
          <div style={{ marginTop: 8 }}><StatusBadge status={detail?.status || 'PENDING'} /></div>
        </div>
        <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '0 16px' }}>
          {[
            ['ID', detail?.id], ['Montant', formatAmount(detail?.amount)], ['Statut', detail?.status],
            ['Expéditeur', detail?.sender_phone], ['Destinataire', detail?.receiver_phone],
            ['Date', detail?.created_at ? formatDate(detail.created_at) : '—'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize: 13, color: '#7B8A99' }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#E8EDF2' }}>{v || '—'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PROFILE SCREEN
// ═══════════════════════════════════════════════════════════
export function ProfileScreen({ onNavigate }) {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const name = `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || user?.username || 'Utilisateur';

  return (
    <div style={{ minHeight: '100dvh', background: '#060C0A' }}>
      <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', background: 'rgba(6,12,10,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#E8EDF2' }}>Profil</span>
        <button onClick={toggle} style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(11,107,92,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontWeight: 700, fontSize: 22, color: '#34D399' }}>{(name || 'U')[0]}</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#E8EDF2' }}>{name}</div>
          <div style={{ fontSize: 13, color: '#7B8A99', marginTop: 2 }}>{user?.email}</div>
        </div>
        {[
          { icon: <Lock size={16} />, label: 'Mot de passe', action: () => onNavigate('changePassword') },
          { icon: <Wallet size={16} />, label: 'Portefeuilles', action: () => onNavigate('wallets') },
          { icon: <Clock size={16} />, label: 'Historique', action: () => onNavigate('history') },
          { icon: <Settings size={16} />, label: 'Paramètres', action: () => onNavigate('settings') },
        ].map((item, i) => (
          <div key={i} onClick={item.action} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(11,107,92,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34D399' }}>{item.icon}</div>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#E8EDF2' }}>{item.label}</span>
            </div>
            <ChevronRight size={16} color="#7B8A99" />
          </div>
        ))}
        <button onClick={logout} style={{ width: '100%', padding: '15px', borderRadius: 12, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.05)', color: '#EF4444', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <LogOut size={16} />Déconnexion
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// APP ROUTER
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
