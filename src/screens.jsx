import { useState, useEffect, useCallback } from 'react';
import {
  Home, ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Clock,
  User, Settings, Bell, ChevronRight, Eye, EyeOff,
  Copy, Check, RefreshCw, AlertTriangle, LogOut, Lock,
  Wallet, Shield, BarChart3, Layers, Phone, Mail,
  CheckCircle2, Loader2, Filter, Activity, Zap, Send, Download,
  CreditCard, Globe, X, Sparkles, ArrowRight
} from 'lucide-react';
import { api } from './api';
import { API, APP, CURRENCY } from './config';
import { useAuth } from './auth';
import { useToast, Avatar, BackBtn, StatusBadge, EmptyState, Toggle } from './components';
import { formatAmount, formatDate, formatTime, getInitials, truncate } from './utils';
import { validators } from './validators';

// ═══════════════════════════════════════════════════════════
// LANDING SCREEN
// ═══════════════════════════════════════════════════════════
export function LandingScreen({ onLogin, onRegister }) {
  return (
    <div className="landing-bg page">
      <div className="orb" style={{ top: -60, right: -40, width: 260, height: 260, background: 'radial-gradient(circle, rgba(16,160,132,0.3), transparent 70%)' }} />
      <div className="orb" style={{ bottom: 100, left: -50, width: 220, height: 220, background: 'radial-gradient(circle, rgba(196,180,154,0.12), transparent 70%)', animationDelay: '2s' }} />

      <div className="row gap-2" style={{ position: 'relative', zIndex: 1, marginBottom: 20 }}>
        <img src={APP.logo} alt={APP.name} style={{ width: 40, height: 40, borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(196,180,154,0.3)' }} />
        <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
          nexcli<span style={{ color: 'var(--sand)' }}>q</span>
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28, position: 'relative', zIndex: 1 }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.1, color: '#fff', letterSpacing: -1.5, margin: 0 }}>
            Pay and Receive<br />
            <span style={{ color: 'var(--sand)' }}>anywhere</span><br />
            with ease
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 12, lineHeight: 1.6 }}>
            {APP.description}
          </p>
        </div>

        <div className="bento bento-2" style={{ gap: 6 }}>
          {[
            ['2M+', 'Transactions', '#34D399'],
            ['< 30s', 'Délai moyen', '#C4B49A'],
            ['99.9%', 'Disponibilité', '#5ED5C1'],
            ['0 perte', 'Réconciliation', '#34D399'],
          ].map(([v, l, c]) => (
            <div key={l} className="glass-dark" style={{ padding: '16px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: c }}>{v}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="stack gap-3" style={{ position: 'relative', zIndex: 1 }}>
        <button className="btn btn-primary" onClick={onRegister} style={{ background: '#fff', color: 'var(--teal)', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}>
          Créer un compte <ArrowRight size={15} />
        </button>
        <button onClick={onLogin} style={{
          background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16,
          padding: 16, color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit', width: '100%'
        }}>
          Se connecter
        </button>
      </div>

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 10, color: 'rgba(255,255,255,0.2)', position: 'relative', zIndex: 1 }}>
        by <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>{APP.company}</span>
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// LOGIN SCREEN
// ═══════════════════════════════════════════════════════════
export function LoginScreen({ onBack, onSuccess, onRegister }) {
  const { login } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    setErrors(er => ({ ...er, [k]: '' }));
  };

  const submit = async () => {
    const e = {};
    if (!form.email) e.email = 'Email requis';
    if (!form.password) e.password = 'Mot de passe requis';
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    try {
      await login(form.email, form.password);
      toast('Bienvenue !', 'success');
      onSuccess();
    } catch (err) {
      toast(err.message, 'error');
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div style={{
        background: 'linear-gradient(160deg, #042F2A, #0B6B5C, #040F0C)',
        backgroundSize: '200% 200%', animation: 'gradient 8s ease infinite',
        padding: '50px 20px 32px', position: 'relative', overflow: 'hidden',
      }}>
        <div className="orb" style={{ top: -30, right: -30, width: 160, height: 160, background: 'radial-gradient(circle, rgba(196,180,154,0.15), transparent 70%)' }} />
        <div style={{ marginBottom: 16 }}><BackBtn onClick={onBack} /></div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6, position: 'relative', zIndex: 1 }}>
          Connexion
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: -1, position: 'relative', zIndex: 1 }}>
          Bon retour !
        </div>
      </div>

      <div className="screen pt-4 stack gap-4">
        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="input-wrap">
            <Mail size={15} className="input-icon-l" />
            <input className={`form-input pl-44 ${errors.email ? 'error' : ''}`} type="email"
              placeholder="vous@exemple.com" value={form.email} onChange={set('email')}
              autoComplete="email" />
          </div>
          {errors.email && <span className="text-xs c-red">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Mot de passe</label>
          <div className="input-wrap">
            <Lock size={15} className="input-icon-l" />
            <input className={`form-input pl-44 pr-44 ${errors.password ? 'error' : ''}`}
              type={showPwd ? 'text' : 'password'} placeholder="••••••••"
              value={form.password} onChange={set('password')}
              onKeyDown={e => e.key === 'Enter' && submit()}
              autoComplete="current-password" />
            <span className="input-icon-r" onClick={() => setShowPwd(s => !s)}>
              {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
            </span>
          </div>
          {errors.password && <span className="text-xs c-red">{errors.password}</span>}
        </div>

        {errors.general && (
          <div className="text-xs c-red row gap-2 center">
            <AlertTriangle size={11} />{errors.general}
          </div>
        )}

        <button className="btn btn-primary" onClick={submit} disabled={loading}>
          {loading ? <Loader2 size={17} className="spin" /> : 'Se connecter'}
        </button>

        <p style={{ textAlign: 'center', fontSize: 13 }}>
          <span className="c-muted">Pas de compte ? </span>
          <span className="c-teal fw-600" style={{ cursor: 'pointer' }} onClick={onRegister}>S'inscrire</span>
        </p>
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
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', username: '',
    phone: '', password: '', password2: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    setErrors(er => ({ ...er, [k]: '' }));
  };

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
    try {
      await register(form);
      onSuccess();
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div style={{
        background: 'linear-gradient(160deg, #042F2A, #0B6B5C, #040F0C)',
        backgroundSize: '200% 200%', animation: 'gradient 8s ease infinite',
        padding: '50px 20px 32px', position: 'relative', overflow: 'hidden', minHeight: 220,
      }}>
        <div className="orb" style={{ top: -30, right: -30, width: 160, height: 160, background: 'radial-gradient(circle, rgba(196,180,154,0.15), transparent 70%)' }} />
        <div style={{ marginBottom: 16 }}><BackBtn onClick={step === 1 ? onBack : () => setStep(1)} /></div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6, position: 'relative', zIndex: 1 }}>
          Étape {step} / 2
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: -1, position: 'relative', zIndex: 1 }}>
          {step === 1 ? 'Créer un compte' : 'Sécuriser l\'accès'}
        </div>
        <div className="prog-track" style={{ marginTop: 16, position: 'relative', zIndex: 1 }}>
          <div className="prog-fill" style={{ width: step === 1 ? '50%' : '100%' }} />
        </div>
      </div>

      <div className="screen pt-4 stack gap-4">
        {step === 1 ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                ['first_name', 'Prénom', 'Jean'],
                ['last_name', 'Nom', 'Dupont']
              ].map(([k, l, p]) => (
                <div className="form-group" key={k}>
                  <label className="form-label">{l}</label>
                  <input className={`form-input ${errors[k] ? 'error' : ''}`}
                    placeholder={p} value={form[k]} onChange={set(k)} />
                  {errors[k] && <span className="text-xs c-red">{errors[k]}</span>}
                </div>
              ))}
            </div>

            {[
              ['email', 'Email', 'email', 'vous@exemple.com'],
              ['username', 'Nom d\'utilisateur', 'text', '@pseudo']
            ].map(([k, l, t, p]) => (
              <div className="form-group" key={k}>
                <label className="form-label">{l}</label>
                <input className={`form-input ${errors[k] ? 'error' : ''}`}
                  type={t} placeholder={p} value={form[k]} onChange={set(k)} />
                {errors[k] && <span className="text-xs c-red">{errors[k]}</span>}
              </div>
            ))}

            <div className="form-group">
              <label className="form-label">Téléphone <span className="c-light">(optionnel)</span></label>
              <div className="input-wrap">
                <Phone size={15} className="input-icon-l" />
                <input className="form-input pl-44" type="tel" placeholder="+221 7X XXX XX XX"
                  value={form.phone} onChange={set('phone')} />
              </div>
            </div>

            <button className="btn btn-primary" onClick={() => validate1() && setStep(2)}>
              Continuer <ChevronRight size={15} />
            </button>
          </>
        ) : (
          <>
            {[
              ['password', 'Mot de passe'],
              ['password2', 'Confirmer']
            ].map(([k, l]) => (
              <div className="form-group" key={k}>
                <label className="form-label">{l}</label>
                <div className="input-wrap">
                  <Lock size={15} className="input-icon-l" />
                  <input
                    className={`form-input pl-44 ${k === 'password' ? 'pr-44' : ''} ${errors[k] ? 'error' : ''}`}
                    type={(k === 'password' && showPwd) ? 'text' : 'password'}
                    placeholder="••••••••" value={form[k]} onChange={set(k)} />
                  {k === 'password' && (
                    <span className="input-icon-r" onClick={() => setShowPwd(s => !s)}>
                      {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                    </span>
                  )}
                </div>
                {errors[k] && <span className="text-xs c-red">{errors[k]}</span>}
              </div>
            ))}
            <button className="btn btn-primary" onClick={submit} disabled={loading}>
              {loading ? <Loader2 size={17} className="spin" /> : 'Créer le compte'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// HOME SCREEN - BENTO GRID
// ═══════════════════════════════════════════════════════════
export function HomeScreen({ onNavigate }) {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(API.endpoints.wallets).catch(() => null),
      api.get(API.endpoints.transfers + '?limit=5').catch(() => null),
    ]).then(([w, t]) => {
      if (w?.results?.length) setWallet(w.results[0]);
      else if (w && !w.results) setWallet(w);
      setTransfers(t?.results || (Array.isArray(t) ? t : []));
    }).finally(() => setLoading(false));
  }, []);

  const name = user?.first_name || user?.username || 'Utilisateur';

  return (
    <div className="page">
      <div className="screen-header">
        <div>
          <div style={{ fontSize: 10, color: 'var(--light)', fontWeight: 500 }}>Bonjour,</div>
          <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.3 }}>{name}</div>
        </div>
        <div className="row gap-2">
          <button className="btn-icon" onClick={() => onNavigate('notifications')}>
            <Bell size={16} />
          </button>
          <Avatar name={name} size={36} />
        </div>
      </div>

      <div className="screen pt-4">
        {/* Wallet Hero */}
        <div className="wallet-hero" style={{ marginBottom: 16 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 500, marginBottom: 6 }}>
              {wallet?.provider || 'Portefeuille'} · {wallet?.status || 'Actif'}
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#fff', letterSpacing: -1.5, marginBottom: 14 }}>
              {loading
                ? <Loader2 size={22} className="spin" style={{ color: 'rgba(255,255,255,0.4)' }} />
                : wallet?.balance != null
                  ? <><sup style={{ fontSize: 14, fontWeight: 600 }}>XOF</sup> {new Intl.NumberFormat('fr-FR').format(wallet.balance)}</>
                  : '—'
              }
            </div>
            <div className="row gap-2">
              <button onClick={() => onNavigate('send')} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                padding: '11px', borderRadius: 12, background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.12)', color: '#fff',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <Send size={13} />Envoyer
              </button>
              <button onClick={() => onNavigate('receive')} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                padding: '11px', borderRadius: 12, background: 'rgba(196,180,154,0.12)',
                border: '1px solid rgba(196,180,154,0.2)', color: 'var(--sand)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <Download size={13} />Recevoir
              </button>
            </div>
          </div>
        </div>

        {/* Bento Quick Actions */}
        <div className="bento bento-4" style={{ marginBottom: 16 }}>
          {[
            { icon: <Send size={18} />, label: 'Envoyer', action: 'send', color: '#0B6B5C' },
            { icon: <Download size={18} />, label: 'Recevoir', action: 'receive', color: '#D4870A' },
            { icon: <CreditCard size={18} />, label: 'Payer', action: 'send', color: '#7C5CBF' },
            { icon: <Clock size={18} />, label: 'Historique', action: 'history', color: '#6B7B74' },
          ].map(q => (
            <div key={q.label} className="bento-card" onClick={() => onNavigate(q.action)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}>
              <div style={{
                width: 42, height: 42, borderRadius: 14,
                background: `${q.color}10`, color: q.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{q.icon}</div>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)' }}>{q.label}</span>
            </div>
          ))}
        </div>

        {/* Recent */}
        <div className="section-header">
          <span className="section-title">Transactions récentes</span>
          <span className="section-link" onClick={() => onNavigate('history')}>Voir tout</span>
        </div>

        <div className="glass" style={{ padding: '0 14px' }}>
          {loading
            ? <div style={{ padding: '28px 0', display: 'flex', justifyContent: 'center' }}><Loader2 size={20} className="spin" style={{ color: 'var(--teal)' }} /></div>
            : transfers.length === 0
              ? <EmptyState icon={<ArrowLeftRight size={22} />} title="Aucune transaction" sub="Elles apparaîtront ici" />
              : transfers.map((tx, i) => (
                  <div key={tx.id || i} onClick={() => onNavigate('txDetail', tx)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', cursor: 'pointer',
                      borderBottom: i < transfers.length - 1 ? '1px solid rgba(11,107,92,0.04)' : 'none'
                    }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: tx.direction === 'IN' ? 'var(--green-bg)' : 'rgba(11,107,92,0.06)',
                    }}>
                      {tx.direction === 'IN'
                        ? <ArrowDownLeft size={18} color="var(--green)" />
                        : <ArrowUpRight size={18} color="var(--teal)" />
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {truncate(tx.receiver_phone || tx.sender_phone || 'Transfert', 18)}
                      </div>
                      <div className="row gap-2" style={{ marginTop: 2 }}>
                        <span className="text-xs c-light">{tx.provider || 'NexCliq'}</span>
                        {tx.created_at && <span className="text-xs c-light">· {formatDate(tx.created_at)}</span>}
                      </div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: tx.direction === 'IN' ? '#059669' : 'var(--text)' }}>
                      {tx.direction === 'IN' ? '+' : '−'}{formatAmount(tx.amount, tx.currency)}
                    </div>
                  </div>
                ))
          }
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SEND SCREEN
// ═══════════════════════════════════════════════════════════
export function SendScreen({ onBack }) {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [provider, setProvider] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const providers = [
    { id: 'MTN', label: 'MTN MoMo', sub: 'Mobile Money', icon: <Activity size={20} color="#D4870A" />, bg: '#FFF8E8', border: 'rgba(212,135,10,0.12)' },
    { id: 'ORANGE', label: 'Orange Money', sub: 'Orange Money', icon: <Zap size={20} color="#FF6600" />, bg: '#FFF4EE', border: 'rgba(255,102,0,0.12)' },
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
      const data = await api.post(API.endpoints.transfers, {
        receiver_phone: phone, amount: Number(amount), provider_to: provider, note
      });
      setResult(data); setStep(4);
      toast('Transfert initié !', 'success');
    } catch (err) {
      toast(err.message, 'error');
    } finally { setLoading(false); }
  };

  if (step === 4 && result) return (
    <div className="page" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 20 }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--green-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckCircle2 size={32} color="var(--green)" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 800 }}>{formatAmount(result.amount || amount)}</div>
        <div className="text-sm c-muted" style={{ marginTop: 6 }}>Envoyé vers {result.receiver_phone || phone}</div>
        <div style={{ marginTop: 8 }}><StatusBadge status={result.status || 'PENDING'} /></div>
      </div>
      <div className="glass" style={{ width: '100%', padding: '0 14px' }}>
        {[['Référence', result.id || '—'], ['Réseau', provider]].map(([k, v]) => (
          <div key={k} className="row between" style={{ padding: '12px 0', borderBottom: '1px solid rgba(11,107,92,0.04)' }}>
            <span className="text-sm c-muted">{k}</span>
            <span className="text-sm fw-600 mono">{v}</span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={onBack}>Retour à l'accueil</button>
    </div>
  );

  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onClick={step === 1 ? onBack : () => setStep(s => s - 1)} />
        <span className="header-title">Envoyer</span>
        <div style={{ width: 40 }} />
      </div>

      <div className="screen pt-4">
        {step === 1 && (
          <div className="stack gap-4">
            <div>
              <div className="section-title" style={{ marginBottom: 10 }}>Choisir le réseau</div>
              <div className="stack gap-3">
                {providers.map(p => (
                  <div key={p.id} className={`provider-card ${provider === p.id ? 'selected' : ''}`}
                    onClick={() => setProvider(p.id)}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: p.bg, border: `1.5px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {p.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{p.label}</div>
                      <div className="text-xs c-light">{p.sub}</div>
                    </div>
                    {provider === p.id && <Check size={16} color="var(--teal)" style={{ marginLeft: 'auto' }} />}
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Numéro du destinataire</label>
              <div className="input-wrap">
                <Phone size={15} className="input-icon-l" />
                <input className="form-input pl-44" type="tel" placeholder="+221 7X XXX XX XX"
                  value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Note <span className="c-light">(optionnel)</span></label>
              <input className="form-input" placeholder="Pour quoi ?" value={note} onChange={e => setNote(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={() => { provider && phone ? setStep(2) : toast('Champs requis', 'error'); }}
              disabled={!provider || !phone}>
              Continuer <ChevronRight size={15} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="stack gap-4">
            <div style={{ textAlign: 'center', paddingTop: 8 }}>
              <div className="text-sm c-muted" style={{ marginBottom: 6 }}>Montant à envoyer</div>
              <div className="amount-display"><sup>XOF </sup>{amount || '0'}</div>
              <div className="text-xs c-light" style={{ marginTop: 6 }}>→ {phone} · {provider}</div>
            </div>
            <div className="keypad">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '0', 'del'].map(k => (
                <div key={k} className={`key ${k === 'del' ? 'key-del' : ''}`} onClick={() => appendDigit(k)}>
                  {k === 'del' ? <X size={16} /> : k}
                </div>
              ))}
            </div>
            <button className="btn btn-primary" onClick={() => Number(amount) > 0 ? setStep(3) : toast('Saisir un montant', 'error')}
              disabled={!amount || Number(amount) === 0}>
              Continuer <ChevronRight size={15} />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="stack gap-4">
            <div className="wallet-hero">
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 500, marginBottom: 4 }}>Vous envoyez</div>
                <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: -1.5 }}>
                  <sup style={{ fontSize: 14, fontWeight: 600 }}>XOF </sup>
                  {new Intl.NumberFormat('fr-FR').format(Number(amount))}
                </div>
              </div>
            </div>
            <div className="glass" style={{ padding: '0 14px' }}>
              {[['Destinataire', phone], ['Réseau', provider], ['Note', note || '—']].map(([k, v]) => (
                <div key={k} className="row between" style={{ padding: '12px 0', borderBottom: '1px solid rgba(11,107,92,0.04)' }}>
                  <span className="text-sm c-muted">{k}</span>
                  <span className="text-sm fw-600">{v}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" onClick={submit} disabled={loading}>
              {loading ? <Loader2 size={17} className="spin" /> : 'Confirmer l\'envoi'}
            </button>
            <button className="btn btn-glass" onClick={() => setStep(2)}>Modifier le montant</button>
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
  const [copied, setCopied] = useState(false);
  const phone = user?.phone || 'Non renseigné';

  const copy = () => {
    navigator.clipboard.writeText(phone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onClick={onBack} />
        <span className="header-title">Recevoir</span>
        <div style={{ width: 40 }} />
      </div>
      <div className="screen pt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <p className="text-sm c-muted" style={{ textAlign: 'center' }}>Partagez votre numéro pour recevoir des fonds</p>
        <div style={{
          width: 140, height: 140, borderRadius: 28,
          background: 'var(--glass)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 12px 32px rgba(11,107,92,0.06)',
        }}>
          <Phone size={48} strokeWidth={1} color="var(--teal)" />
        </div>
        <div className="glass" style={{ width: '100%', padding: 18, textAlign: 'center' }}>
          <div className="text-xs c-muted" style={{ marginBottom: 6 }}>Votre numéro</div>
          <div className="mono" style={{ fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>{phone}</div>
        </div>
        <button className="btn btn-primary" onClick={copy}>
          {copied ? <><Check size={15} />Copié !</> : <><Copy size={15} />Copier le numéro</>}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// HISTORY SCREEN
// ═══════════════════════════════════════════════════════════
export function HistoryScreen({ onBack, onTxClick }) {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    const status = filter !== 'all' ? `&status=${filter}` : '';
    api.get(`${API.endpoints.transfers}?page=${page}${status}`)
      .then(data => {
        const list = data?.results || (Array.isArray(data) ? data : []);
        setTransfers(page === 1 ? list : t => [...t, ...list]);
        setHasMore(!!data?.next);
      })
      .catch(() => setTransfers([]))
      .finally(() => setLoading(false));
  }, [filter, page]);

  const filters = [
    { id: 'all', label: 'Tout' },
    { id: 'SUCCESSFUL', label: 'Réussi' },
    { id: 'PENDING', label: 'En cours' },
    { id: 'FAILED', label: 'Échoué' },
  ];

  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onClick={onBack} />
        <span className="header-title">Historique</span>
        <div style={{ width: 40 }} />
      </div>
      <div className="screen pt-4">
        <div className="scroll-x" style={{ marginBottom: 14 }}>
          {filters.map(f => (
            <button key={f.id} className={`btn btn-sm ${filter === f.id ? 'btn-primary' : 'btn-glass'}`}
              style={{ flexShrink: 0 }} onClick={() => { setFilter(f.id); setPage(1); setTransfers([]); }}>
              {f.label}
            </button>
          ))}
        </div>

        {loading && page === 1
          ? <div style={{ textAlign: 'center', padding: 32 }}><Loader2 size={20} className="spin" style={{ color: 'var(--teal)' }} /></div>
          : transfers.length === 0
            ? <EmptyState icon={<Filter size={22} />} title="Aucune transaction" />
            : <div className="glass" style={{ padding: '0 14px' }}>
                {transfers.map((tx, i) => (
                  <div key={tx.id || i} onClick={() => onTxClick?.(tx)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', cursor: 'pointer',
                      borderBottom: i < transfers.length - 1 ? '1px solid rgba(11,107,92,0.04)' : 'none'
                    }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: tx.direction === 'IN' ? 'var(--green-bg)' : 'rgba(11,107,92,0.06)',
                    }}>
                      {tx.direction === 'IN'
                        ? <ArrowDownLeft size={18} color="var(--green)" />
                        : <ArrowUpRight size={18} color="var(--teal)" />
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {truncate(tx.receiver_phone || tx.sender_phone || 'Transfert', 18)}
                      </div>
                      <div className="row gap-2" style={{ marginTop: 2 }}>
                        <span className="text-xs c-light">{tx.provider || 'NexCliq'}</span>
                        {tx.created_at && <span className="text-xs c-light">· {formatDate(tx.created_at)}</span>}
                        {tx.status && <StatusBadge status={tx.status} />}
                      </div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: tx.direction === 'IN' ? '#059669' : 'var(--text)' }}>
                      {tx.direction === 'IN' ? '+' : '−'}{formatAmount(tx.amount, tx.currency)}
                    </div>
                  </div>
                ))}
              </div>
        }

        {hasMore && (
          <button className="btn btn-glass" style={{ marginTop: 14 }} onClick={() => setPage(p => p + 1)} disabled={loading}>
            {loading ? <Loader2 size={14} className="spin" /> : 'Charger plus'}
          </button>
        )}
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
    api.get(API.endpoints.transferStatus(tx.id))
      .then(setDetail)
      .finally(() => setLoading(false));
  };

  const fields = [
    ['ID', detail?.id || '—'],
    ['Montant', formatAmount(detail?.amount, detail?.currency)],
    ['Statut', detail?.status || '—'],
    ['Expéditeur', detail?.sender_phone || '—'],
    ['Destinataire', detail?.receiver_phone || '—'],
    ['Date', detail?.created_at ? formatDate(detail.created_at) + ' ' + formatTime(detail.created_at) : '—'],
    ['Note', detail?.note || '—'],
  ];

  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onClick={onBack} />
        <span className="header-title">Détail</span>
        <button className="btn-icon" onClick={refresh} disabled={loading}>
          {loading ? <Loader2 size={14} className="spin" /> : <RefreshCw size={14} />}
        </button>
      </div>
      <div className="screen pt-4">
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 34, fontWeight: 800 }}>{formatAmount(detail?.amount, detail?.currency)}</div>
          <div style={{ marginTop: 8 }}><StatusBadge status={detail?.status || 'PENDING'} /></div>
        </div>
        <div className="glass" style={{ padding: '0 14px' }}>
          {fields.map(([k, v]) => (
            <div key={k} className="row between" style={{ padding: '12px 0', borderBottom: '1px solid rgba(11,107,92,0.04)' }}>
              <span className="text-sm c-muted">{k}</span>
              <span className="text-sm fw-600 mono" style={{ textAlign: 'right', maxWidth: '60%', wordBreak: 'break-all' }}>{v}</span>
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
  const { user, logout, updateUser } = useAuth();
  const toast = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);

  const name = `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || user?.username || 'Utilisateur';

  const save = async () => {
    setLoading(true);
    try {
      await updateUser(form);
      setEditing(false);
      toast('Profil mis à jour', 'success');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const menu = [
    { icon: <Lock size={16} />, label: 'Mot de passe', action: () => onNavigate('changePassword') },
    { icon: <Wallet size={16} />, label: 'Portefeuilles', action: () => onNavigate('wallets') },
    { icon: <Clock size={16} />, label: 'Historique', action: () => onNavigate('history') },
    { icon: <Settings size={16} />, label: 'Paramètres', action: () => onNavigate('settings') },
    ...(user?.role === 'admin' ? [{ icon: <Shield size={16} />, label: 'Administration', action: () => onNavigate('admin') }] : []),
  ];

  return (
    <div className="page">
      <div style={{
        background: 'linear-gradient(160deg, #042F2A, #0B6B5C, #040F0C)',
        padding: '44px 20px 28px', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="orb" style={{ top: -30, right: -40, width: 180, height: 180, background: 'radial-gradient(circle, rgba(196,180,154,0.12), transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Avatar name={name} size={72} light />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{name}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{user?.email}</div>
          <div style={{ marginTop: 8 }}>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>
              {user?.role === 'admin' ? 'Admin' : 'Utilisateur'}
            </span>
          </div>
        </div>
      </div>

      <div className="screen pt-4">
        {editing && (
          <div className="glass" style={{ padding: 16, marginBottom: 14 }}>
            <div className="fw-700" style={{ fontSize: 14, marginBottom: 12 }}>Modifier le profil</div>
            {['first_name', 'last_name', 'phone'].map(k => (
              <div className="form-group" key={k} style={{ marginBottom: 10 }}>
                <label className="form-label">{k === 'first_name' ? 'Prénom' : k === 'last_name' ? 'Nom' : 'Téléphone'}</label>
                <input className="form-input" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
              </div>
            ))}
            <div className="row gap-2">
              <button className="btn btn-glass btn-sm" onClick={() => setEditing(false)}>Annuler</button>
              <button className="btn btn-primary btn-sm" onClick={save} disabled={loading} style={{ flex: 1 }}>
                {loading ? <Loader2 size={14} className="spin" /> : 'Sauvegarder'}
              </button>
            </div>
          </div>
        )}

        <div className="glass" style={{ padding: '0 14px' }}>
          {menu.map((item, i) => (
            <div key={i} className="row-link" onClick={item.action}>
              <div className="row gap-3">
                <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(11,107,92,0.05)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</span>
              </div>
              <ChevronRight size={16} color="var(--light)" />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14 }}>
          <button className="btn btn-danger" onClick={logout}>
            <LogOut size={15} />Déconnexion
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: 14, fontSize: 10, color: 'var(--light)' }}>
          {APP.name} v{APP.version} · by {APP.company}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ROUTER
// ═══════════════════════════════════════════════════════════
export function AppRouter() {
  const { isAuth, isAdmin } = useAuth();
  const [screen, setScreen] = useState(isAuth ? 'home' : 'landing');
  const [stack, setStack] = useState([]);
  const [data, setData] = useState(null);

  const navigate = (to, d = null) => {
    setStack(s => [...s, screen]);
    setScreen(to);
    setData(d);
  };

  const goBack = () => {
    const prev = stack[stack.length - 1] || 'home';
    setStack(s => s.slice(0, -1));
    setScreen(prev);
    setData(null);
  };

  // Auth screens
  if (!isAuth) {
    if (screen === 'login') return <LoginScreen onBack={goBack} onSuccess={() => { setScreen('home'); setStack([]); }} onRegister={() => setScreen('register')} />;
    if (screen === 'register') return <RegisterScreen onBack={goBack} onSuccess={() => setScreen('login')} />;
    return <LandingScreen onLogin={() => navigate('login')} onRegister={() => navigate('register')} />;
  }

  // Main screens
  const noNav = ['send', 'receive', 'changePassword', 'settings', 'wallets', 'txDetail', 'admin', 'reconciliation', 'discrepancies', 'notifications'];
  const showNav = !noNav.includes(screen);
  const mains = ['home', 'history', 'profile', ...(isAdmin ? ['admin'] : [])];
  const active = mains.includes(screen) ? screen : stack.find(s => mains.includes(s)) || 'home';

  return (
    <div className="app-shell">
      {screen === 'home' && <HomeScreen onNavigate={navigate} />}
      {screen === 'history' && <HistoryScreen onBack={goBack} onTxClick={tx => navigate('txDetail', tx)} />}
      {screen === 'send' && <SendScreen onBack={goBack} />}
      {screen === 'receive' && <ReceiveScreen onBack={goBack} />}
      {screen === 'profile' && <ProfileScreen onNavigate={navigate} />}
      {screen === 'txDetail' && <TransferDetailScreen tx={data} onBack={goBack} />}
      {showNav && <BottomNav active={active} onNavigate={(to) => { setStack([]); setScreen(to); setData(null); }} isAdmin={isAdmin} />}
    </div>
  );
}

// BottomNav importé dans components mais utilisé ici
//import { Home, Clock, Send, User, Shield } from 'lucide-react';

function BottomNav({ active, onNavigate, isAdmin }) {
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
