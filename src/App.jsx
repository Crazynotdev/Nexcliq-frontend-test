import { useState, useEffect, useCallback, createContext, useContext } from "react";
import {
  Home, ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Clock,
  User, Settings, Bell, ChevronRight, ChevronLeft, Eye, EyeOff,
  Copy, Check, RefreshCw, AlertTriangle, LogOut, Lock,
  Wallet, Shield, BarChart3, Layers, Phone, Mail,
  CheckCircle2, XCircle, Loader2, X, Filter,
  TrendingUp, Activity, Zap, Send, Download
} from "lucide-react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const API_BASE = "http://localhost:8000/api/v1";
const ENDPOINTS = {
  login:          `${API_BASE}/auth/token/`,
  refresh:        `${API_BASE}/auth/token/refresh/`,
  register:       `${API_BASE}/users/`,
  me:             `${API_BASE}/users/me/`,
  changePassword: `${API_BASE}/users/change_password/`,
  updateProfile:  `${API_BASE}/users/profiles/me/`,
  transfers:      `${API_BASE}/transfers/`,
  transferStatus: (id) => `${API_BASE}/transfers/${id}/`,
  wallets:        `${API_BASE}/wallets/`,
  reconciliation: `${API_BASE}/admin/reconciliation/reports/`,
  discrepancies:  `${API_BASE}/admin/discrepancies/`,
  resolveDiscrepancy: (id) => `${API_BASE}/admin/discrepancies/${id}/`,
  health:         `${API_BASE}/health/`,
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* Brand */
      --teal:         #0B6B5C;
      --teal-mid:     #0D8570;
      --teal-pale:    #E3F2EF;
      --teal-glow:    rgba(11,107,92,0.18);
      --sand:         #C4B49A;
      --sand-light:   #F0EBE3;
      --cream:        #F6F3EF;

      /* Text */
      --text:         #111815;
      --text-2:       #3D4F49;
      --text-muted:   #6B7B74;
      --text-light:   #A3B0AB;

      /* Semantic */
      --green:        #1DB87A;
      --green-bg:     rgba(29,184,122,0.10);
      --red:          #E04B3A;
      --red-bg:       rgba(224,75,58,0.10);
      --amber:        #D4870A;
      --amber-bg:     rgba(212,135,10,0.10);

      /* Glass — light surface */
      --glass-bg:      rgba(255,255,255,0.62);
      --glass-border:  rgba(255,255,255,0.80);
      --glass-shadow:  0 8px 32px rgba(11,107,92,0.10);

      /* Glass — dark surface (on teal hero) */
      --glass-dark-bg:     rgba(255,255,255,0.10);
      --glass-dark-border: rgba(255,255,255,0.18);

      /* Radius */
      --r-xs: 8px;
      --r-sm: 12px;
      --r-md: 16px;
      --r-lg: 22px;
      --r-xl: 28px;
      --r-2xl:36px;

      /* Elevation */
      --s1: 0 1px 4px rgba(11,107,92,0.06);
      --s2: 0 4px 16px rgba(11,107,92,0.09);
      --s3: 0 12px 40px rgba(11,107,92,0.14);
      --s4: 0 24px 64px rgba(11,107,92,0.20);
    }

    html { font-size: 16px; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }

    body {
      font-family: 'Sora', sans-serif;
      background: var(--cream);
      color: var(--text);
      min-height: 100svh;
      overscroll-behavior: none;
    }

    /* ── Shell ── */
    .app-shell {
      max-width: 430px;
      min-height: 100svh;
      margin: 0 auto;
      background: var(--cream);
      position: relative;
      overflow-x: hidden;
    }

    /* ── Page animation ── */
    .page { animation: pageIn 0.26s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes pageIn {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ═══════════════════════════════════════
       GLASS COMPONENTS
    ═══════════════════════════════════════ */

    /* Glass card — light */
    .gc {
      background: var(--glass-bg);
      backdrop-filter: blur(24px) saturate(1.6);
      -webkit-backdrop-filter: blur(24px) saturate(1.6);
      border: 1px solid var(--glass-border);
      border-radius: var(--r-lg);
      box-shadow: var(--glass-shadow);
    }

    /* Glass card — dark (inside teal hero) */
    .gc-dark {
      background: var(--glass-dark-bg);
      backdrop-filter: blur(16px) saturate(1.2);
      -webkit-backdrop-filter: blur(16px) saturate(1.2);
      border: 1px solid var(--glass-dark-border);
      border-radius: var(--r-md);
    }

    /* ═══════════════════════════════════════
       BOTTOM NAV
    ═══════════════════════════════════════ */
    .bottom-nav {
      position: fixed;
      bottom: 0; left: 50%; transform: translateX(-50%);
      width: 100%; max-width: 430px;
      background: rgba(246,243,239,0.82);
      backdrop-filter: blur(28px) saturate(1.8);
      -webkit-backdrop-filter: blur(28px) saturate(1.8);
      border-top: 1px solid rgba(255,255,255,0.75);
      display: flex; align-items: center;
      padding: 8px 6px env(safe-area-inset-bottom, 16px);
      z-index: 100;
      box-shadow: 0 -1px 0 rgba(11,107,92,0.06), 0 -8px 24px rgba(11,107,92,0.05);
    }
    .nav-item {
      flex: 1; display: flex; flex-direction: column; align-items: center;
      gap: 3px; cursor: pointer; padding: 6px 0;
      -webkit-tap-highlight-color: transparent;
      transition: opacity 0.15s;
    }
    .nav-item:active { opacity: 0.7; }
    .nav-pill {
      width: 44px; height: 36px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.22s cubic-bezier(0.22,1,0.36,1);
      color: var(--text-light);
    }
    .nav-item.active .nav-pill {
      background: var(--teal);
      color: #fff;
      box-shadow: 0 4px 14px var(--teal-glow);
    }
    .nav-label {
      font-size: 10px; font-weight: 500;
      color: var(--text-light); transition: color 0.2s;
      letter-spacing: 0.01em;
    }
    .nav-item.active .nav-label { color: var(--teal); font-weight: 600; }

    /* ═══════════════════════════════════════
       SCREEN HEADER
    ═══════════════════════════════════════ */
    .screen-header {
      position: sticky; top: 0; z-index: 50;
      background: rgba(246,243,239,0.82);
      backdrop-filter: blur(24px) saturate(1.6);
      -webkit-backdrop-filter: blur(24px) saturate(1.6);
      border-bottom: 1px solid rgba(255,255,255,0.70);
      padding: 13px 20px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .header-title { font-size: 17px; font-weight: 700; letter-spacing: -0.3px; }

    /* ═══════════════════════════════════════
       BUTTONS
    ═══════════════════════════════════════ */
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      border: none; cursor: pointer; font-family: 'Sora', sans-serif;
      font-weight: 600; transition: all 0.18s cubic-bezier(0.22,1,0.36,1);
      -webkit-tap-highlight-color: transparent; text-decoration: none;
      position: relative; overflow: hidden;
    }
    .btn::after {
      content: ''; position: absolute; inset: 0;
      background: rgba(255,255,255,0); transition: background 0.15s;
      pointer-events: none;
    }
    .btn:active::after { background: rgba(255,255,255,0.12); }

    .btn-primary {
      background: var(--teal); color: #fff;
      border-radius: var(--r-md); padding: 16px 24px;
      font-size: 15px; width: 100%;
      box-shadow: 0 8px 24px var(--teal-glow);
    }
    .btn-primary:active { transform: scale(0.98); box-shadow: 0 4px 12px var(--teal-glow); }
    .btn-primary:disabled { opacity: 0.55; pointer-events: none; }

    .btn-glass {
      background: var(--glass-bg);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      color: var(--text); border-radius: var(--r-md);
      padding: 16px 24px; font-size: 15px; width: 100%;
      box-shadow: var(--s1);
    }
    .btn-glass:active { transform: scale(0.98); }

    .btn-ghost {
      background: transparent; color: var(--text-muted);
      border-radius: var(--r-sm); padding: 10px 16px; font-size: 14px;
    }

    .btn-icon {
      width: 44px; height: 44px; border-radius: var(--r-sm);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.18s;
      background: var(--glass-bg);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      color: var(--text-2);
      -webkit-tap-highlight-color: transparent;
    }
    .btn-icon:active { transform: scale(0.92); }

    .btn-sm { padding: 10px 16px; font-size: 13px; width: auto; border-radius: var(--r-sm); }

    .btn-danger {
      background: var(--red-bg); color: var(--red);
      border: 1px solid rgba(224,75,58,0.18);
      border-radius: var(--r-md); padding: 16px 24px;
      font-size: 15px; width: 100%;
    }
    .btn-danger:active { transform: scale(0.98); }

    /* ═══════════════════════════════════════
       INPUTS
    ═══════════════════════════════════════ */
    .form-group { display: flex; flex-direction: column; gap: 7px; }
    .form-label {
      font-size: 12px; font-weight: 700; color: var(--text-muted);
      letter-spacing: 0.06em; text-transform: uppercase;
    }
    .input-wrap { position: relative; }
    .input-icon-left {
      position: absolute; left: 14px; top: 50%;
      transform: translateY(-50%); color: var(--text-light);
      pointer-events: none; display: flex;
    }
    .input-icon-right {
      position: absolute; right: 14px; top: 50%;
      transform: translateY(-50%); color: var(--text-light);
      cursor: pointer; display: flex;
    }
    .form-input {
      background: var(--glass-bg);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1.5px solid var(--glass-border);
      border-radius: var(--r-sm); padding: 14px 16px;
      font-family: 'Sora', sans-serif; font-size: 15px; color: var(--text);
      outline: none; transition: all 0.2s; width: 100%;
      box-shadow: var(--s1);
    }
    .form-input:focus {
      border-color: var(--teal);
      box-shadow: 0 0 0 4px rgba(11,107,92,0.09), var(--s1);
    }
    .form-input::placeholder { color: var(--text-light); }
    .form-input.has-left  { padding-left: 44px; }
    .form-input.has-right { padding-right: 44px; }
    .form-input.error     { border-color: var(--red); }

    /* ═══════════════════════════════════════
       FEEDBACK
    ═══════════════════════════════════════ */
    .error-msg   { font-size: 12px; color: var(--red);   display: flex; align-items: center; gap: 4px; }
    .success-msg { font-size: 12px; color: var(--green); display: flex; align-items: center; gap: 4px; }

    /* ═══════════════════════════════════════
       STATUS BADGE
    ═══════════════════════════════════════ */
    .badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 10px; border-radius: 20px;
      font-size: 11px; font-weight: 700; letter-spacing: 0.02em;
    }
    .badge-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
    .badge-success { background: var(--green-bg); color: var(--green); }
    .badge-success .badge-dot { background: var(--green); }
    .badge-pending { background: var(--amber-bg); color: var(--amber); }
    .badge-pending .badge-dot { background: var(--amber); }
    .badge-failed  { background: var(--red-bg);   color: var(--red);   }
    .badge-failed  .badge-dot { background: var(--red); }

    /* ═══════════════════════════════════════
       TOAST
    ═══════════════════════════════════════ */
    .toast-container {
      position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
      z-index: 9999; display: flex; flex-direction: column; gap: 8px;
      width: calc(100% - 32px); max-width: 390px; pointer-events: none;
    }
    .toast {
      padding: 14px 18px; border-radius: var(--r-md);
      font-size: 14px; font-weight: 500;
      background: rgba(17,24,21,0.88);
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.12);
      animation: toastIn 0.3s cubic-bezier(0.22,1,0.36,1);
      display: flex; align-items: center; gap: 10px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.20);
      color: #fff;
    }
    @keyframes toastIn {
      from { opacity: 0; transform: translateY(-8px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .toast-icon { flex-shrink: 0; }
    .toast-success .toast-icon { color: var(--green); }
    .toast-error   .toast-icon { color: var(--red);   }
    .toast-info    .toast-icon { color: var(--sand);  }

    /* ═══════════════════════════════════════
       SPINNER
    ═══════════════════════════════════════ */
    .spin {
      animation: spin 0.75s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ═══════════════════════════════════════
       LOADER SCREEN
    ═══════════════════════════════════════ */
    .loader-screen {
      position: fixed; inset: 0; background: var(--cream);
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; gap: 20px; z-index: 9999;
    }

    /* ═══════════════════════════════════════
       LANDING
    ═══════════════════════════════════════ */
    .landing {
      min-height: 100svh;
      background: linear-gradient(155deg, #0A4F44 0%, #062E27 45%, #040F0C 100%);
      display: flex; flex-direction: column;
      padding: 52px 24px 40px;
      position: relative; overflow: hidden;
    }
    .landing-orb-1 {
      position: absolute; top: -80px; right: -60px;
      width: 320px; height: 320px; border-radius: 50%;
      background: radial-gradient(circle, rgba(11,107,92,0.35) 0%, transparent 70%);
      pointer-events: none;
    }
    .landing-orb-2 {
      position: absolute; bottom: 60px; left: -80px;
      width: 280px; height: 280px; border-radius: 50%;
      background: radial-gradient(circle, rgba(196,180,154,0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .landing-logo { display: flex; align-items: center; gap: 10px; position: relative; z-index: 1; }
    .logo-mark {
      width: 40px; height: 40px; border-radius: 13px;
      background: linear-gradient(135deg, var(--sand) 0%, #B09A7A 100%);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 16px rgba(196,180,154,0.3);
    }
    .logo-text { font-size: 20px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }

    .landing-hero { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 28px; position: relative; z-index: 1; }
    .landing-title {
      font-size: 44px; font-weight: 800; line-height: 1.06;
      color: #fff; letter-spacing: -2px;
    }
    .landing-title em { color: var(--sand); font-style: normal; }
    .landing-subtitle { font-size: 15px; color: rgba(255,255,255,0.52); line-height: 1.65; }
    .landing-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .landing-stat {
      padding: 16px 18px; border-radius: var(--r-md);
      background: rgba(255,255,255,0.06);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.09);
    }
    .landing-stat-value { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
    .landing-stat-label { font-size: 12px; color: rgba(255,255,255,0.45); margin-top: 3px; }

    .landing-actions { display: flex; flex-direction: column; gap: 12px; position: relative; z-index: 1; }
    .btn-landing-primary {
      background: #fff; color: var(--teal);
      border-radius: var(--r-md); padding: 18px;
      font-size: 16px; font-weight: 700;
      border: none; cursor: pointer; width: 100%;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      transition: all 0.2s; font-family: 'Sora', sans-serif;
    }
    .btn-landing-primary:active { transform: scale(0.98); }
    .btn-landing-ghost {
      border-radius: var(--r-md); padding: 18px;
      font-size: 16px; font-weight: 600; color: rgba(255,255,255,0.82);
      cursor: pointer; width: 100%; font-family: 'Sora', sans-serif;
      transition: all 0.2s;
      background: rgba(255,255,255,0.07);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.12);
    }
    .btn-landing-ghost:active { transform: scale(0.98); }

    /* ═══════════════════════════════════════
       AUTH SCREENS
    ═══════════════════════════════════════ */
    .auth-hero {
      background: linear-gradient(155deg, #0A4F44 0%, #063832 100%);
      padding: 60px 24px 36px; position: relative; overflow: hidden;
    }
    .auth-hero-orb {
      position: absolute; top: -40px; right: -40px;
      width: 200px; height: 200px; border-radius: 50%;
      background: radial-gradient(circle, rgba(196,180,154,0.18) 0%, transparent 70%);
      pointer-events: none;
    }
    .auth-hero-label { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.45); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; position: relative; z-index: 1; }
    .auth-hero-title { font-size: 30px; font-weight: 800; color: #fff; letter-spacing: -1px; line-height: 1.1; position: relative; z-index: 1; }

    .auth-body { padding: 24px 24px 40px; display: flex; flex-direction: column; gap: 18px; background: var(--cream); }

    /* Progress */
    .progress-track { height: 3px; background: rgba(255,255,255,0.15); border-radius: 2px; margin-top: 20px; position: relative; z-index: 1; overflow: hidden; }
    .progress-fill  { height: 100%; background: var(--sand); border-radius: 2px; transition: width 0.4s cubic-bezier(0.22,1,0.36,1); }

    /* ═══════════════════════════════════════
       WALLET HERO CARD
    ═══════════════════════════════════════ */
    .wallet-hero {
      background: linear-gradient(145deg, var(--teal) 0%, #073D34 100%);
      border-radius: var(--r-xl);
      padding: 28px;
      position: relative; overflow: hidden;
      box-shadow: 0 20px 56px rgba(11,107,92,0.30), 0 1px 0 rgba(255,255,255,0.08) inset;
    }
    .wallet-hero-orb-1 {
      position: absolute; top: -50px; right: -40px;
      width: 200px; height: 200px; border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%);
      pointer-events: none;
    }
    .wallet-hero-orb-2 {
      position: absolute; bottom: -60px; left: -30px;
      width: 220px; height: 220px; border-radius: 50%;
      background: radial-gradient(circle, rgba(196,180,154,0.09) 0%, transparent 65%);
      pointer-events: none;
    }
    .wallet-hero-content { position: relative; z-index: 1; }
    .wallet-hero-label { font-size: 12px; color: rgba(255,255,255,0.52); font-weight: 500; }
    .wallet-hero-amount {
      font-size: 38px; font-weight: 800; color: #fff;
      letter-spacing: -2px; margin: 6px 0 20px;
      line-height: 1;
    }
    .wallet-hero-amount sup { font-size: 18px; font-weight: 600; vertical-align: super; letter-spacing: 0; }
    .wallet-actions { display: flex; gap: 10px; }
    .wallet-action-btn {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px;
      padding: 12px; border-radius: var(--r-md); font-size: 14px; font-weight: 600;
      cursor: pointer; transition: all 0.18s; -webkit-tap-highlight-color: transparent;
      font-family: 'Sora', sans-serif;
    }
    .wallet-action-btn:active { transform: scale(0.96); }
    .wab-send {
      background: rgba(255,255,255,0.13);
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.18); color: #fff;
    }
    .wab-receive {
      background: rgba(196,180,154,0.18);
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(196,180,154,0.25); color: var(--sand);
    }

    /* ═══════════════════════════════════════
       QUICK ACTIONS
    ═══════════════════════════════════════ */
    .quick-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .quick-action {
      display: flex; flex-direction: column; align-items: center; gap: 9px;
      cursor: pointer; -webkit-tap-highlight-color: transparent;
    }
    .qa-icon {
      width: 56px; height: 56px; border-radius: 18px;
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.18s cubic-bezier(0.22,1,0.36,1);
      background: var(--glass-bg);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      box-shadow: var(--s2);
    }
    .quick-action:active .qa-icon { transform: scale(0.90); }
    .qa-label { font-size: 11px; font-weight: 600; color: var(--text-muted); text-align: center; }

    /* ═══════════════════════════════════════
       TRANSACTION ITEM
    ═══════════════════════════════════════ */
    .tx-item {
      display: flex; align-items: center; gap: 13px;
      padding: 14px 0; cursor: pointer;
      -webkit-tap-highlight-color: transparent; transition: opacity 0.15s;
    }
    .tx-item:active { opacity: 0.7; }
    .tx-item + .tx-item { border-top: 1px solid rgba(11,107,92,0.06); }
    .tx-icon-wrap {
      width: 44px; height: 44px; border-radius: 14px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .tx-info { flex: 1; min-width: 0; }
    .tx-name { font-size: 14px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .tx-meta { font-size: 12px; color: var(--text-light); margin-top: 2px; display: flex; align-items: center; gap: 5px; }
    .tx-amount { font-size: 15px; font-weight: 700; }
    .tx-amount.out { color: var(--text); }
    .tx-amount.in  { color: var(--green); }

    /* ═══════════════════════════════════════
       PROVIDER CARDS
    ═══════════════════════════════════════ */
    .provider-card {
      border: 1.5px solid rgba(11,107,92,0.10);
      border-radius: var(--r-md); padding: 15px 16px;
      display: flex; align-items: center; gap: 14px;
      cursor: pointer; transition: all 0.2s;
      background: var(--glass-bg);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      -webkit-tap-highlight-color: transparent;
    }
    .provider-card.selected {
      border-color: var(--teal);
      box-shadow: 0 0 0 4px rgba(11,107,92,0.09);
      background: rgba(227,242,239,0.72);
    }
    .provider-logo {
      width: 42px; height: 42px; border-radius: 13px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }

    /* ═══════════════════════════════════════
       KEYPAD
    ═══════════════════════════════════════ */
    .keypad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .key {
      height: 62px; border-radius: var(--r-md);
      background: var(--glass-bg);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      font-size: 22px; font-weight: 700; color: var(--text);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.15s;
      -webkit-tap-highlight-color: transparent;
      box-shadow: var(--s1);
    }
    .key:active { transform: scale(0.92); background: var(--teal-pale); }
    .key.key-del { font-size: 14px; }

    /* Amount display */
    .amount-display {
      font-size: 48px; font-weight: 800; letter-spacing: -2.5px;
      color: var(--text); text-align: center; font-family: 'Sora', sans-serif;
    }
    .amount-display sup { font-size: 20px; font-weight: 600; vertical-align: super; color: var(--text-muted); }

    /* ═══════════════════════════════════════
       SECTION HEADERS
    ═══════════════════════════════════════ */
    .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 13px; }
    .section-title  { font-size: 16px; font-weight: 700; letter-spacing: -0.2px; }
    .section-link   { font-size: 13px; font-weight: 600; color: var(--teal); cursor: pointer; }

    /* ═══════════════════════════════════════
       SETTINGS ROWS
    ═══════════════════════════════════════ */
    .settings-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 0; cursor: pointer;
      -webkit-tap-highlight-color: transparent; transition: opacity 0.15s;
    }
    .settings-row:active { opacity: 0.7; }
    .settings-row + .settings-row { border-top: 1px solid rgba(11,107,92,0.06); }

    /* ═══════════════════════════════════════
       TOGGLE
    ═══════════════════════════════════════ */
    .toggle { position: relative; width: 46px; height: 26px; flex-shrink: 0; }
    .toggle input { opacity: 0; width: 0; height: 0; }
    .toggle-track {
      position: absolute; inset: 0; border-radius: 13px;
      background: #D4DDD9; cursor: pointer; transition: background 0.2s;
    }
    .toggle-thumb {
      position: absolute; height: 20px; width: 20px;
      left: 3px; top: 3px; background: #fff;
      border-radius: 50%; transition: transform 0.22s cubic-bezier(0.22,1,0.36,1);
      box-shadow: 0 1px 4px rgba(0,0,0,0.18);
    }
    input:checked ~ .toggle-track { background: var(--teal); }
    input:checked ~ .toggle-thumb { transform: translateX(20px); }

    /* ═══════════════════════════════════════
       MODAL / SHEET
    ═══════════════════════════════════════ */
    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(4,15,12,0.55);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      z-index: 200; display: flex; align-items: flex-end;
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .modal-sheet {
      width: 100%; max-width: 430px; margin: 0 auto;
      background: var(--cream); border-radius: 28px 28px 0 0;
      padding: 12px 24px env(safe-area-inset-bottom, 32px);
      max-height: 92svh; overflow-y: auto;
      animation: sheetUp 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    @keyframes sheetUp {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }
    .modal-handle {
      width: 36px; height: 4px; background: rgba(11,107,92,0.15);
      border-radius: 2px; margin: 0 auto 20px;
    }

    /* ═══════════════════════════════════════
       PROFILE HERO
    ═══════════════════════════════════════ */
    .profile-hero {
      background: linear-gradient(155deg, #0A4F44 0%, #063832 100%);
      padding: 60px 24px 36px; text-align: center;
      display: flex; flex-direction: column; align-items: center; gap: 14px;
      position: relative; overflow: hidden;
    }
    .profile-hero-orb {
      position: absolute; top: -30px; right: -50px;
      width: 200px; height: 200px; border-radius: 50%;
      background: radial-gradient(circle, rgba(196,180,154,0.14) 0%, transparent 70%);
      pointer-events: none;
    }

    /* ═══════════════════════════════════════
       AVATAR
    ═══════════════════════════════════════ */
    .avatar {
      border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-weight: 700; flex-shrink: 0;
      background: var(--teal-pale); color: var(--teal);
      font-family: 'Sora', sans-serif;
    }

    /* ═══════════════════════════════════════
       MISC UTILITIES
    ═══════════════════════════════════════ */
    .screen { padding: 0 20px calc(88px + env(safe-area-inset-bottom, 0px)); }
    .pt-4  { padding-top: 20px; }
    .stack { display: flex; flex-direction: column; }
    .row   { display: flex; align-items: center; }
    .between { justify-content: space-between; }
    .center  { justify-content: center; }
    .gap-2 { gap: 8px; }
    .gap-3 { gap: 12px; }
    .gap-4 { gap: 16px; }
    .gap-5 { gap: 20px; }
    .w-full { width: 100%; }
    .text-sm { font-size: 13px; }
    .text-xs { font-size: 11px; }
    .c-muted { color: var(--text-muted); }
    .c-light { color: var(--text-light); }
    .c-teal  { color: var(--teal); }
    .c-red   { color: var(--red); }
    .c-green { color: var(--green); }
    .fw-600  { font-weight: 600; }
    .fw-700  { font-weight: 700; }
    .fw-800  { font-weight: 800; }
    .ls-tight { letter-spacing: -0.5px; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .divider { height: 1px; background: rgba(11,107,92,0.07); }
    .scroll-x { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 2px; scrollbar-width: none; }
    .scroll-x::-webkit-scrollbar { display: none; }

    /* Empty state */
    .empty-state {
      display: flex; flex-direction: column; align-items: center;
      padding: 52px 24px; gap: 12px; text-align: center;
    }
    .empty-icon-wrap {
      width: 64px; height: 64px; border-radius: 22px;
      background: var(--glass-bg);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      display: flex; align-items: center; justify-content: center;
      color: var(--text-light);
    }
    .empty-title { font-size: 16px; font-weight: 700; color: var(--text); }
    .empty-sub   { font-size: 14px; color: var(--text-muted); line-height: 1.55; }

    /* Admin stat grid */
    .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .stat-card {
      padding: 18px; border-radius: var(--r-md);
      background: var(--glass-bg);
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--glass-border);
      box-shadow: var(--s1);
    }
    .stat-value { font-size: 26px; font-weight: 800; color: var(--text); letter-spacing: -1px; margin-top: 8px; }
    .stat-label { font-size: 12px; color: var(--text-light); margin-top: 3px; }

    /* Progress bar */
    .prog-track { height: 5px; background: rgba(11,107,92,0.10); border-radius: 3px; overflow: hidden; }
    .prog-fill  { height: 100%; background: var(--teal); border-radius: 3px; transition: width 0.5s ease; }

    /* Section label */
    .section-label {
      font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--text-light);
      padding: 0 4px; margin-bottom: 8px;
    }
  `}</style>
);

// ─── TOKEN STORAGE ────────────────────────────────────────────────────────────
const getToken   = ()         => localStorage.getItem("nx_access");
const getRefresh = ()         => localStorage.getItem("nx_refresh");
const setTokens  = (a, r)     => { localStorage.setItem("nx_access", a); if (r) localStorage.setItem("nx_refresh", r); };
const clearTokens = ()        => { localStorage.removeItem("nx_access"); localStorage.removeItem("nx_refresh"); };

// ─── API CLIENT ───────────────────────────────────────────────────────────────
async function apiRequest(url, options = {}) {
  const headers = { "Content-Type": "application/json", ...options.headers };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    let res = await fetch(url, { ...options, headers });

    if (res.status === 401 && getRefresh()) {
      const r = await fetch(ENDPOINTS.refresh, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: getRefresh() }),
      });
      if (r.ok) {
        const { access } = await r.json();
        setTokens(access, null);
        headers["Authorization"] = `Bearer ${access}`;
        res = await fetch(url, { ...options, headers });
      } else { 
        clearTokens(); 
        window.location.reload(); 
        return; 
      }
    }

    let data;
    const contentType = res.headers.get('content-type');
    if (res.status === 204) {
      data = {};
    } else if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      const error = new Error(typeof data === 'string' ? data : 'Request failed');
      error.status = res.status;
      error.data = typeof data === 'object' ? data : { detail: data };
      throw error;
    }

    return data;
  } catch (error) {
    if (error.status) throw error;
    throw { status: 0, data: { detail: 'Erreur réseau' } };
  }
}

const api = {
  get:   (url)        => apiRequest(url),
  post:  (url, body)  => apiRequest(url, { method: "POST",  body: JSON.stringify(body) }),
  patch: (url, body)  => apiRequest(url, { method: "PATCH", body: JSON.stringify(body) }),
  put:   (url, body)  => apiRequest(url, { method: "PUT",   body: JSON.stringify(body) }),
  del:   (url)        => apiRequest(url, { method: "DELETE" }),
};

// ─── CONTEXTS ─────────────────────────────────────────────────────────────────
const AuthContext  = createContext(null);
const ToastContext = createContext(null);
const useAuth  = () => useContext(AuthContext);
const useToast = () => useContext(ToastContext);

// ─── TOAST PROVIDER ───────────────────────────────────────────────────────────
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3600);
  }, []);
  const icons = {
    success: <CheckCircle2 size={16} className="toast-icon" />,
    error:   <XCircle     size={16} className="toast-icon" />,
    info:    <Zap         size={16} className="toast-icon" />,
  };
  return (
    <ToastContext.Provider value={add}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {icons[t.type]}<span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ─── AUTH PROVIDER ────────────────────────────────────────────────────────────
function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (getToken()) {
      api.get(ENDPOINTS.me).then(setUser).catch(clearTokens).finally(() => setLoading(false));
    } else { setLoading(false); }
  }, []);

  const login = async (email, password) => {
    const data = await api.post(ENDPOINTS.login, { email, password });
    setTokens(data.access, data.refresh);
    const me = await api.get(ENDPOINTS.me);
    setUser(me); return me;
  };
  const register = async (payload) => {
    await api.post(ENDPOINTS.register, payload);
    toast("Compte créé ! Connectez-vous.", "success");
  };
  const logout = () => { clearTokens(); setUser(null); };
  const refreshUser = async () => { const me = await api.get(ENDPOINTS.me); setUser(me); return me; };

  if (loading) return (
    <div className="loader-screen">
      <div className="row gap-2">
        <div className="logo-mark"><LogoIcon /></div>
        <span style={{ fontSize: 22, fontWeight: 800, color: "var(--teal)", letterSpacing: -0.5 }}>nexcliq</span>
      </div>
      <Loader2 size={20} className="spin" style={{ color: "var(--teal-mid)" }} />
    </div>
  );

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── SMALL REUSABLE ───────────────────────────────────────────────────────────
function LogoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4 18 L4 6 L11 14 L18 6 L18 18" stroke="#0B6B5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function Avatar({ name = "U", size = 44, light = false }) {
  const initials = (name || "").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "U";
  return (
    <div className="avatar" style={{
      width: size, height: size, fontSize: size * 0.36,
      background: light ? "rgba(255,255,255,0.15)" : "var(--teal-pale)",
      color: light ? "#fff" : "var(--teal)",
      border: light ? "2.5px solid rgba(255,255,255,0.28)" : "none",
    }}>{initials}</div>
  );
}

function BackBtn({ onBack }) {
  return (
    <button className="btn-icon" onClick={onBack} style={{ border: "none", background: "transparent", boxShadow: "none" }}>
      <ChevronLeft size={22} strokeWidth={2.5} />
    </button>
  );
}

function StatusBadge({ status }) {
  const map = {
    SUCCESSFUL: ["badge-success", "Réussi"],
    PENDING:    ["badge-pending", "En cours"],
    pending:    ["badge-pending", "En cours"],
    RUNNING:    ["badge-pending", "En cours"],
    FAILED:     ["badge-failed",  "Échoué"],
    failed:     ["badge-failed",  "Échoué"],
    COMPLETED:  ["badge-success", "Terminé"],
  };
  const [cls, label] = map[status] || ["badge-pending", status || "—"];
  return <span className={`badge ${cls}`}><span className="badge-dot" />{label}</span>;
}

function Divider() { return <div className="divider" />; }

function SectionLabel({ children }) {
  return <div className="section-label">{children}</div>;
}

function formatAmount(amount, currency = "XOF") {
  if (amount == null) return "—";
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0 }).format(amount) + "\u202F" + currency;
}

function Toggle({ checked, onChange }) {
  return (
    <label className="toggle" style={{ cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <div className="toggle-track" />
      <div className="toggle-thumb" />
    </label>
  );
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
function LandingScreen({ onLogin, onRegister }) {
  return (
    <div className="landing page">
      <div className="landing-orb-1" /><div className="landing-orb-2" />
      <div className="landing-logo">
        <div className="logo-mark"><LogoIcon /></div>
        <span className="logo-text">nexcliq</span>
      </div>
      <div className="landing-hero">
        <div>
          <div className="landing-title">Transferts<br /><em>Mobile Money</em><br />sans friction.</div>
          <p className="landing-subtitle" style={{ marginTop: 14 }}>
            MTN MoMo ↔ Orange Money — rapide,<br />sécurisé, réconcilié automatiquement.
          </p>
        </div>
        <div className="landing-stats">
          {[["2M+","Transactions"],["< 30s","Délai moyen"],["99.9%","Disponibilité"],["0 perte","Réconciliation"]].map(([v,l]) => (
            <div key={l} className="landing-stat">
              <div className="landing-stat-value">{v}</div>
              <div className="landing-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="landing-actions">
        <button className="btn-landing-primary" onClick={onRegister}>Créer un compte</button>
        <button className="btn-landing-ghost"   onClick={onLogin}>Se connecter</button>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ onBack, onSuccess, onRegister }) {
  const { login } = useAuth();
  const toast = useToast();
  const [form, setForm]     = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const set = useCallback((k) => (e) => { 
    setForm(f => ({ ...f, [k]: e.target.value })); 
    setErrors(er => ({ ...er, [k]: "" })); 
  }, []);
  const validate = useCallback(() => {
    const e = {};
    if (!form.email)    e.email    = "Email requis";
    if (!form.password) e.password = "Mot de passe requis";
    setErrors(e); return !Object.keys(e).length;
  }, [form.email, form.password]);
  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    try { await login(form.email, form.password); toast("Bienvenue !", "success"); onSuccess(); }
    catch (err) {
      const msg = err?.data?.detail || err?.data?.non_field_errors?.[0] || "Identifiants invalides";
      toast(msg, "error"); setErrors({ general: msg });
    } finally { setLoading(false); }
  };
  return (
    <div className="page">
      <div className="auth-hero">
        <div className="auth-hero-orb" />
        <div style={{ marginBottom: 20 }}><BackBtn onBack={onBack} /></div>
        <div className="auth-hero-label">Connexion</div>
        <div className="auth-hero-title">Bon retour !</div>
      </div>
      <div className="auth-body">
        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="input-wrap">
            <span className="input-icon-left"><Mail size={16} /></span>
            <input className={`form-input has-left ${errors.email ? "error" : ""}`} type="email"
              placeholder="vous@exemple.com" value={form.email} onChange={set("email")} />
          </div>
          {errors.email && <span className="error-msg"><AlertTriangle size={12}/>{errors.email}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Mot de passe</label>
          <div className="input-wrap">
            <span className="input-icon-left"><Lock size={16} /></span>
            <input className={`form-input has-left has-right ${errors.password ? "error" : ""}`}
              type={showPwd ? "text" : "password"} placeholder="••••••••"
              value={form.password} onChange={set("password")}
              onKeyDown={e => e.key === "Enter" && submit()} />
            <span className="input-icon-right" onClick={() => setShowPwd(s => !s)}>
              {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
            </span>
          </div>
          {errors.password && <span className="error-msg"><AlertTriangle size={12}/>{errors.password}</span>}
        </div>
        {errors.general && <div className="error-msg" style={{ justifyContent: "center" }}><AlertTriangle size={12}/>{errors.general}</div>}
        <button className="btn btn-primary" onClick={submit} disabled={loading}>
          {loading ? <Loader2 size={18} className="spin" /> : "Se connecter"}
        </button>
        <p style={{ textAlign: "center", fontSize: 14 }}>
          <span className="c-muted">Pas encore de compte ? </span>
          <span className="c-teal fw-600" style={{ cursor: "pointer" }} onClick={onRegister}>S'inscrire</span>
        </p>
      </div>
    </div>
  );
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
function RegisterScreen({ onBack, onSuccess }) {
  const { register } = useAuth();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email:"", username:"", first_name:"", last_name:"", phone:"", password:"", password2:"" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const set = useCallback((k) => (e) => { 
    setForm(f => ({ ...f, [k]: e.target.value })); 
    setErrors(er => ({ ...er, [k]: "" })); 
  }, []);
  const v1 = useCallback(() => {
    const e = {};
    if (!form.first_name) e.first_name = "Requis";
    if (!form.last_name)  e.last_name  = "Requis";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email invalide";
    if (!form.username || form.username.length < 3) e.username = "Min 3 caractères";
    setErrors(e); return !Object.keys(e).length;
  }, [form.first_name, form.last_name, form.email, form.username]);
  const v2 = useCallback(() => {
    const e = {};
    if (!form.password || form.password.length < 8) e.password = "Min 8 caractères";
    if (form.password !== form.password2) e.password2 = "Les mots de passe ne correspondent pas";
    setErrors(e); return !Object.keys(e).length;
  }, [form.password, form.password2]);
  const submit = async () => {
    if (!v2()) return;
    setLoading(true);
    try { await register(form); onSuccess(); }
    catch (err) {
      const d = err?.data || {};
      const msgs = Object.entries(d).map(([k,v]) => `${k}: ${Array.isArray(v) ? v[0] : v}`).join(" · ");
      toast(msgs || "Erreur lors de l'inscription", "error"); setErrors(d);
    } finally { setLoading(false); }
  };
  return (
    <div className="page">
      <div className="auth-hero">
        <div className="auth-hero-orb" />
        <div style={{ marginBottom: 20 }}><BackBtn onBack={step === 1 ? onBack : () => setStep(1)} /></div>
        <div className="auth-hero-label">Étape {step} / 2</div>
        <div className="auth-hero-title">{step === 1 ? "Créer un compte" : "Sécuriser l'accès"}</div>
        <div className="progress-track"><div className="progress-fill" style={{ width: step === 1 ? "50%" : "100%" }} /></div>
      </div>
      <div className="auth-body">
        {step === 1 ? (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {[["first_name","Prénom","Jean"],["last_name","Nom","Dupont"]].map(([k,l,p]) => (
                <div className="form-group" key={k}>
                  <label className="form-label">{l}</label>
                  <input className={`form-input ${errors[k]?"error":""}`} placeholder={p} value={form[k]} onChange={set(k)} />
                  {errors[k] && <span className="error-msg"><AlertTriangle size={11}/>{errors[k]}</span>}
                </div>
              ))}
            </div>
            {[["email","Email","email","vous@exemple.com"],["username","Nom d'utilisateur","text","@utilisateur"]].map(([k,l,t,p]) => (
              <div className="form-group" key={k}>
                <label className="form-label">{l}</label>
                <input className={`form-input ${errors[k]?"error":""}`} type={t} placeholder={p} value={form[k]} onChange={set(k)} />
                {errors[k] && <span className="error-msg"><AlertTriangle size={11}/>{errors[k]}</span>}
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">Téléphone <span className="c-light">(optionnel)</span></label>
              <div className="input-wrap">
                <span className="input-icon-left"><Phone size={16}/></span>
                <input className="form-input has-left" type="tel" placeholder="+221 7X XXX XX XX" value={form.phone} onChange={set("phone")} />
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => { if (v1()) setStep(2); }}>Continuer</button>
          </>
        ) : (
          <>
            {[["password","Nouveau mot de passe"],["password2","Confirmer le mot de passe"]].map(([k,l]) => (
              <div className="form-group" key={k}>
                <label className="form-label">{l}</label>
                <div className="input-wrap">
                  <span className="input-icon-left"><Lock size={16}/></span>
                  {k === "password" ? (
                    <>
                      <input className={`form-input has-left has-right ${errors[k]?"error":""}`}
                        type={showPwd?"text":"password"} placeholder="••••••••" value={form[k]} onChange={set(k)} />
                      <span className="input-icon-right" onClick={() => setShowPwd(s => !s)}>
                        {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
                      </span>
                    </>
                  ) : (
                    <input className={`form-input has-left ${errors[k]?"error":""}`}
                      type="password" placeholder="••••••••" value={form[k]} onChange={set(k)} />
                  )}
                </div>
                {errors[k] && <span className="error-msg"><AlertTriangle size={11}/>{errors[k]}</span>}
              </div>
            ))}
            <button className="btn btn-primary" onClick={submit} disabled={loading}>
              {loading ? <Loader2 size={18} className="spin"/> : "Créer le compte"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeScreen({ onNavigate }) {
  const { user } = useAuth();
  const [wallet, setWallet]     = useState(null);
  const [transfers, setTransfers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(ENDPOINTS.wallets).catch(() => null),
      api.get(ENDPOINTS.transfers + "?limit=5").catch(() => null),
    ]).then(([w, t]) => {
      if (w?.results?.length) setWallet(w.results[0]);
      else if (w && !w.results) setWallet(w);
      const list = t?.results || (Array.isArray(t) ? t : []);
      setTransfers(list);
    }).finally(() => setLoadingData(false));
  }, []);

  const displayName = user?.first_name || user?.username || "Utilisateur";
  const balance     = wallet?.balance;
  const currency    = wallet?.currency || "XOF";

  const quickActions = useCallback(() => [
    { icon: <ArrowUpRight size={22} strokeWidth={2} color="var(--teal)"/>,        label: "Envoyer",    action: "send" },
    { icon: <ArrowDownLeft size={22} strokeWidth={2} color="#D4870A"/>,           label: "Recevoir",   action: "receive" },
    { icon: <ArrowLeftRight size={22} strokeWidth={2} color="#7C5CBF"/>,          label: "Transfert",  action: "send" },
    { icon: <Clock size={22} strokeWidth={2} color="var(--text-muted)"/>,         label: "Historique", action: "history" },
  ], []);

  return (
    <div className="page">
      <div className="screen-header">
        <div>
          <div style={{ fontSize: 12, color: "var(--text-light)", fontWeight: 500 }}>Bonjour,</div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>{displayName}</div>
        </div>
        <div className="row gap-2">
          <button className="btn-icon" onClick={() => onNavigate("notifications")}>
            <Bell size={18} strokeWidth={2} />
          </button>
          <Avatar name={displayName} size={40} />
        </div>
      </div>

      <div className="screen pt-4">
        {/* Wallet hero */}
        <div className="wallet-hero">
          <div className="wallet-hero-orb-1"/><div className="wallet-hero-orb-2"/>
          <div className="wallet-hero-content">
            <div className="wallet-hero-label">
              {wallet ? `${wallet.provider || "Portefeuille"} · ${wallet.status || "Actif"}` : "Portefeuille"}
            </div>
            <div className="wallet-hero-amount">
              {loadingData
                ? <Loader2 size={28} className="spin" style={{ color:"rgba(255,255,255,0.5)" }}/>
                : balance != null
                  ? <><sup>XOF </sup>{new Intl.NumberFormat("fr-FR").format(balance)}</>
                  : "Non connecté"
              }
            </div>
            <div className="wallet-actions">
              <button className="wallet-action-btn wab-send"    onClick={() => onNavigate("send")}>
                <Send size={15} strokeWidth={2.5}/>Envoyer
              </button>
              <button className="wallet-action-btn wab-receive" onClick={() => onNavigate("receive")}>
                <Download size={15} strokeWidth={2.5}/>Recevoir
              </button>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ marginTop: 24 }}>
          <div className="quick-actions">
            {quickActions().map(q => (
              <div key={q.label} className="quick-action" onClick={() => onNavigate(q.action)}>
                <div className="qa-icon">{q.icon}</div>
                <span className="qa-label">{q.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div style={{ marginTop: 28 }}>
          <div className="section-header">
            <span className="section-title">Récentes</span>
            <span className="section-link" onClick={() => onNavigate("history")}>Voir tout</span>
          </div>
          <div className="gc" style={{ padding:"4px 16px" }}>
            {loadingData
              ? <div style={{ padding:"28px 0", display:"flex", justifyContent:"center" }}><Loader2 size={22} className="spin" style={{ color:"var(--teal-mid)" }}/></div>
              : transfers.length === 0
                ? <EmptyState icon={<ArrowLeftRight size={26}/>} title="Aucune transaction" sub="Vos transactions apparaîtront ici" />
                : transfers.map((tx, i) => <TxItem key={tx.id||i} tx={tx} onClick={() => onNavigate("txDetail", tx)}/>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function TxItem({ tx, onClick }) {
  const isIn = tx.direction === "IN";
  const providerIcon = tx.provider === "MTN"
    ? <Activity size={20} strokeWidth={2} color="#D4870A"/>
    : tx.provider === "ORANGE"
      ? <Zap size={20} strokeWidth={2} color="#FF6600"/>
      : <ArrowLeftRight size={20} strokeWidth={2} color="var(--teal)"/>;
  const bg = isIn ? "var(--green-bg)" : "var(--teal-pale)";
  return (
    <div className="tx-item" onClick={onClick}>
      <div className="tx-icon-wrap" style={{ background: bg }}>{providerIcon}</div>
      <div className="tx-info">
        <div className="tx-name">{tx.receiver_phone || tx.sender_phone || "Transfert"}</div>
        <div className="tx-meta">
          <span>{tx.provider || "NexCliq"}</span>
          {tx.created_at && <><span>·</span><span>{new Date(tx.created_at).toLocaleDateString("fr-FR")}</span></>}
          {tx.status && <StatusBadge status={tx.status}/>}
        </div>
      </div>
      <div className={`tx-amount ${isIn?"in":"out"}`}>
        {isIn ? "+" : "−"}{formatAmount(tx.amount, tx.currency)}
      </div>
    </div>
  );
}

function EmptyState({ icon, title, sub }) {
  return (
    <div className="empty-state">
      <div className="empty-icon-wrap">{icon}</div>
      <div className="empty-title">{title}</div>
      {sub && <div className="empty-sub">{sub}</div>}
    </div>
  );
}

// ─── SEND ─────────────────────────────────────────────────────────────────────
function SendScreen({ onBack }) {
  const toast = useToast();
  const [step, setStep]       = useState(1);
  const [provider, setProvider] = useState("");
  const [phone, setPhone]     = useState("");
  const [amount, setAmount]   = useState("");
  const [note, setNote]       = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);

  const providers = [
    { id:"MTN",    label:"MTN MoMo",      sub:"Mobile Money",  icon:<Activity size={20} color="#D4870A"/>, bg:"#FFF8E8", border:"rgba(212,135,10,0.18)" },
    { id:"ORANGE", label:"Orange Money",  sub:"Orange Money",  icon:<Zap size={20} color="#FF6600"/>,      bg:"#FFF4EE", border:"rgba(255,102,0,0.18)" },
  ];

  const appendDigit = useCallback((d) => {
    if (d === "del") { setAmount(a => a.slice(0,-1)); return; }
    if (d === "000") { setAmount(a => a ? a+"000" : ""); return; }
    if (amount.length >= 9) return;
    setAmount(a => a+d);
  }, [amount.length]);

  const submit = async () => {
    if (!phone || !amount || !provider) return;
    setLoading(true);
    try {
      const data = await api.post(ENDPOINTS.transfers, { receiver_phone: phone, amount: Number(amount), provider_to: provider, note });
      setResult(data); setStep(4); toast("Transfert initié", "success");
    } catch (err) {
      const msg = err?.data?.detail || err?.data?.non_field_errors?.[0] || "Erreur lors du transfert";
      toast(msg, "error");
    } finally { setLoading(false); }
  };

  if (step === 4 && result) return (
    <div className="page" style={{ minHeight:"100svh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:28, gap:24 }}>
      <div style={{ width:72, height:72, borderRadius:"50%", background:"var(--green-bg)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <CheckCircle2 size={36} strokeWidth={1.5} color="var(--green)"/>
      </div>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:34, fontWeight:800, letterSpacing:-1.5 }}>{formatAmount(result.amount||amount)}</div>
        <div style={{ fontSize:15, color:"var(--text-muted)", marginTop:8 }}>Envoyé vers {result.receiver_phone||phone}</div>
        <div style={{ marginTop:10 }}><StatusBadge status={result.status||"PENDING"}/></div>
      </div>
      <div className="gc" style={{ width:"100%", padding:"0 18px" }}>
        {[["Référence",result.id||"—"],["Réseau",provider],["Statut",result.status||"PENDING"]].map(([k,v]) => (
          <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"13px 0", borderBottom:"1px solid rgba(11,107,92,0.07)" }}>
            <span className="c-muted text-sm">{k}</span>
            <span className="text-sm fw-600 mono">{String(v)}</span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={onBack}>Retour à l'accueil</button>
    </div>
  );

  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={step===1 ? onBack : () => setStep(s => s-1)}/>
        <span className="header-title">Envoyer</span>
        <div style={{ width:44 }}/>
      </div>
      <div className="screen pt-4">
        {step === 1 && (
          <div className="stack gap-5">
            <div>
              <div className="section-title" style={{ marginBottom:12 }}>Choisir le réseau</div>
              <div className="stack gap-3">
                {providers.map(p => (
                  <div key={p.id} className={`provider-card ${provider===p.id?"selected":""}`} onClick={() => setProvider(p.id)}>
                    <div className="provider-logo" style={{ background:p.bg, border:`1.5px solid ${p.border}` }}>{p.icon}</div>
                    <div>
                      <div style={{ fontWeight:600, fontSize:15 }}>{p.label}</div>
                      <div className="text-sm c-light">{p.sub}</div>
                    </div>
                    {provider===p.id && <Check size={18} strokeWidth={2.5} color="var(--teal)" style={{ marginLeft:"auto" }}/>}
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Numéro du destinataire</label>
              <div className="input-wrap">
                <span className="input-icon-left"><Phone size={16}/></span>
                <input className="form-input has-left" type="tel" placeholder="+221 7X XXX XX XX" value={phone} onChange={e => setPhone(e.target.value)}/>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Note <span className="c-light">(optionnel)</span></label>
              <input className="form-input" placeholder="Pour quoi ?" value={note} onChange={e => setNote(e.target.value)}/>
            </div>
            <button className="btn btn-primary" onClick={() => { if (provider && phone) setStep(2); else toast("Remplir tous les champs requis","error"); }} disabled={!provider||!phone}>
              Continuer <ChevronRight size={16} strokeWidth={2.5}/>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="stack gap-5">
            <div style={{ textAlign:"center", paddingTop:8 }}>
              <div className="c-muted text-sm" style={{ marginBottom:8 }}>Montant à envoyer</div>
              <div className="amount-display"><sup>XOF </sup>{amount||"0"}</div>
              <div className="c-light text-sm" style={{ marginTop:8 }}>→ {phone} · {provider}</div>
            </div>
            <div className="keypad">
              {["1","2","3","4","5","6","7","8","9","000","0","del"].map(k => (
                <div key={k} className={`key ${k==="del"?"key-del":""}`} onClick={() => appendDigit(k)}>
                  {k === "del" ? <ArrowLeftRight size={18} strokeWidth={2.5} style={{ transform:"rotate(90deg)" }}/> : k}
                </div>
              ))}
            </div>
            <button className="btn btn-primary" onClick={() => { if (Number(amount)>0) setStep(3); else toast("Saisir un montant","error"); }} disabled={!amount||Number(amount)===0}>
              Continuer <ChevronRight size={16} strokeWidth={2.5}/>
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="stack gap-4">
            <div className="wallet-hero">
              <div className="wallet-hero-orb-1"/><div className="wallet-hero-orb-2"/>
              <div className="wallet-hero-content">
                <div className="wallet-hero-label">Vous envoyez</div>
                <div className="wallet-hero-amount"><sup>XOF </sup>{new Intl.NumberFormat("fr-FR").format(Number(amount))}</div>
              </div>
            </div>
            <div className="gc" style={{ padding:"0 18px" }}>
              {[["Destinataire",phone],["Réseau",providers.find(p=>p.id===provider)?.label||provider],["Note",note||"—"],["Frais estimés","Inclus"]].map(([k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0", borderBottom:"1px solid rgba(11,107,92,0.07)" }}>
                  <span className="c-muted text-sm">{k}</span>
                  <span className="text-sm fw-600">{v}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" onClick={submit} disabled={loading}>
              {loading ? <Loader2 size={18} className="spin"/> : "Confirmer l'envoi"}
            </button>
            <button className="btn btn-glass" onClick={() => setStep(2)}>Modifier le montant</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RECEIVE ──────────────────────────────────────────────────────────────────
function ReceiveScreen({ onBack }) {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const phone = user?.phone || "Non renseigné";
  const copy = useCallback(() => {
    navigator.clipboard.writeText(phone).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2200); });
  }, [phone]);
  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={onBack}/>
        <span className="header-title">Recevoir</span>
        <div style={{ width:44 }}/>
      </div>
      <div className="screen pt-4" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:28 }}>
        <div style={{ fontSize:14, color:"var(--text-muted)", textAlign:"center" }}>Partagez votre numéro pour recevoir des fonds</div>
        <div style={{
          width:160, height:160, borderRadius:32,
          background:"var(--glass-bg)",
          backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
          border:"1px solid var(--glass-border)",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"var(--s3)",
        }}>
          <Phone size={52} strokeWidth={1.2} color="var(--teal)"/>
        </div>
        <div className="gc" style={{ width:"100%", padding:"20px", textAlign:"center" }}>
          <div className="c-muted text-sm" style={{ marginBottom:8 }}>Votre numéro MTN / Orange</div>
          <div style={{ fontSize:24, fontWeight:800, letterSpacing:1.5, fontFamily:"'JetBrains Mono',monospace" }}>{phone}</div>
        </div>
        <button className="btn btn-primary" onClick={copy} style={{ width:"100%" }}>
          {copied ? <><Check size={16} strokeWidth={2.5}/>Copié !</> : <><Copy size={16} strokeWidth={2}/>Copier le numéro</>}
        </button>
      </div>
    </div>
  );
}

// ─── HISTORY ──────────────────────────────────────────────────────────────────
function HistoryScreen({ onBack, onTxClick }) {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState("all");
  const [page, setPage]           = useState(1);
  const [hasMore, setHasMore]     = useState(false);
  const filters = [{ id:"all",label:"Tout" },{ id:"SUCCESSFUL",label:"Réussi" },{ id:"PENDING",label:"En cours" },{ id:"FAILED",label:"Échoué" }];

  useEffect(() => {
    setLoading(true);
    const s = filter !== "all" ? `&status=${filter}` : "";
    api.get(`${ENDPOINTS.transfers}?page=${page}${s}`)
      .then(data => {
        const list = data?.results || (Array.isArray(data) ? data : []);
        setTransfers(page===1 ? list : t => [...t,...list]);
        setHasMore(!!data?.next);
      })
      .catch(() => setTransfers([]))
      .finally(() => setLoading(false));
  }, [filter, page]);

  const changeFilter = useCallback((f) => { setFilter(f); setPage(1); setTransfers([]); }, []);

  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={onBack}/>
        <span className="header-title">Historique</span>
        <div style={{ width:44 }}/>
      </div>
      <div className="screen pt-4">
        <div className="scroll-x" style={{ marginBottom:16 }}>
          {filters.map(f => (
            <button key={f.id} className={`btn btn-sm ${filter===f.id?"btn-primary":"btn-glass"}`}
              style={{ flexShrink:0 }} onClick={() => changeFilter(f.id)}>{f.label}</button>
          ))}
        </div>
        {loading && page===1
          ? <div style={{ textAlign:"center", padding:40 }}><Loader2 size={24} className="spin" style={{ color:"var(--teal-mid)" }}/></div>
          : transfers.length===0
            ? <EmptyState icon={<Filter size={26}/>} title="Aucune transaction" sub={`Aucun transfert ${filter!=="all"?`"${filter}"`:""}trouvé`}/>
            : <div className="gc" style={{ padding:"4px 16px" }}>
                {transfers.map((tx,i) => <TxItem key={tx.id||i} tx={tx} onClick={() => onTxClick&&onTxClick(tx)}/>)}
              </div>
        }
        {hasMore && (
          <button className="btn btn-glass" style={{ marginTop:16 }} onClick={() => setPage(p=>p+1)} disabled={loading}>
            {loading ? <Loader2 size={16} className="spin"/> : "Charger plus"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── TX DETAIL ────────────────────────────────────────────────────────────────
function TransferDetailScreen({ tx, onBack }) {
  const [detail, setDetail] = useState(tx);
  const [loading, setLoading] = useState(false);
  const refresh = useCallback(() => {
    if (!tx?.id) return;
    setLoading(true);
    api.get(ENDPOINTS.transferStatus(tx.id)).then(setDetail).finally(() => setLoading(false));
  }, [tx?.id]);
  const fields = useCallback(() => [
    ["ID",          detail?.id||"—"],
    ["Montant",     formatAmount(detail?.amount, detail?.currency)],
    ["Statut",      detail?.status||"—"],
    ["Réseau src.", detail?.provider_from||"—"],
    ["Réseau dest.",detail?.provider_to||"—"],
    ["Expéditeur",  detail?.sender_phone||"—"],
    ["Destinataire",detail?.receiver_phone||"—"],
    ["Date",        detail?.created_at ? new Date(detail.created_at).toLocaleString("fr-FR") : "—"],
    ["Note",        detail?.note||"—"],
    ["Réf. provider",detail?.provider_reference||"—"],
  ], [detail]);
  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={onBack}/>
        <span className="header-title">Détail</span>
        <button className="btn-icon" onClick={refresh} disabled={loading}>
          {loading ? <Loader2 size={16} className="spin"/> : <RefreshCw size={16} strokeWidth={2}/>}
        </button>
      </div>
      <div className="screen pt-4">
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:36, fontWeight:800, letterSpacing:-1.5 }}>{formatAmount(detail?.amount, detail?.currency)}</div>
          <div style={{ marginTop:10 }}><StatusBadge status={detail?.status||"PENDING"}/></div>
        </div>
        <div className="gc" style={{ padding:"0 18px" }}>
          {fields().map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"13px 0", borderBottom:"1px solid rgba(11,107,92,0.06)" }}>
              <span className="c-muted text-sm" style={{ flexShrink:0 }}>{k}</span>
              <span className="text-sm fw-600 mono" style={{ textAlign:"right", marginLeft:12, wordBreak:"break-all" }}>{String(v)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function ProfileScreen({ onNavigate }) {
  const { user, logout, refreshUser } = useAuth();
  const toast = useToast();
  const [editing, setEditing]   = useState(false);
  const [form, setForm]         = useState({ first_name: user?.first_name || "", last_name: user?.last_name || "", phone: user?.phone || "" });
  const [loading, setLoading]   = useState(false);
  const set = useCallback((k) => (e) => setForm(f => ({ ...f, [k]: e.target.value })), []);
  const save = async () => {
    setLoading(true);
    try { 
      await api.patch(ENDPOINTS.updateProfile, { 
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone 
      }); 
      await refreshUser(); 
      setEditing(false); 
      toast("Profil mis à jour", "success"); 
    }
    catch (err) { 
      const msg = err?.data?.detail || err?.data?.non_field_errors?.[0] || "Erreur lors de la mise à jour";
      toast(msg, "error"); 
    }
    finally { setLoading(false); }
  };
  const displayName = `${user?.first_name||""} ${user?.last_name||""}`.trim() || user?.username || "Utilisateur";
  const menuItems = [
    { icon: <Lock size={18} strokeWidth={2}/>,        label: "Changer le mot de passe",  action: () => onNavigate("changePassword") },
    { icon: <Wallet size={18} strokeWidth={2}/>,      label: "Mes portefeuilles",         action: () => onNavigate("wallets") },
    { icon: <Clock size={18} strokeWidth={2}/>,       label: "Historique complet",        action: () => onNavigate("history") },
    { icon: <Settings size={18} strokeWidth={2}/>,    label: "Paramètres",                action: () => onNavigate("settings") },
    ...(user?.role === "admin" ? [{ icon: <Shield size={18} strokeWidth={2}/>, label: "Administration", action: () => onNavigate("admin") }] : []),
  ];
  return (
    <div className="page">
      <div className="profile-hero">
        <div className="profile-hero-orb"/>
        <div style={{ position: "relative", zIndex: 1 }}>
          <Avatar name={displayName} size={80} light/>
          <button onClick={() => setEditing(true)} style={{
            position: "absolute", bottom: -2, right: -2, width: 26, height: 26, borderRadius: "50%",
            background: "var(--sand)", border: "2px solid var(--cream)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            <Settings size={12} strokeWidth={2.5} color="var(--teal)"/>
          </button>
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>{displayName}</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 3 }}>{user?.email}</div>
          <div style={{ marginTop: 10 }}>
            <span className="badge" style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.75)" }}>
              {user?.role === "admin" ? "Admin" : user?.role === "merchant" ? "Marchand" : "Utilisateur"}
            </span>
          </div>
        </div>
      </div>

      <div className="screen pt-4">
        {editing && (
          <div className="gc" style={{ padding: 18, marginBottom: 16 }}>
            <div className="fw-700" style={{ fontSize: 15, marginBottom: 14 }}>Modifier le profil</div>
            {[["first_name","Prénom"],["last_name","Nom"],["phone","Téléphone"]].map(([k,l]) => (
              <div className="form-group" key={k} style={{ marginBottom: 12 }}>
                <label className="form-label">{l}</label>
                <input className="form-input" value={form[k]} onChange={set(k)}/>
              </div>
            ))}
            <div className="row gap-3" style={{ marginTop: 4 }}>
              <button className="btn btn-glass" onClick={() => setEditing(false)}>Annuler</button>
              <button className="btn btn-primary" onClick={save} disabled={loading}>
                {loading ? <Loader2 size={16} className="spin"/> : "Sauvegarder"}
              </button>
            </div>
          </div>
        )}

        <div className="gc" style={{ padding: "0 18px" }}>
          {menuItems.map((item,i) => (
            <div key={i} className="settings-row" onClick={item.action}>
              <div className="row gap-3">
                <div style={{ width: 36, height: 36, borderRadius: 11, background: "var(--teal-pale)", color: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: 15, fontWeight: 500 }}>{item.label}</span>
              </div>
              <ChevronRight size={18} strokeWidth={2} color="var(--text-light)"/>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <button className="btn btn-danger" onClick={logout}>
            <LogOut size={16} strokeWidth={2}/>Déconnexion
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 18, fontSize: 11, color: "var(--text-light)" }}>
          NexCliq v1.0 · {user?.is_verified ? "Compte vérifié" : "Compte non vérifié"}
        </div>
      </div>
    </div>
  );
}

// ─── CHANGE PASSWORD ──────────────────────────────────────────────────────────
function ChangePasswordScreen({ onBack }) {
  const toast = useToast();
  const [form, setForm]     = useState({ old_password: "", new_password: "", confirm_password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false);
  const set = useCallback((k) => (e) => { 
    setForm(f => ({ ...f, [k]: e.target.value })); 
    setErrors(er => ({ ...er, [k]: "" })); 
  }, []);
  const validate = useCallback(() => {
    const e = {};
    if (!form.old_password) e.old_password = "Requis";
    if (!form.new_password || form.new_password.length < 8) e.new_password = "Min 8 caractères";
    if (form.new_password !== form.confirm_password) e.confirm_password = "Les mots de passe ne correspondent pas";
    setErrors(e); return !Object.keys(e).length;
  }, [form.old_password, form.new_password, form.confirm_password]);
  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    try { await api.post(ENDPOINTS.changePassword, form); setDone(true); toast("Mot de passe modifié", "success"); }
    catch (err) { const msg = err?.data?.error || "Erreur"; toast(msg, "error"); setErrors({ general: msg }); }
    finally { setLoading(false); }
  };
  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={onBack}/>
        <span className="header-title">Mot de passe</span>
        <div style={{ width: 44 }}/>
      </div>
      <div className="screen pt-4">
        {done
          ? <EmptyState icon={<CheckCircle2 size={32} color="var(--green)"/>} title="Mot de passe modifié" sub="Votre mot de passe a été changé avec succès.">
              <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={onBack}>Retour</button>
            </EmptyState>
          : <div className="stack gap-4">
              {[["old_password","Mot de passe actuel"],["new_password","Nouveau mot de passe"],["confirm_password","Confirmer le nouveau"]].map(([k,l]) => (
                <div className="form-group" key={k}>
                  <label className="form-label">{l}</label>
                  <div className="input-wrap">
                    <span className="input-icon-left"><Lock size={16}/></span>
                    <input className={`form-input has-left ${errors[k]?"error":""}`} type="password" placeholder="••••••••" value={form[k]} onChange={set(k)}/>
                  </div>
                  {errors[k] && <span className="error-msg"><AlertTriangle size={11}/>{errors[k]}</span>}
                </div>
              ))}
              {errors.general && <div className="error-msg" style={{ justifyContent: "center" }}><AlertTriangle size={12}/>{errors.general}</div>}
              <button className="btn btn-primary" onClick={submit} disabled={loading}>
                {loading ? <Loader2 size={18} className="spin"/> : "Confirmer"}
              </button>
            </div>
        }
      </div>
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function SettingsScreen({ onBack }) {
  const [notifs, setNotifs]     = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang]         = useState("fr");

  const sections = [
    { title: "Sécurité", items: [
      { icon: <Bell size={18}/>,       label: "Notifications push",  sub: "Alertes de transaction", ctrl: <Toggle checked={notifs}    onChange={setNotifs}/> },
      { icon: <Lock size={18}/>,       label: "Biométrie",           sub: "Déverrouillez avec FaceID / empreinte", ctrl: <Toggle checked={biometric} onChange={setBiometric}/> },
    ]},
    { title: "Apparence", items: [
      { icon: <Layers size={18}/>,     label: "Mode sombre",         sub: "Interface en mode nuit", ctrl: <Toggle checked={darkMode}  onChange={setDarkMode}/> },
      { icon: <Settings size={18}/>,   label: "Langue",              sub: lang === "fr" ? "Français" : "English",
        ctrl: <button className="btn btn-ghost btn-sm" onClick={() => setLang(l => l === "fr" ? "en" : "fr")}>{lang === "fr" ? "FR" : "EN"}</button>
      },
    ]},
    { title: "Support", items: [
      { icon: <BarChart3 size={18}/>,  label: "Centre d'aide",       sub: "FAQ et guides",          ctrl: <ChevronRight size={18} strokeWidth={2} color="var(--text-light)"/>, action: () => {} },
      { icon: <AlertTriangle size={18}/>, label: "Signaler un problème", sub: "Contactez notre équipe", ctrl: <ChevronRight size={18} strokeWidth={2} color="var(--text-light)"/>, action: () => {} },
      { icon: <Shield size={18}/>,     label: "Conditions d'utilisation", sub: "",                   ctrl: <ChevronRight size={18} strokeWidth={2} color="var(--text-light)"/>, action: () => {} },
    ]},
  ];
  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={onBack}/>
        <span className="header-title">Paramètres</span>
        <div style={{ width: 44 }}/>
      </div>
      <div className="screen pt-4 stack gap-5">
        {sections.map(s => (
          <div key={s.title}>
            <SectionLabel>{s.title}</SectionLabel>
            <div className="gc" style={{ padding: "0 18px" }}>
              {s.items.map((item,i) => (
                <div key={i} className="settings-row" onClick={item.action}>
                  <div className="row gap-3">
                    <div style={{ width: 36, height: 36, borderRadius: 11, background: "var(--teal-pale)", color: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{item.label}</div>
                      {item.sub && <div className="text-xs c-light" style={{ marginTop: 2 }}>{item.sub}</div>}
                    </div>
                  </div>
                  {item.ctrl}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ textAlign: "center", fontSize: 11, color: "var(--text-light)" }}>NexCliq Mobile · v1.0.0</div>
      </div>
    </div>
  );
}

// ─── WALLETS ──────────────────────────────────────────────────────────────────
function WalletsScreen({ onBack }) {
  const [wallets, setWallets]   = useState([]);
  const [loading, setLoading]   = useState(true);
  useEffect(() => {
    api.get(ENDPOINTS.wallets)
      .then(d => setWallets(d?.results || (Array.isArray(d) ? d : [])))
      .catch(() => setWallets([]))
      .finally(() => setLoading(false));
  }, []);
  const themes = {
    MTN:    { bg: "linear-gradient(140deg, #D4870A 0%, #8B5500 100%)", label: "rgba(255,255,255,0.55)", amount: "#fff" },
    ORANGE: { bg: "linear-gradient(140deg, #E05000 0%, #8B3000 100%)", label: "rgba(255,255,255,0.55)", amount: "#fff" },
    DEFAULT: { bg: "linear-gradient(140deg, var(--teal) 0%, #062E27 100%)", label: "rgba(255,255,255,0.55)", amount: "#fff" },
  };
  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={onBack}/>
        <span className="header-title">Portefeuilles</span>
        <div style={{ width: 44 }}/>
      </div>
      <div className="screen pt-4">
        {loading
          ? <div style={{ textAlign: "center", padding: 40 }}><Loader2 size={24} className="spin" style={{ color: "var(--teal-mid)" }}/></div>
          : wallets.length === 0
            ? <EmptyState icon={<Wallet size={28}/>} title="Aucun portefeuille" sub="Vos portefeuilles MTN et Orange Money apparaîtront ici une fois connectés."/>
            : <div className="stack gap-4">
                {wallets.map((w,i) => {
                  const t = themes[w.provider] || themes.DEFAULT;
                  return (
                    <div key={w.id||i} style={{ background: t.bg, borderRadius: "var(--r-xl)", padding: 28, position: "relative", overflow: "hidden", boxShadow: "var(--s4)" }}>
                      <div style={{ position: "absolute", top: -50, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }}/>
                      <div style={{ position: "relative", zIndex: 1 }}>
                        <div style={{ fontSize: 13, color: t.label, marginBottom: 6 }}>{w.provider} · {w.status || "Actif"}</div>
                        <div style={{ fontSize: 32, fontWeight: 800, color: t.amount, letterSpacing: -1 }}>{formatAmount(w.balance, w.currency)}</div>
                        <div className="mono" style={{ fontSize: 13, color: t.label, marginTop: 10 }}>{w.msisdn || w.phone || "•••• •••• ••••"}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
        }
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
function NotificationsScreen({ onBack }) {
  const staticNotifs = [
    { id: 1, read: false, icon: <CheckCircle2 size={18} strokeWidth={2}/>, iconBg: "var(--green-bg)", iconColor: "var(--green)", title: "Transfert réussi",           sub: "5 000 XOF envoyés vers +221771234567", time: "Il y a 2h" },
    { id: 2, read: true,  icon: <BarChart3 size={18} strokeWidth={2}/>,    iconBg: "var(--teal-pale)", iconColor: "var(--teal)",  title: "Réconciliation terminée",      sub: "Batch du 09/05 — 0 écart détecté",     time: "Aujourd'hui 02:00" },
    { id: 3, read: true,  icon: <AlertTriangle size={18} strokeWidth={2}/>, iconBg: "var(--amber-bg)", iconColor: "var(--amber)", title: "Vérification en attente",      sub: "Votre compte n'est pas encore vérifié", time: "Hier" },
  ];
  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={onBack}/>
        <span className="header-title">Notifications</span>
        <div style={{ width: 44 }}/>
      </div>
      <div className="screen pt-4">
        <div className="gc" style={{ padding: "0 18px" }}>
          {staticNotifs.map((n,i) => (
            <div key={n.id} style={{ display: "flex", gap: 13, alignItems: "flex-start", padding: "16px 0", opacity: n.read ? 0.6 : 1, borderBottom: i < staticNotifs.length - 1 ? "1px solid rgba(11,107,92,0.06)" : "none" }}>
              <div style={{ width: 40, height: 40, borderRadius: 14, flexShrink: 0, background: n.iconBg, color: n.iconColor, display: "flex", alignItems: "center", justifyContent: "center" }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: n.read ? 500 : 700, fontSize: 14 }}>{n.title}</div>
                <div className="text-sm c-muted" style={{ marginTop: 2, lineHeight: 1.5 }}>{n.sub}</div>
                <div className="text-xs c-light" style={{ marginTop: 5 }}>{n.time}</div>
              </div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal)", flexShrink: 0, marginTop: 6 }}/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function AdminScreen({ onBack, onNavigate }) {
  const [batches, setBatches] = useState([]);
  const [discCount, setDiscCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(ENDPOINTS.reconciliation).catch(() => null),
      api.get(ENDPOINTS.discrepancies + "?status=open").catch(() => null),
    ]).then(([recon, disc]) => {
      const list = recon?.results || (Array.isArray(recon) ? recon : []);
      setBatches(list);
      setDiscCount(disc?.count ?? disc?.results?.length ?? 0);
    }).finally(() => setLoading(false));
  }, []);

  const totalChecked = batches.reduce((a,b) => a + (b.total_checked || 0), 0);
  const totalMatched = batches.reduce((a,b) => a + (b.total_matched || 0), 0);

  const stats = [
    { icon: <BarChart3 size={20} strokeWidth={2} color="var(--teal)"/>,       bg: "var(--teal-pale)",  value: batches.length, label: "Batches" },
    { icon: <Activity size={20} strokeWidth={2} color="var(--amber)"/>,       bg: "var(--amber-bg)",   value: totalChecked,   label: "Vérifiées" },
    { icon: <Check size={20} strokeWidth={2.5} color="var(--green)"/>,        bg: "var(--green-bg)",   value: totalMatched,   label: "Correctes" },
    { icon: <AlertTriangle size={20} strokeWidth={2} color="var(--red)"/>,    bg: "var(--red-bg)",     value: discCount,      label: "Écarts" },
  ];

  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={onBack}/>
        <span className="header-title">Administration</span>
        <div style={{ width: 44 }}/>
      </div>
      <div className="screen pt-4">
        {loading
          ? <div style={{ textAlign: "center", padding: 40 }}><Loader2 size={24} className="spin" style={{ color: "var(--teal-mid)" }}/></div>
          : <>
              <div className="stat-grid" style={{ marginBottom: 24 }}>
                {stats.map(s => (
                  <div key={s.label} className="stat-card">
                    <div style={{ width: 36, height: 36, borderRadius: 11, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</div>
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="section-header">
                <span className="section-title">Réconciliation</span>
                <span className="section-link" onClick={() => onNavigate("reconciliation")}>Voir tout</span>
              </div>
              {batches.length === 0
                ? <EmptyState icon={<BarChart3 size={26}/>} title="Aucun batch" sub="Les batches de réconciliation apparaîtront ici."/>
                : <div className="gc" style={{ padding: "0 18px" }}>
                    {batches.slice(0,5).map((b,i) => (
                      <div key={b.id||i} style={{ padding: "14px 0", borderBottom: i < 4 ? "1px solid rgba(11,107,92,0.06)" : "none" }}>
                        <div className="row between">
                          <div>
                            <div className="fw-600" style={{ fontSize: 14 }}>
                              {b.date ? new Date(b.date).toLocaleDateString("fr-FR") : `Batch #${i+1}`}
                            </div>
                            <div className="text-xs c-light" style={{ marginTop: 3 }}>
                              {b.total_checked || 0} vérifiées · {b.total_discrepancies || 0} écarts
                            </div>
                          </div>
                          <StatusBadge status={b.status || "PENDING"}/>
                        </div>
                      </div>
                    ))}
                  </div>
              }
              <div className="stack gap-3" style={{ marginTop: 20 }}>
                <button className="btn btn-glass" onClick={() => onNavigate("discrepancies")}>
                  <AlertTriangle size={16} strokeWidth={2}/>Voir les écarts ouverts
                </button>
              </div>
            </>
        }
      </div>
    </div>
  );
}

// ─── RECONCILIATION ───────────────────────────────────────────────────────────
function ReconciliationScreen({ onBack }) {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(ENDPOINTS.reconciliation)
      .then(d => setBatches(d?.results || (Array.isArray(d) ? d : [])))
      .catch(() => setBatches([]))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={onBack}/>
        <span className="header-title">Réconciliation</span>
        <div style={{ width: 44 }}/>
      </div>
      <div className="screen pt-4">
        {loading
          ? <div style={{ textAlign: "center", padding: 40 }}><Loader2 size={24} className="spin" style={{ color: "var(--teal-mid)" }}/></div>
          : batches.length === 0
            ? <EmptyState icon={<BarChart3 size={28}/>} title="Aucun batch" sub="Lancez une réconciliation depuis les tâches planifiées."/>
            : <div className="stack gap-4">
                {batches.map((b,i) => (
                  <div key={b.id||i} className="gc" style={{ padding: 20 }}>
                    <div className="row between" style={{ marginBottom: 14 }}>
                      <div>
                        <div className="fw-700" style={{ fontSize: 15 }}>
                          {b.date ? new Date(b.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }) : `Batch #${i+1}`}
                        </div>
                        <div className="text-xs c-light" style={{ marginTop: 3 }}>
                          {b.started_at ? new Date(b.started_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : ""}
                        </div>
                      </div>
                      <StatusBadge status={b.status || "PENDING"}/>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
                      {[["Vérifiées", b.total_checked || 0], ["Correctes", b.total_matched || 0], ["Écarts", b.total_discrepancies || 0]].map(([k,v]) => (
                        <div key={k} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 22, fontWeight: 800 }}>{v}</div>
                          <div className="text-xs c-light">{k}</div>
                        </div>
                      ))}
                    </div>
                    {b.total_checked > 0 && (
                      <>
                        <div className="prog-track"><div className="prog-fill" style={{ width: `${Math.round((b.total_matched / b.total_checked) * 100)}%` }}/></div>
                        <div className="text-xs c-muted" style={{ textAlign: "right", marginTop: 5 }}>
                          {Math.round((b.total_matched / b.total_checked) * 100)}% de correspondance
                        </div>
                      </>
                    )}
                    {b.error_message && (
                      <div className="row gap-2" style={{ marginTop: 10, background: "var(--red-bg)", borderRadius: "var(--r-xs)", padding: "8px 10px" }}>
                        <AlertTriangle size={13} color="var(--red)" style={{ flexShrink: 0 }}/>
                        <span style={{ fontSize: 12, color: "var(--red)" }}>{b.error_message}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
        }
      </div>
    </div>
  );
}

// ─── DISCREPANCIES ────────────────────────────────────────────────────────────
function DiscrepanciesScreen({ onBack }) {
  const toast = useToast();
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [resolving, setResolving] = useState(null);
  useEffect(() => {
    api.get(ENDPOINTS.discrepancies)
      .then(d => setItems(d?.results || (Array.isArray(d) ? d : [])))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);
  const resolve = useCallback(async (id) => {
    setResolving(id);
    try { 
      await api.patch(ENDPOINTS.resolveDiscrepancy(id), { resolved: true }); 
      setItems(prev => prev.filter(d => d.id !== id)); 
      toast("Écart résolu", "success"); 
    }
    catch { toast("Erreur lors de la résolution", "error"); }
    finally { setResolving(null); }
  }, [toast]);
  const typeLabel = { AMOUNT_MISMATCH: "Montant différent", STATUS_MISMATCH: "Statut différent", MISSING_PROVIDER: "Manquant chez le provider", MISSING_INTERNAL: "Manquant en interne" };
  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={onBack}/>
        <span className="header-title">Écarts</span>
        <div style={{ width: 44 }}/>
      </div>
      <div className="screen pt-4">
        {loading
          ? <div style={{ textAlign: "center", padding: 40 }}><Loader2 size={24} className="spin" style={{ color: "var(--teal-mid)" }}/></div>
          : items.length === 0
            ? <EmptyState icon={<CheckCircle2 size={32} color="var(--green)"/>} title="Aucun écart ouvert" sub="Toutes les transactions correspondent."/>
            : <div className="stack gap-3">
                {items.map(d => (
                  <div key={d.id} className="gc" style={{ padding: 18 }}>
                    <div className="row between" style={{ marginBottom: 10 }}>
                      <span className="badge badge-pending">{typeLabel[d.discrepancy_type] || d.discrepancy_type}</span>
                      <span className="mono text-xs c-light">#{String(d.internal_reference).slice(-8)}</span>
                    </div>
                    <div className="stack gap-2" style={{ marginBottom: 14 }}>
                      {d.internal_status && <div className="text-sm c-muted">Interne : <span className="fw-600">{d.internal_status}</span></div>}
                      {d.provider_status && <div className="text-sm c-muted">Provider : <span className="fw-600">{d.provider_status}</span></div>}
                      {d.internal_amount && <div className="text-sm c-muted">Montant interne : <span className="fw-600">{formatAmount(d.internal_amount)}</span></div>}
                      {d.provider_amount && <div className="text-sm c-muted">Montant provider : <span className="fw-600">{formatAmount(d.provider_amount)}</span></div>}
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => resolve(d.id)} disabled={resolving === d.id}>
                      {resolving === d.id ? <Loader2 size={14} className="spin"/> : <><Check size={14} strokeWidth={2.5}/>Marquer résolu</>}
                    </button>
                  </div>
                ))}
              </div>
        }
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav({ active, onNavigate, isAdmin }) {
  const items = [
    { id: "home",    icon: <Home size={18} strokeWidth={2}/>,          label: "Accueil" },
    { id: "history", icon: <Clock size={18} strokeWidth={2}/>,         label: "Historique" },
    { id: "send",    icon: <Send size={18} strokeWidth={2}/>,          label: "Envoyer" },
    { id: "profile", icon: <User size={18} strokeWidth={2}/>,          label: "Profil" },
    ...(isAdmin ? [{ id: "admin", icon: <Shield size={18} strokeWidth={2}/>, label: "Admin" }] : []),
  ];
  return (
    <nav className="bottom-nav">
      {items.map(item => (
        <div key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => onNavigate(item.id)}>
          <div className="nav-pill">{item.icon}</div>
          <span className="nav-label">{item.label}</span>
        </div>
      ))}
    </nav>
  );
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────
function AppContent() {
  const { user } = useAuth();
  const [screen, setScreen]         = useState(user ? "home" : "landing");
  const [screenStack, setScreenStack] = useState([]);
  const [screenData, setScreenData] = useState(null);

  const navigate = useCallback((to, data = null) => {
    setScreenStack(s => [...s, screen]);
    setScreen(to); 
    setScreenData(data);
  }, [screen]);

  const goBack = useCallback(() => {
    const prev = screenStack[screenStack.length - 1] || "home";
    setScreenStack(s => s.slice(0, -1));
    setScreen(prev); 
    setScreenData(null);
  }, [screenStack]);

  if (!user) {
    if (screen === "login")    return <LoginScreen    onBack={goBack} onSuccess={() => { setScreen("home"); setScreenStack([]); }} onRegister={() => setScreen("register")}/>;
    if (screen === "register") return <RegisterScreen onBack={goBack} onSuccess={() => setScreen("login")}/>;
    return <LandingScreen onLogin={() => navigate("login")} onRegister={() => navigate("register")}/>;
  }

  const isAdmin = user?.role === "admin";
  const noNavScreens = ["send", "receive", "changePassword", "settings", "wallets", "txDetail", "admin", "reconciliation", "discrepancies", "notifications"];
  const showNav = !noNavScreens.includes(screen);
  const mainScreens = ["home", "history", "profile", ...(isAdmin ? ["admin"] : [])];
  const activeNav = mainScreens.includes(screen) ? screen : screenStack.find(s => mainScreens.includes(s)) || "home";
  const navTo = useCallback((to) => { 
    setScreenStack([]); 
    setScreen(to); 
    setScreenData(null); 
  }, []);

  return (
    <div className="app-shell">
      {screen === "home"          && <HomeScreen               onNavigate={navigate}/>}
      {screen === "history"       && <HistoryScreen            onBack={goBack} onTxClick={tx => navigate("txDetail", tx)}/>}
      {screen === "send"          && <SendScreen               onBack={goBack}/>}
      {screen === "receive"       && <ReceiveScreen            onBack={goBack}/>}
      {screen === "profile"       && <ProfileScreen            onNavigate={navigate}/>}
      {screen === "changePassword" && <ChangePasswordScreen     onBack={goBack}/>}
      {screen === "settings"      && <SettingsScreen           onBack={goBack}/>}
      {screen === "wallets"       && <WalletsScreen            onBack={goBack}/>}
      {screen === "txDetail"      && <TransferDetailScreen     tx={screenData} onBack={goBack}/>}
      {screen === "notifications" && <NotificationsScreen      onBack={goBack}/>}
      {screen === "admin"         && <AdminScreen              onBack={goBack} onNavigate={navigate}/>}
      {screen === "reconciliation" && <ReconciliationScreen     onBack={goBack}/>}
      {screen === "discrepancies" && <DiscrepanciesScreen      onBack={goBack}/>}
      {showNav && <BottomNav active={activeNav} onNavigate={navTo} isAdmin={isAdmin}/>}
    </div>
  );
}

export default function App() {
  return (
    <>
      <GlobalStyles/>
      <ToastProvider>
        <AuthProvider>
          <AppContent/>
        </AuthProvider>
      </ToastProvider>
    </>
  );
}
