import { useState, useEffect, useCallback, createContext, useContext, useRef } from "react";
import {
  Home, ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Clock,
  User, Settings, Bell, ChevronRight, ChevronLeft, Eye, EyeOff,
  Copy, Check, RefreshCw, AlertTriangle, LogOut, Lock,
  Wallet, Shield, BarChart3, Layers, Phone, Mail,
  CheckCircle2, XCircle, Loader2, X, Filter,
  TrendingUp, Activity, Zap, Send, Download, Sparkles,
  ArrowRight, CreditCard, PieChart, Users, Globe, Star
} from "lucide-react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api/v1";
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
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* Brand - Teal Forest */
      --teal-900: #042F2A;
      --teal-800: #06433C;
      --teal-700: #0B6B5C;
      --teal-600: #0D8570;
      --teal-500: #10A084;
      --teal-400: #34BFA7;
      --teal-300: #5ED5C1;
      --teal-200: #8FE8DA;
      --teal-100: #C4F4ED;
      --teal-50:  #E8FAF7;

      /* Warm accent */
      --sand-900: #5C4A2A;
      --sand-700: #8B7340;
      --sand-500: #C4B49A;
      --sand-300: #D9CFBD;
      --sand-100: #F0EBE3;
      --sand-50:  #F8F5F1;

      /* Neutral */
      --cream:  #FCFAF7;
      --white:  #FFFFFF;
      --gray-50:  #F9FAFB;
      --gray-100: #F3F4F6;
      --gray-200: #E5E7EB;
      --gray-300: #D1D5DB;
      --gray-400: #9CA3AF;
      --gray-500: #6B7280;
      --gray-600: #4B5563;
      --gray-700: #374151;
      --gray-800: #1F2937;
      --gray-900: #111827;

      /* Semantic */
      --green:  #10B981;
      --green-light: #D1FAE5;
      --red:    #EF4444;
      --red-light: #FEE2E2;
      --amber:  #F59E0B;
      --amber-light: #FEF3C7;

      /* Glass effect layers */
      --glass-surface: rgba(255, 255, 255, 0.72);
      --glass-surface-hover: rgba(255, 255, 255, 0.88);
      --glass-border: rgba(255, 255, 255, 0.55);
      --glass-border-hover: rgba(255, 255, 255, 0.85);
      --glass-shadow-sm: 0 1px 3px rgba(11, 107, 92, 0.04), 0 1px 2px rgba(11, 107, 92, 0.06);
      --glass-shadow-md: 0 4px 6px rgba(11, 107, 92, 0.04), 0 2px 4px rgba(11, 107, 92, 0.06);
      --glass-shadow-lg: 0 10px 15px rgba(11, 107, 92, 0.05), 0 4px 6px rgba(11, 107, 92, 0.05);
      --glass-shadow-xl: 0 20px 25px rgba(11, 107, 92, 0.06), 0 10px 10px rgba(11, 107, 92, 0.04);
      --glass-blur: blur(24px) saturate(1.8);
      --glass-blur-heavy: blur(40px) saturate(2);

      /* Radius */
      --r-xs: 6px;
      --r-sm: 10px;
      --r-md: 16px;
      --r-lg: 20px;
      --r-xl: 24px;
      --r-2xl: 32px;
      --r-3xl: 40px;

      /* Animations */
      --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
      --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
      --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
    }

    html { 
      font-size: 16px; 
      -webkit-font-smoothing: antialiased; 
      text-rendering: optimizeLegibility;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      font-family: 'Inter', 'Sora', sans-serif;
      background: var(--cream);
      color: var(--gray-900);
      min-height: 100dvh;
      overscroll-behavior: none;
      overflow-x: hidden;
    }

    /* ═══════════════════════════════════════
       ANIMATED GRADIENT BACKGROUNDS
    ═══════════════════════════════════════ */
    @keyframes gradientShift1 {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes gradientShift2 {
      0%, 100% { background-position: 100% 0%; }
      50% { background-position: 0% 100%; }
    }
    @keyframes gradientShift3 {
      0% { background-position: 0% 0%; }
      100% { background-position: 200% 200%; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-10px) rotate(1deg); }
      66% { transform: translateY(5px) rotate(-1deg); }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    @keyframes numberCount {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .gradient-animated {
      background-size: 200% 200%;
      animation: gradientShift1 8s ease infinite;
    }
    .gradient-animated-slow {
      background-size: 200% 200%;
      animation: gradientShift2 15s ease infinite;
    }

    /* ── Shell ── */
    .app-shell {
      max-width: 430px;
      min-height: 100dvh;
      margin: 0 auto;
      background: var(--cream);
      position: relative;
      overflow-x: hidden;
    }

    /* ── Page animation ── */
    .page { 
      animation: pageIn 0.4s var(--ease-out-expo) both; 
    }
    @keyframes pageIn {
      from { opacity: 0; transform: translateY(16px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* ═══════════════════════════════════════
       GLASS COMPONENTS - PREMIUM
    ═══════════════════════════════════════ */
    .glass {
      background: var(--glass-surface);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      border-radius: var(--r-lg);
      box-shadow: var(--glass-shadow-md);
      transition: all 0.3s var(--ease-spring);
    }
    .glass:hover {
      background: var(--glass-surface-hover);
      border-color: var(--glass-border-hover);
      box-shadow: var(--glass-shadow-lg);
      transform: translateY(-1px);
    }
    .glass:active {
      transform: scale(0.985);
      transition: transform 0.1s var(--ease-spring);
    }

    .glass-heavy {
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: var(--glass-blur-heavy);
      -webkit-backdrop-filter: var(--glass-blur-heavy);
      border: 1px solid rgba(255, 255, 255, 0.7);
      border-radius: var(--r-xl);
      box-shadow: var(--glass-shadow-xl);
    }

    .glass-dark {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(16px) saturate(1.2);
      -webkit-backdrop-filter: blur(16px) saturate(1.2);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: var(--r-lg);
    }

    /* ═══════════════════════════════════════
       BENTO GRID SYSTEM
    ═══════════════════════════════════════ */
    .bento-grid {
      display: grid;
      gap: 12px;
      padding: 0;
    }
    .bento-grid-2 {
      grid-template-columns: 1fr 1fr;
    }
    .bento-grid-3 {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .bento-grid-4 {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .bento-grid-hero {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
    }
    .bento-card {
      background: var(--glass-surface);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      border-radius: var(--r-xl);
      padding: 20px;
      position: relative;
      overflow: hidden;
      transition: all 0.35s var(--ease-spring);
      cursor: pointer;
    }
    .bento-card:hover {
      background: var(--glass-surface-hover);
      border-color: var(--glass-border-hover);
      box-shadow: var(--glass-shadow-lg);
      transform: translateY(-2px);
    }
    .bento-card:active {
      transform: scale(0.97);
    }
    .bento-card.span-2 {
      grid-column: span 2;
    }
    .bento-card.span-2-row {
      grid-row: span 2;
    }

    /* Bento card glow accent */
    .bento-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(11,107,92,0.2), transparent);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .bento-card:hover::before {
      opacity: 1;
    }

    /* ═══════════════════════════════════════
       BOTTOM NAV - FLOATING GLASS
    ═══════════════════════════════════════ */
    .bottom-nav {
      position: fixed;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 32px);
      max-width: 398px;
      background: rgba(255, 255, 255, 0.78);
      backdrop-filter: blur(32px) saturate(2);
      -webkit-backdrop-filter: blur(32px) saturate(2);
      border: 1px solid rgba(255, 255, 255, 0.7);
      border-radius: var(--r-2xl);
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 8px 4px;
      z-index: 100;
      box-shadow: 0 8px 32px rgba(11, 107, 92, 0.08), 0 2px 8px rgba(11, 107, 92, 0.04);
    }
    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      padding: 8px 4px;
      -webkit-tap-highlight-color: transparent;
      transition: all 0.3s var(--ease-spring);
      position: relative;
      border-radius: var(--r-lg);
    }
    .nav-item:hover {
      background: rgba(11, 107, 92, 0.04);
    }
    .nav-item:active {
      transform: scale(0.92);
    }
    .nav-pill {
      width: 40px;
      height: 32px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.35s var(--ease-out-back);
      color: var(--gray-400);
      position: relative;
    }
    .nav-item.active .nav-pill {
      background: linear-gradient(135deg, var(--teal-700), var(--teal-500));
      color: #fff;
      box-shadow: 0 4px 16px rgba(11, 107, 92, 0.3), 0 1px 3px rgba(11, 107, 92, 0.2);
      transform: translateY(-2px);
    }
    .nav-label {
      font-size: 10px;
      font-weight: 600;
      color: var(--gray-400);
      transition: all 0.3s;
      letter-spacing: 0.02em;
    }
    .nav-item.active .nav-label {
      color: var(--teal-700);
      font-weight: 700;
    }

    /* Active indicator dot */
    .nav-item.active::after {
      content: '';
      position: absolute;
      bottom: 2px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--teal-500);
    }

    /* ═══════════════════════════════════════
       SCREEN HEADER
    ═══════════════════════════════════════ */
    .screen-header {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(252, 250, 247, 0.72);
      backdrop-filter: blur(28px) saturate(2);
      -webkit-backdrop-filter: blur(28px) saturate(2);
      border-bottom: 1px solid rgba(11, 107, 92, 0.06);
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .header-title {
      font-size: 17px;
      font-weight: 700;
      letter-spacing: -0.3px;
      color: var(--gray-900);
    }

    /* ═══════════════════════════════════════
       BUTTONS - PREMIUM
    ═══════════════════════════════════════ */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: none;
      cursor: pointer;
      font-family: 'Inter', 'Sora', sans-serif;
      font-weight: 600;
      transition: all 0.25s var(--ease-spring);
      -webkit-tap-highlight-color: transparent;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      border-radius: var(--r-md);
    }
    .btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transform: translateX(-100%);
      transition: transform 0.5s;
    }
    .btn:hover::after {
      transform: translateX(100%);
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--teal-700), var(--teal-500));
      color: #fff;
      padding: 16px 24px;
      font-size: 15px;
      width: 100%;
      box-shadow: 0 4px 16px rgba(11, 107, 92, 0.25), 0 1px 3px rgba(11, 107, 92, 0.15);
      font-weight: 600;
      letter-spacing: -0.2px;
    }
    .btn-primary:hover {
      box-shadow: 0 8px 24px rgba(11, 107, 92, 0.35), 0 2px 6px rgba(11, 107, 92, 0.2);
      transform: translateY(-1px);
    }
    .btn-primary:active {
      transform: scale(0.97);
      box-shadow: 0 2px 8px rgba(11, 107, 92, 0.2);
    }
    .btn-primary:disabled {
      opacity: 0.5;
      pointer-events: none;
      filter: grayscale(0.3);
    }

    .btn-glass {
      background: var(--glass-surface);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      color: var(--gray-800);
      padding: 16px 24px;
      font-size: 15px;
      width: 100%;
      box-shadow: var(--glass-shadow-sm);
    }
    .btn-glass:hover {
      background: var(--glass-surface-hover);
      box-shadow: var(--glass-shadow-md);
      transform: translateY(-1px);
    }
    .btn-glass:active {
      transform: scale(0.97);
    }

    .btn-ghost {
      background: transparent;
      color: var(--gray-600);
      padding: 10px 16px;
      font-size: 14px;
    }
    .btn-ghost:hover {
      background: rgba(11, 107, 92, 0.04);
      color: var(--teal-700);
    }

    .btn-icon {
      width: 44px;
      height: 44px;
      border-radius: var(--r-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.25s var(--ease-spring);
      background: var(--glass-surface);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      color: var(--gray-700);
    }
    .btn-icon:hover {
      background: var(--glass-surface-hover);
      box-shadow: var(--glass-shadow-md);
      transform: scale(1.05);
    }
    .btn-icon:active {
      transform: scale(0.92);
    }

    .btn-sm {
      padding: 10px 18px;
      font-size: 13px;
      width: auto;
      border-radius: var(--r-sm);
    }

    .btn-danger {
      background: var(--red-light);
      color: var(--red);
      border: 1px solid rgba(239, 68, 68, 0.2);
      padding: 16px 24px;
      font-size: 15px;
      width: 100%;
    }
    .btn-danger:hover {
      background: #FEE2E2;
      border-color: rgba(239, 68, 68, 0.4);
    }
    .btn-danger:active {
      transform: scale(0.97);
    }

    /* ═══════════════════════════════════════
       INPUTS
    ═══════════════════════════════════════ */
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--gray-600);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .input-wrap { position: relative; }
    .input-icon-left {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--gray-400);
      pointer-events: none;
      display: flex;
      transition: color 0.2s;
    }
    .input-icon-right {
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--gray-400);
      cursor: pointer;
      display: flex;
      transition: color 0.2s;
    }
    .input-icon-right:hover {
      color: var(--teal-600);
    }
    .form-input {
      background: var(--glass-surface);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.5px solid var(--glass-border);
      border-radius: var(--r-sm);
      padding: 14px 16px;
      font-family: 'Inter', 'Sora', sans-serif;
      font-size: 15px;
      color: var(--gray-900);
      outline: none;
      transition: all 0.25s var(--ease-spring);
      width: 100%;
      box-shadow: var(--glass-shadow-sm);
    }
    .form-input:focus {
      border-color: var(--teal-500);
      box-shadow: 0 0 0 4px rgba(11, 107, 92, 0.08), var(--glass-shadow-sm);
    }
    .form-input:focus ~ .input-icon-left {
      color: var(--teal-500);
    }
    .form-input::placeholder { color: var(--gray-400); }
    .form-input.has-left  { padding-left: 44px; }
    .form-input.has-right { padding-right: 44px; }
    .form-input.error {
      border-color: var(--red);
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.06);
    }

    /* ═══════════════════════════════════════
       TOAST - FLOATING GLASS
    ═══════════════════════════════════════ */
    .toast-container {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: calc(100% - 32px);
      max-width: 390px;
      pointer-events: none;
    }
    .toast {
      padding: 14px 18px;
      border-radius: var(--r-md);
      font-size: 14px;
      font-weight: 500;
      background: rgba(17, 24, 21, 0.92);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      animation: toastIn 0.4s var(--ease-out-back);
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
      color: #fff;
      letter-spacing: -0.1px;
    }
    @keyframes toastIn {
      from { opacity: 0; transform: translateY(-12px) scale(0.94); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .toast-icon { flex-shrink: 0; }
    .toast-success .toast-icon { color: #34D399; }
    .toast-error   .toast-icon { color: #F87171; }
    .toast-info    .toast-icon { color: var(--sand-500); }

    /* ═══════════════════════════════════════
       SPINNER
    ═══════════════════════════════════════ */
    .spin {
      animation: spin 0.75s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ═══════════════════════════════════════
       BADGE
    ═══════════════════════════════════════ */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.02em;
    }
    .badge-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
    .badge-success { background: var(--green-light); color: #065F46; }
    .badge-success .badge-dot { background: var(--green); }
    .badge-pending { background: var(--amber-light); color: #92400E; }
    .badge-pending .badge-dot { background: var(--amber); }
    .badge-failed  { background: var(--red-light); color: #991B1B; }
    .badge-failed  .badge-dot { background: var(--red); }

    /* ═══════════════════════════════════════
       PROGRESS
    ═══════════════════════════════════════ */
    .prog-track {
      height: 6px;
      background: rgba(11, 107, 92, 0.08);
      border-radius: 3px;
      overflow: hidden;
    }
    .prog-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--teal-600), var(--teal-400));
      border-radius: 3px;
      transition: width 0.6s var(--ease-spring);
    }

    /* ═══════════════════════════════════════
       UTILITIES
    ═══════════════════════════════════════ */
    .screen { padding: 0 16px 120px; }
    .pt-4  { padding-top: 20px; }
    .stack { display: flex; flex-direction: column; }
    .row   { display: flex; align-items: center; }
    .between { justify-content: space-between; }
    .center  { justify-content: center; }
    .gap-2 { gap: 8px; }
    .gap-3 { gap: 12px; }
    .gap-4 { gap: 16px; }
    .gap-5 { gap: 20px; }
    .gap-6 { gap: 24px; }
    .w-full { width: 100%; }
    .text-sm { font-size: 13px; }
    .text-xs { font-size: 11px; }
    .c-muted { color: var(--gray-600); }
    .c-light { color: var(--gray-400); }
    .c-teal  { color: var(--teal-600); }
    .c-red   { color: var(--red); }
    .c-green { color: #059669; }
    .fw-500  { font-weight: 500; }
    .fw-600  { font-weight: 600; }
    .fw-700  { font-weight: 700; }
    .fw-800  { font-weight: 800; }
    .ls-tight { letter-spacing: -0.5px; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .divider { height: 1px; background: rgba(11, 107, 92, 0.06); }
    .scroll-x {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
      scrollbar-width: none;
    }
    .scroll-x::-webkit-scrollbar { display: none; }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px 24px;
      gap: 12px;
      text-align: center;
    }
    .empty-icon-wrap {
      width: 64px;
      height: 64px;
      border-radius: 20px;
      background: var(--glass-surface);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gray-400);
    }
    .empty-title { font-size: 16px; font-weight: 700; color: var(--gray-800); }
    .empty-sub   { font-size: 14px; color: var(--gray-500); line-height: 1.55; }

    .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .stat-card {
      padding: 18px;
      border-radius: var(--r-lg);
      background: var(--glass-surface);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      box-shadow: var(--glass-shadow-sm);
      transition: all 0.3s var(--ease-spring);
    }
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--glass-shadow-md);
    }
    .stat-value { font-size: 28px; font-weight: 800; color: var(--gray-900); letter-spacing: -1px; margin-top: 8px; }
    .stat-label { font-size: 11px; color: var(--gray-500); margin-top: 3px; font-weight: 500; }

    .section-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--gray-500);
      padding: 0 4px;
      margin-bottom: 8px;
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
    info:    <Sparkles    size={16} className="toast-icon" />,
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
    <div style={{
      position: "fixed", inset: 0,
      background: "linear-gradient(155deg, #042F2A 0%, #06433C 45%, #040F0C 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 24, zIndex: 9999,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 16,
          background: "linear-gradient(135deg, var(--sand-500) 0%, #B09A7A 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 24px rgba(196,180,154,0.3)",
          animation: "pulse-glow 2s ease-in-out infinite",
        }}>
          <Sparkles size={24} strokeWidth={1.5} color="#fff"/>
        </div>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>nexcli<span style={{color: "var(--sand-500)"}}>q</span></span>
      </div>
      <Loader2 size={24} className="spin" style={{ color: "rgba(255,255,255,0.5)" }} />
    </div>
  );

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────
function LogoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 18 L4 6 L12 14 L20 6 L20 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function Avatar({ name = "U", size = 44, light = false }) {
  const initials = (name || "").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "U";
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, flexShrink: 0, fontSize: size * 0.36,
      fontFamily: "'Inter', 'Sora', sans-serif",
      background: light
        ? "rgba(255,255,255,0.15)"
        : "linear-gradient(135deg, var(--teal-100), var(--teal-50))",
      color: light ? "#fff" : "var(--teal-700)",
      border: light ? "2.5px solid rgba(255,255,255,0.25)" : "2px solid rgba(11,107,92,0.1)",
      boxShadow: light ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
      transition: "transform 0.2s var(--ease-spring)",
    }}>
      {initials}
    </div>
  );
}

function BackBtn({ onBack }) {
  return (
    <button
      onClick={onBack}
      style={{
        width: 40, height: 40, borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", border: "none",
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        color: "var(--gray-700)",
        transition: "all 0.2s var(--ease-spring)",
      }}
    >
      <ChevronLeft size={20} strokeWidth={2.5} />
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

function SectionLabel({ children }) {
  return <div className="section-label">{children}</div>;
}

function formatAmount(amount, currency = "XOF") {
  if (amount == null) return "—";
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0 }).format(amount) + "\u202F" + currency;
}

function Toggle({ checked, onChange }) {
  return (
    <label style={{ cursor: "pointer", position: "relative", width: 46, height: 26, flexShrink: 0 }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
      <div style={{
        position: "absolute", inset: 0, borderRadius: 13,
        background: checked ? "linear-gradient(135deg, var(--teal-600), var(--teal-400))" : "var(--gray-200)",
        cursor: "pointer", transition: "all 0.3s var(--ease-spring)",
      }} />
      <div style={{
        position: "absolute", height: 20, width: 20,
        left: 3, top: 3, background: "#fff",
        borderRadius: "50%",
        transition: "transform 0.3s var(--ease-out-back)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        transform: checked ? "translateX(20px)" : "translateX(0)",
      }} />
    </label>
  );
}

function EmptyState({ icon, title, sub, children }) {
  return (
    <div className="empty-state">
      <div className="empty-icon-wrap">{icon}</div>
      <div className="empty-title">{title}</div>
      {sub && <div className="empty-sub">{sub}</div>}
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// LANDING - PREMIUM ANIMATED GRADIENT
// ═══════════════════════════════════════════════════════════════════════════
function LandingScreen({ onLogin, onRegister }) {
  return (
    <div style={{
      minHeight: "100dvh",
      background: "linear-gradient(160deg, #042F2A 0%, #06433C 30%, #0B6B5C 50%, #063832 70%, #040F0C 100%)",
      backgroundSize: "200% 200%",
      animation: "gradientShift1 12s ease infinite",
      display: "flex", flexDirection: "column",
      padding: "48px 20px 40px",
      position: "relative", overflow: "hidden",
    }} className="page">
      {/* Floating orbs */}
      <div style={{
        position: "absolute", top: -60, right: -40,
        width: 280, height: 280, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16,160,132,0.3) 0%, transparent 70%)",
        pointerEvents: "none",
        animation: "float 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: 80, left: -60,
        width: 240, height: 240, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,180,154,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
        animation: "float 10s ease-in-out infinite 2s",
      }} />

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 1 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: "linear-gradient(135deg, var(--sand-500) 0%, #B09A7A 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 24px rgba(196,180,154,0.35)",
        }}>
          <Sparkles size={22} strokeWidth={1.5} color="#fff"/>
        </div>
        <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>
          nexcli<span style={{color: "var(--sand-500)"}}>q</span>
        </span>
      </div>

      {/* Hero */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 32, position: "relative", zIndex: 1, paddingTop: 20 }}>
        <div>
          <h1 style={{
            fontSize: 40, fontWeight: 800, lineHeight: 1.08,
            color: "#fff", letterSpacing: -2, margin: 0,
          }}>
            Pay & Receive<br />
            <span style={{ color: "var(--sand-500)", fontStyle: "normal" }}>anywhere</span><br />
            with ease.
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginTop: 14, letterSpacing: -0.1 }}>
            Transfer money, pay online and get paid<br />without limitation.
          </p>
        </div>

        {/* Bento stats */}
        <div className="bento-grid bento-grid-2" style={{ gap: 8 }}>
          {[
            ["2M+", "Transactions", "var(--teal-400)"],
            ["< 30s", "Délai moyen", "var(--sand-500)"],
            ["99.9%", "Disponibilité", "#34D399"],
            ["0 perte", "Réconciliation", "var(--teal-300)"],
          ].map(([v, l, c]) => (
            <div key={l} style={{
              padding: "18px 16px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.3s",
            }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: c, letterSpacing: -0.5 }}>{v}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4, fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative", zIndex: 1 }}>
        <button
          onClick={onRegister}
          style={{
            background: "#fff", color: "var(--teal-800)",
            borderRadius: 16, padding: 18,
            fontSize: 16, fontWeight: 700,
            border: "none", cursor: "pointer", width: "100%",
            fontFamily: "'Inter', 'Sora', sans-serif",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            transition: "all 0.3s var(--ease-spring)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
          onMouseEnter={e => { e.target.style.transform = "scale(1.02)"; e.target.style.boxShadow = "0 12px 40px rgba(0,0,0,0.35)"; }}
          onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"; }}
        >
          Créer un compte <ArrowRight size={16} strokeWidth={2.5} />
        </button>
        <button
          onClick={onLogin}
          style={{
            borderRadius: 16, padding: 18,
            fontSize: 16, fontWeight: 600,
            color: "rgba(255,255,255,0.75)",
            cursor: "pointer", width: "100%",
            fontFamily: "'Inter', 'Sora', sans-serif",
            transition: "all 0.3s",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Se connecter
        </button>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 28, position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: 0.04 }}>
          Powered by <span style={{ fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>WEMOVE SOLUTIONS</span>
        </p>
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
      {/* Auth Hero */}
      <div style={{
        background: "linear-gradient(155deg, #042F2A 0%, #0B6B5C 50%, #063832 100%)",
        backgroundSize: "200% 200%",
        animation: "gradientShift2 10s ease infinite",
        padding: "56px 20px 36px", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -30, right: -30,
          width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,180,154,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "float 6s ease-in-out infinite",
        }} />
        <div style={{ marginBottom: 20 }}><BackBtn onBack={onBack} /></div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, position: "relative", zIndex: 1 }}>
          Connexion
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: -1, lineHeight: 1.1, position: "relative", zIndex: 1 }}>
          Bon retour !
        </div>
      </div>

      <div style={{ padding: "24px 20px 40px", display: "flex", flexDirection: "column", gap: 18, background: "var(--cream)" }}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="input-wrap">
            <span className="input-icon-left"><Mail size={16} /></span>
            <input className={`form-input has-left ${errors.email ? "error" : ""}`} type="email"
              placeholder="vous@exemple.com" value={form.email} onChange={set("email")} />
          </div>
          {errors.email && <span style={{ fontSize:12, color:"var(--red)", display:"flex", alignItems:"center", gap:4 }}><AlertTriangle size={11}/>{errors.email}</span>}
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
          {errors.password && <span style={{ fontSize:12, color:"var(--red)", display:"flex", alignItems:"center", gap:4 }}><AlertTriangle size={11}/>{errors.password}</span>}
        </div>

        {errors.general && <div style={{ fontSize:12, color:"var(--red)", justifyContent:"center", display:"flex", alignItems:"center", gap:4 }}><AlertTriangle size={11}/>{errors.general}</div>}

        <button className="btn btn-primary" onClick={submit} disabled={loading}>
          {loading ? <Loader2 size={18} className="spin" /> : "Se connecter"}
        </button>

        <p style={{ textAlign: "center", fontSize: 14 }}>
          <span style={{ color: "var(--gray-500)" }}>Pas encore de compte ? </span>
          <span style={{ color: "var(--teal-600)", fontWeight: 600, cursor: "pointer" }} onClick={onRegister}>S'inscrire</span>
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
      <div style={{
        background: "linear-gradient(155deg, #042F2A 0%, #0B6B5C 50%, #063832 100%)",
        backgroundSize: "200% 200%",
        animation: "gradientShift2 10s ease infinite",
        padding: "56px 20px 36px", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -30, right: -30,
          width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,180,154,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "float 6s ease-in-out infinite",
        }} />
        <div style={{ marginBottom: 20 }}><BackBtn onBack={step === 1 ? onBack : () => setStep(1)} /></div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, position: "relative", zIndex: 1 }}>
          Étape {step} / 2
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: -1, lineHeight: 1.1, position: "relative", zIndex: 1 }}>
          {step === 1 ? "Créer un compte" : "Sécuriser l'accès"}
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 2, marginTop: 20, position: "relative", zIndex: 1, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "var(--sand-500)", borderRadius: 2, transition: "width 0.5s var(--ease-spring)", width: step === 1 ? "50%" : "100%" }} />
        </div>
      </div>

      <div style={{ padding: "24px 20px 40px", display: "flex", flexDirection: "column", gap: 18, background: "var(--cream)" }}>
        {step === 1 ? (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {[["first_name","Prénom"],["last_name","Nom"]].map(([k,l]) => (
                <div className="form-group" key={k}>
                  <label className="form-label">{l}</label>
                  <input className={`form-input ${errors[k]?"error":""}`} placeholder={k==="first_name"?"Jean":"Dupont"} value={form[k]} onChange={set(k)} />
                  {errors[k] && <span style={{ fontSize:11, color:"var(--red)", display:"flex", alignItems:"center", gap:3 }}><AlertTriangle size={10}/>{errors[k]}</span>}
                </div>
              ))}
            </div>
            {[["email","Email","email"],["username","Nom d'utilisateur","text"]].map(([k,l,t]) => (
              <div className="form-group" key={k}>
                <label className="form-label">{l}</label>
                <input className={`form-input ${errors[k]?"error":""}`} type={t} placeholder={k==="email"?"vous@exemple.com":"@utilisateur"} value={form[k]} onChange={set(k)} />
                {errors[k] && <span style={{ fontSize:11, color:"var(--red)", display:"flex", alignItems:"center", gap:3 }}><AlertTriangle size={10}/>{errors[k]}</span>}
              </div>
            ))}
            <button className="btn btn-primary" onClick={() => { if (v1()) setStep(2); }}>Continuer <ChevronRight size={16} strokeWidth={2.5}/></button>
          </>
        ) : (
          <>
            {[["password","Nouveau mot de passe"],["password2","Confirmer"]].map(([k,l]) => (
              <div className="form-group" key={k}>
                <label className="form-label">{l}</label>
                <div className="input-wrap">
                  <span className="input-icon-left"><Lock size={16}/></span>
                  <input className={`form-input has-left ${k==="password"?"has-right":""} ${errors[k]?"error":""}`}
                    type={(k==="password" && showPwd) ? "text" : "password"} placeholder="••••••••" value={form[k]} onChange={set(k)} />
                  {k==="password" && (
                    <span className="input-icon-right" onClick={() => setShowPwd(s => !s)}>
                      {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </span>
                  )}
                </div>
                {errors[k] && <span style={{ fontSize:11, color:"var(--red)", display:"flex", alignItems:"center", gap:3 }}><AlertTriangle size={10}/>{errors[k]}</span>}
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

// ─── HOME - BENTO GRID ────────────────────────────────────────────────────────
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

  return (
    <div className="page">
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ fontSize: 11, color: "var(--gray-400)", fontWeight: 500, letterSpacing: 0.02 }}>Bonjour,</div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5, color: "var(--gray-900)" }}>{displayName}</div>
        </div>
        <div className="row gap-2">
          <button className="btn-icon" onClick={() => onNavigate("notifications")}>
            <Bell size={18} strokeWidth={2} />
          </button>
          <Avatar name={displayName} size={40} />
        </div>
      </div>

      <div className="screen pt-4">
        {/* Wallet Hero Card */}
        <div style={{
          background: "linear-gradient(145deg, #06433C 0%, #0B6B5C 40%, #042F2A 100%)",
          backgroundSize: "200% 200%",
          animation: "gradientShift1 8s ease infinite",
          borderRadius: "var(--r-2xl)",
          padding: "28px 24px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 24px 48px rgba(11,107,92,0.25), 0 1px 0 rgba(255,255,255,0.08) inset",
          marginBottom: 20,
        }}>
          <div style={{
            position: "absolute", top: -40, right: -30,
            width: 180, height: 180, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: -40, left: -20,
            width: 160, height: 160, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,180,154,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 500, letterSpacing: 0.04, marginBottom: 8 }}>
              {wallet ? `${wallet.provider || "Portefeuille"} · ${wallet.status || "Actif"}` : "Portefeuille"}
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, color: "#fff", letterSpacing: -2, marginBottom: 20, lineHeight: 1 }}>
              {loadingData
                ? <Loader2 size={28} className="spin" style={{ color: "rgba(255,255,255,0.5)" }} />
                : balance != null
                  ? <><sup style={{ fontSize: 16, fontWeight: 600, verticalAlign: "super" }}>{currency}</sup>{new Intl.NumberFormat("fr-FR").format(balance)}</>
                  : "—"
              }
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => onNavigate("send")}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  padding: "12px 16px", borderRadius: 14,
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff", fontSize: 14, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'Inter', 'Sora', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                <Send size={15} strokeWidth={2.5} />Envoyer
              </button>
              <button
                onClick={() => onNavigate("receive")}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  padding: "12px 16px", borderRadius: 14,
                  background: "rgba(196,180,154,0.15)",
                  backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(196,180,154,0.22)",
                  color: "var(--sand-300)", fontSize: 14, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'Inter', 'Sora', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                <Download size={15} strokeWidth={2.5} />Recevoir
              </button>
            </div>
          </div>
        </div>

        {/* Bento Quick Actions */}
        <div className="bento-grid bento-grid-4" style={{ gap: 8, marginBottom: 24 }}>
          {[
            { icon: <Send size={20} strokeWidth={2} />, label: "Envoyer", color: "var(--teal-600)", bg: "rgba(11,107,92,0.06)", action: "send" },
            { icon: <Download size={20} strokeWidth={2} />, label: "Recevoir", color: "#D4870A", bg: "rgba(212,135,10,0.06)", action: "receive" },
            { icon: <CreditCard size={20} strokeWidth={2} />, label: "Payer", color: "#7C5CBF", bg: "rgba(124,92,191,0.06)", action: "send" },
            { icon: <Clock size={20} strokeWidth={2} />, label: "Historique", color: "var(--gray-600)", bg: "rgba(107,114,128,0.06)", action: "history" },
          ].map(q => (
            <div key={q.label}
              onClick={() => onNavigate(q.action)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                padding: "16px 8px", borderRadius: 18, cursor: "pointer",
                background: "var(--glass-surface)",
                backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border)",
                transition: "all 0.3s var(--ease-spring)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(11,107,92,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 16,
                background: q.bg, color: q.color,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {q.icon}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--gray-600)" }}>{q.label}</span>
            </div>
          ))}
        </div>

        {/* Recent transactions */}
        <div className="section-header">
          <span className="section-title">Transactions récentes</span>
          <span className="section-link" onClick={() => onNavigate("history")}>Voir tout</span>
        </div>

        <div className="glass-heavy" style={{ padding: "0 18px" }}>
          {loadingData
            ? <div style={{ padding: "32px 0", display: "flex", justifyContent: "center" }}><Loader2 size={22} className="spin" style={{ color: "var(--teal-500)" }}/></div>
            : transfers.length === 0
              ? <EmptyState icon={<ArrowLeftRight size={26}/>} title="Aucune transaction" sub="Vos transactions apparaîtront ici" />
              : transfers.map((tx, i) => (
                  <div key={tx.id||i}
                    onClick={() => onNavigate("txDetail", tx)}
                    style={{
                      display: "flex", alignItems: "center", gap: 13,
                      padding: "14px 0", cursor: "pointer",
                      borderBottom: i < transfers.length-1 ? "1px solid rgba(11,107,92,0.05)" : "none",
                      transition: "opacity 0.15s",
                    }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: tx.direction === "IN" ? "var(--green-light)" : "rgba(11,107,92,0.06)",
                    }}>
                      {tx.direction === "IN"
                        ? <ArrowDownLeft size={20} strokeWidth={2} color="var(--green)"/>
                        : <ArrowUpRight size={20} strokeWidth={2} color="var(--teal-600)"/>
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-900)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {tx.receiver_phone || tx.sender_phone || "Transfert"}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--gray-400)", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
                        <span>{tx.provider || "NexCliq"}</span>
                        {tx.created_at && <><span>·</span><span>{new Date(tx.created_at).toLocaleDateString("fr-FR")}</span></>}
                        {tx.status && <StatusBadge status={tx.status}/>}
                      </div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: tx.direction === "IN" ? "#059669" : "var(--gray-900)" }}>
                      {tx.direction === "IN" ? "+" : "−"}{formatAmount(tx.amount, tx.currency)}
                    </div>
                  </div>
                ))
          }
        </div>
      </div>
    </div>
  );
}

// ─── SEND SCREEN ──────────────────────────────────────────────────────────────
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
    { id:"MTN",    label:"MTN MoMo",      sub:"Mobile Money",  icon:<Activity size={22} color="#D4870A"/>, bg:"#FFF8E8", border:"rgba(212,135,10,0.15)" },
    { id:"ORANGE", label:"Orange Money",  sub:"Orange Money",  icon:<Zap size={22} color="#FF6600"/>,      bg:"#FFF4EE", border:"rgba(255,102,0,0.15)" },
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
    <div className="page" style={{ minHeight:"100dvh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:28, gap:24 }}>
      <div style={{ width:80, height:80, borderRadius:"50%", background:"var(--green-light)", display:"flex", alignItems:"center", justifyContent:"center", animation:"pulse-glow 2s ease-in-out infinite" }}>
        <CheckCircle2 size={40} strokeWidth={1.5} color="var(--green)"/>
      </div>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:36, fontWeight:800, letterSpacing:-1.5 }}>{formatAmount(result.amount||amount)}</div>
        <div style={{ fontSize:15, color:"var(--gray-500)", marginTop:8 }}>Envoyé vers {result.receiver_phone||phone}</div>
        <div style={{ marginTop:10 }}><StatusBadge status={result.status||"PENDING"}/></div>
      </div>
      <div className="glass-heavy" style={{ width:"100%", padding:"0 18px" }}>
        {[["Référence",result.id||"—"],["Réseau",provider],["Statut",result.status||"PENDING"]].map(([k,v]) => (
          <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"13px 0", borderBottom:"1px solid rgba(11,107,92,0.05)" }}>
            <span style={{ color:"var(--gray-500)", fontSize:13 }}>{k}</span>
            <span className="fw-600 mono" style={{ fontSize:13 }}>{String(v)}</span>
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
        <div style={{ width:40 }}/>
      </div>
      <div className="screen pt-4">
        {step === 1 && (
          <div className="stack gap-5">
            <div>
              <div className="section-title" style={{ marginBottom:12 }}>Choisir le réseau</div>
              <div className="stack gap-3">
                {providers.map(p => (
                  <div key={p.id}
                    onClick={() => setProvider(p.id)}
                    className={`glass ${provider===p.id ? "selected" : ""}`}
                    style={{
                      padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
                      borderColor: provider===p.id ? "var(--teal-500)" : undefined,
                      boxShadow: provider===p.id ? "0 0 0 4px rgba(11,107,92,0.08)" : undefined,
                    }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 14,
                      background: p.bg, border: `1.5px solid ${p.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      {p.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{p.label}</div>
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
              <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: -2.5, textAlign: "center" }}>
                <sup style={{ fontSize: 20, fontWeight: 600, verticalAlign: "super", color: "var(--gray-500)" }}>{currency} </sup>
                {amount||"0"}
              </div>
              <div className="c-light text-sm" style={{ marginTop:8 }}>→ {phone} · {provider}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {["1","2","3","4","5","6","7","8","9","000","0","del"].map(k => (
                <div key={k}
                  onClick={() => appendDigit(k)}
                  className="glass"
                  style={{
                    height: 62, borderRadius: 16,
                    fontSize: k==="del"?14:22, fontWeight: 700, color: "var(--gray-800)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", userSelect: "none",
                  }}
                >
                  {k === "del" ? <X size={18} strokeWidth={2.5}/> : k}
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
            <div style={{
              background: "linear-gradient(145deg, #06433C 0%, #0B6B5C 40%, #042F2A 100%)",
              borderRadius: "var(--r-2xl)", padding: 28,
              position: "relative", overflow: "hidden",
              boxShadow: "0 20px 48px rgba(11,107,92,0.25)",
            }}>
              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 500, marginBottom: 8 }}>Vous envoyez</div>
                <div style={{ fontSize: 38, fontWeight: 800, color: "#fff", letterSpacing: -2 }}>
                  <sup style={{ fontSize: 16, fontWeight: 600, verticalAlign: "super" }}>{currency} </sup>
                  {new Intl.NumberFormat("fr-FR").format(Number(amount))}
                </div>
              </div>
            </div>
            <div className="glass-heavy" style={{ padding:"0 18px" }}>
              {[["Destinataire",phone],["Réseau",provider],["Note",note||"—"]].map(([k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0", borderBottom:"1px solid rgba(11,107,92,0.05)" }}>
                  <span className="text-sm c-muted">{k}</span>
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
        <div style={{ width:40 }}/>
      </div>
      <div className="screen pt-4" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:28 }}>
        <div style={{ fontSize:14, color:"var(--gray-500)", textAlign:"center" }}>Partagez votre numéro pour recevoir des fonds</div>
        <div style={{
          width:160, height:160, borderRadius:32,
          background:"var(--glass-surface)",
          backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
          border:"1px solid var(--glass-border)",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"var(--glass-shadow-lg)",
        }}>
          <Phone size={52} strokeWidth={1.2} color="var(--teal-500)"/>
        </div>
        <div className="glass-heavy" style={{ width:"100%", padding:"20px", textAlign:"center" }}>
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
        <div style={{ width:40 }}/>
      </div>
      <div className="screen pt-4">
        <div className="scroll-x" style={{ marginBottom:16 }}>
          {filters.map(f => (
            <button key={f.id}
              onClick={() => changeFilter(f.id)}
              className={`btn btn-sm ${filter===f.id?"btn-primary":"btn-glass"}`}
              style={{ flexShrink:0 }}
            >
              {f.label}
            </button>
          ))}
        </div>
        {loading && page===1
          ? <div style={{ textAlign:"center", padding:40 }}><Loader2 size={24} className="spin" style={{ color:"var(--teal-500)" }}/></div>
          : transfers.length===0
            ? <EmptyState icon={<Filter size={26}/>} title="Aucune transaction" sub={`Aucun transfert ${filter!=="all"?`"${filter}"`:""}trouvé`}/>
            : <div className="glass-heavy" style={{ padding:"0 18px" }}>
                {transfers.map((tx,i) => (
                  <div key={tx.id||i}
                    onClick={() => onTxClick&&onTxClick(tx)}
                    style={{
                      display: "flex", alignItems: "center", gap: 13,
                      padding: "14px 0", cursor: "pointer",
                      borderBottom: i < transfers.length-1 ? "1px solid rgba(11,107,92,0.05)" : "none",
                    }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: tx.direction === "IN" ? "var(--green-light)" : "rgba(11,107,92,0.06)",
                    }}>
                      {tx.direction === "IN"
                        ? <ArrowDownLeft size={20} strokeWidth={2} color="var(--green)"/>
                        : <ArrowUpRight size={20} strokeWidth={2} color="var(--teal-600)"/>
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-900)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {tx.receiver_phone || tx.sender_phone || "Transfert"}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--gray-400)", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
                        <span>{tx.provider || "NexCliq"}</span>
                        {tx.created_at && <><span>·</span><span>{new Date(tx.created_at).toLocaleDateString("fr-FR")}</span></>}
                        {tx.status && <StatusBadge status={tx.status}/>}
                      </div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: tx.direction === "IN" ? "#059669" : "var(--gray-900)" }}>
                      {tx.direction === "IN" ? "+" : "−"}{formatAmount(tx.amount, tx.currency)}
                    </div>
                  </div>
                ))}
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

// ─── TRANSFER DETAIL ──────────────────────────────────────────────────────────
function TransferDetailScreen({ tx, onBack }) {
  const [detail, setDetail] = useState(tx);
  const [loading, setLoading] = useState(false);
  const refresh = useCallback(() => {
    if (!tx?.id) return;
    setLoading(true);
    api.get(ENDPOINTS.transferStatus(tx.id)).then(setDetail).finally(() => setLoading(false));
  }, [tx?.id]);

  const fields = [
    ["ID",          detail?.id||"—"],
    ["Montant",     formatAmount(detail?.amount, detail?.currency)],
    ["Statut",      detail?.status||"—"],
    ["Réseau src.", detail?.provider_from||"—"],
    ["Réseau dest.",detail?.provider_to||"—"],
    ["Expéditeur",  detail?.sender_phone||"—"],
    ["Destinataire",detail?.receiver_phone||"—"],
    ["Date",        detail?.created_at ? new Date(detail.created_at).toLocaleString("fr-FR") : "—"],
    ["Note",        detail?.note||"—"],
  ];

  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={onBack}/>
        <span className="header-title">Transaction</span>
        <button className="btn-icon" onClick={refresh} disabled={loading}>
          {loading ? <Loader2 size={16} className="spin"/> : <RefreshCw size={16} strokeWidth={2}/>}
        </button>
      </div>
      <div className="screen pt-4">
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:38, fontWeight:800, letterSpacing:-1.5 }}>{formatAmount(detail?.amount, detail?.currency)}</div>
          <div style={{ marginTop:10 }}><StatusBadge status={detail?.status||"PENDING"}/></div>
        </div>
        <div className="glass-heavy" style={{ padding:"0 18px" }}>
          {fields.map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"13px 0", borderBottom:"1px solid rgba(11,107,92,0.05)" }}>
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
      await api.patch(ENDPOINTS.updateProfile, { first_name: form.first_name, last_name: form.last_name, phone: form.phone });
      await refreshUser(); setEditing(false); toast("Profil mis à jour", "success");
    } catch (err) {
      toast(err?.data?.detail || "Erreur", "error");
    } finally { setLoading(false); }
  };
  const displayName = `${user?.first_name||""} ${user?.last_name||""}`.trim() || user?.username || "Utilisateur";

  return (
    <div className="page">
      <div style={{
        background: "linear-gradient(155deg, #042F2A 0%, #0B6B5C 50%, #063832 100%)",
        padding: "56px 20px 36px", textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -30, right: -50,
          width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,180,154,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <Avatar name={displayName} size={80} light/>
          <button onClick={() => setEditing(true)} style={{
            position:"absolute", bottom:-2, right:-2, width:28, height:28, borderRadius:"50%",
            background:"var(--sand-500)", border:"2px solid var(--cream)",
            display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
          }}>
            <Settings size={12} strokeWidth={2.5} color="#fff"/>
          </button>
        </div>
        <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>
          <div style={{ fontSize:22, fontWeight:800, color:"#fff", letterSpacing:-0.5 }}>{displayName}</div>
          <div style={{ fontSize:14, color:"rgba(255,255,255,0.5)", marginTop:3 }}>{user?.email}</div>
          <div style={{ marginTop:10 }}>
            <span className="badge" style={{ background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)" }}>
              {user?.role==="admin" ? "Admin" : user?.role==="merchant" ? "Marchand" : "Utilisateur"}
            </span>
          </div>
        </div>
      </div>

      <div className="screen pt-4">
        {editing && (
          <div className="glass-heavy" style={{ padding:18, marginBottom:16 }}>
            <div className="fw-700" style={{ fontSize:15, marginBottom:14 }}>Modifier le profil</div>
            {[["first_name","Prénom"],["last_name","Nom"],["phone","Téléphone"]].map(([k,l]) => (
              <div className="form-group" key={k} style={{ marginBottom:12 }}>
                <label className="form-label">{l}</label>
                <input className="form-input" value={form[k]} onChange={set(k)}/>
              </div>
            ))}
            <div className="row gap-3" style={{ marginTop:4 }}>
              <button className="btn btn-glass" onClick={() => setEditing(false)}>Annuler</button>
              <button className="btn btn-primary" onClick={save} disabled={loading}>
                {loading ? <Loader2 size={16} className="spin"/> : "Sauvegarder"}
              </button>
            </div>
          </div>
        )}

        <div className="glass-heavy" style={{ padding:"0 18px" }}>
          {[
            { icon:<Lock size={18} strokeWidth={2}/>,        label:"Changer le mot de passe",  action:() => onNavigate("changePassword") },
            { icon:<Wallet size={18} strokeWidth={2}/>,      label:"Mes portefeuilles",         action:() => onNavigate("wallets") },
            { icon:<Clock size={18} strokeWidth={2}/>,       label:"Historique complet",        action:() => onNavigate("history") },
            { icon:<Settings size={18} strokeWidth={2}/>,    label:"Paramètres",                action:() => onNavigate("settings") },
            ...(user?.role==="admin" ? [{ icon:<Shield size={18} strokeWidth={2}/>, label:"Administration", action:() => onNavigate("admin") }] : []),
          ].map((item,i) => (
            <div key={i}
              onClick={item.action}
              style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"16px 0", cursor:"pointer",
                borderBottom: i < 3 ? "1px solid rgba(11,107,92,0.05)" : "none",
              }}
            >
              <div className="row gap-3">
                <div style={{ width:36, height:36, borderRadius:11, background:"rgba(11,107,92,0.06)", color:"var(--teal-600)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {item.icon}
                </div>
                <span style={{ fontSize:15, fontWeight:500 }}>{item.label}</span>
              </div>
              <ChevronRight size={18} strokeWidth={2} color="var(--gray-300)"/>
            </div>
          ))}
        </div>

        <div style={{ marginTop:16 }}>
          <button className="btn btn-danger" onClick={logout}>
            <LogOut size={16} strokeWidth={2}/>Déconnexion
          </button>
        </div>
        <div style={{ textAlign:"center", marginTop:18, fontSize:11, color:"var(--gray-400)" }}>
          NexCliq v1.0 · {user?.is_verified ? "Compte vérifié" : "Compte non vérifié"}
        </div>
      </div>
    </div>
  );
}

// ─── CHANGE PASSWORD ──────────────────────────────────────────────────────────
function ChangePasswordScreen({ onBack }) {
  const toast = useToast();
  const [form, setForm]     = useState({ old_password:"", new_password:"", confirm_password:"" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false);
  const set = useCallback((k) => (e) => { setForm(f => ({ ...f, [k]: e.target.value })); setErrors(er => ({ ...er, [k]:"" })); }, []);
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
    try { await api.post(ENDPOINTS.changePassword, form); setDone(true); toast("Mot de passe modifié","success"); }
    catch (err) { toast(err?.data?.error || "Erreur","error"); }
    finally { setLoading(false); }
  };
  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={onBack}/>
        <span className="header-title">Mot de passe</span>
        <div style={{ width:40 }}/>
      </div>
      <div className="screen pt-4">
        {done
          ? <EmptyState icon={<CheckCircle2 size={32} color="var(--green)"/>} title="Mot de passe modifié" sub="Votre mot de passe a été changé avec succès.">
              <button className="btn btn-primary" style={{ marginTop:8 }} onClick={onBack}>Retour</button>
            </EmptyState>
          : <div className="stack gap-4">
              {[["old_password","Mot de passe actuel"],["new_password","Nouveau"],["confirm_password","Confirmer"]].map(([k,l]) => (
                <div className="form-group" key={k}>
                  <label className="form-label">{l}</label>
                  <div className="input-wrap">
                    <span className="input-icon-left"><Lock size={16}/></span>
                    <input className={`form-input has-left ${errors[k]?"error":""}`} type="password" placeholder="••••••••" value={form[k]} onChange={set(k)}/>
                  </div>
                  {errors[k] && <span style={{ fontSize:11, color:"var(--red)", display:"flex", alignItems:"center", gap:3 }}><AlertTriangle size={10}/>{errors[k]}</span>}
                </div>
              ))}
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
    { title:"Sécurité", items:[
      { icon:<Bell size={18}/>,       label:"Notifications push",  sub:"Alertes de transaction", ctrl:<Toggle checked={notifs}    onChange={setNotifs}/> },
      { icon:<Lock size={18}/>,       label:"Biométrie",           sub:"FaceID / empreinte",     ctrl:<Toggle checked={biometric} onChange={setBiometric}/> },
    ]},
    { title:"Apparence", items:[
      { icon:<Layers size={18}/>,     label:"Mode sombre",         sub:"Interface en mode nuit",  ctrl:<Toggle checked={darkMode}  onChange={setDarkMode}/> },
      { icon:<Globe size={18}/>,      label:"Langue",              sub:lang==="fr"?"Français":"English",
        ctrl:<button className="btn btn-ghost btn-sm" onClick={() => setLang(l => l==="fr"?"en":"fr")}>{lang==="fr"?"FR":"EN"}</button>
      },
    ]},
    { title:"Support", items:[
      { icon:<BarChart3 size={18}/>,  label:"Centre d'aide",       sub:"FAQ et guides",           ctrl:<ChevronRight size={18} strokeWidth={2} color="var(--gray-300)"/> },
      { icon:<AlertTriangle size={18}/>, label:"Signaler un problème", sub:"Contactez notre équipe", ctrl:<ChevronRight size={18} strokeWidth={2} color="var(--gray-300)"/> },
      { icon:<Shield size={18}/>,     label:"Conditions",          sub:"",                        ctrl:<ChevronRight size={18} strokeWidth={2} color="var(--gray-300)"/> },
    ]},
  ];
  return (
    <div className="page">
      <div className="screen-header">
        <BackBtn onBack={onBack}/>
        <span className="header-title">Paramètres</span>
        <div style={{ width:40 }}/>
      </div>
      <div className="screen pt-4 stack gap-5">
        {sections.map(s => (
          <div key={s.title}>
            <SectionLabel>{s.title}</SectionLabel>
            <div className="glass-heavy" style={{ padding:"0 18px" }}>
              {s.items.map((item,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 0", cursor:"pointer", borderBottom: i < s.items.length-1 ? "1px solid rgba(11,107,92,0.05)" : "none" }}>
                  <div className="row gap-3">
                    <div style={{ width:36, height:36, borderRadius:11, background:"rgba(11,107,92,0.06)", color:"var(--teal-600)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize:15, fontWeight:500 }}>{item.label}</div>
                      {item.sub && <div className="text-xs c-light" style={{ marginTop:2 }}>{item.sub}</div>}
                    </div>
                  </div>
                  {item.ctrl}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ textAlign:"center", fontSize:11, color:"var(--gray-400)" }}>by WEMOVE SOLUTIONS</div>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav({ active, onNavigate, isAdmin }) {
  const items = [
    { id:"home",    icon:<Home size={20} strokeWidth={2}/>,          label:"Accueil" },
    { id:"history", icon:<Clock size={20} strokeWidth={2}/>,         label:"Historique" },
    { id:"send",    icon:<Send size={20} strokeWidth={2}/>,          label:"Envoyer" },
    { id:"profile", icon:<User size={20} strokeWidth={2}/>,          label:"Profil" },
    ...(isAdmin ? [{ id:"admin", icon:<Shield size={20} strokeWidth={2}/>, label:"Admin" }] : []),
  ];
  return (
    <nav className="bottom-nav">
      {items.map(item => (
        <div key={item.id} className={`nav-item ${active===item.id?"active":""}`} onClick={() => onNavigate(item.id)}>
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
    setScreen(to); setScreenData(data);
  }, [screen]);

  const goBack = useCallback(() => {
    const prev = screenStack[screenStack.length-1] || "home";
    setScreenStack(s => s.slice(0,-1));
    setScreen(prev); setScreenData(null);
  }, [screenStack]);

  if (!user) {
    if (screen==="login")    return <LoginScreen    onBack={goBack} onSuccess={() => { setScreen("home"); setScreenStack([]); }} onRegister={() => setScreen("register")}/>;
    if (screen==="register") return <RegisterScreen onBack={goBack} onSuccess={() => setScreen("login")}/>;
    return <LandingScreen onLogin={() => navigate("login")} onRegister={() => navigate("register")}/>;
  }

  const isAdmin = user?.role === "admin";
  const noNavScreens = ["send","receive","changePassword","settings","wallets","txDetail","admin","reconciliation","discrepancies","notifications"];
  const showNav = !noNavScreens.includes(screen);
  const mainScreens = ["home","history","profile",...(isAdmin?["admin"]:[])];
  const activeNav = mainScreens.includes(screen) ? screen : screenStack.find(s => mainScreens.includes(s)) || "home";
  const navTo = useCallback((to) => { setScreenStack([]); setScreen(to); setScreenData(null); }, []);

  return (
    <div className="app-shell">
      {screen==="home"          && <HomeScreen               onNavigate={navigate}/>}
      {screen==="history"       && <HistoryScreen            onBack={goBack} onTxClick={tx => navigate("txDetail",tx)}/>}
      {screen==="send"          && <SendScreen               onBack={goBack}/>}
      {screen==="receive"       && <ReceiveScreen            onBack={goBack}/>}
      {screen==="profile"       && <ProfileScreen            onNavigate={navigate}/>}
      {screen==="changePassword"&& <ChangePasswordScreen     onBack={goBack}/>}
      {screen==="settings"      && <SettingsScreen           onBack={goBack}/>}
      {screen==="wallets"       && <WalletsScreen            onBack={goBack}/>}
      {screen==="txDetail"      && <TransferDetailScreen     tx={screenData} onBack={goBack}/>}
      {screen==="notifications" && <NotificationsScreen      onBack={goBack}/>}
      {screen==="admin"         && <AdminScreen              onBack={goBack} onNavigate={navigate}/>}
      {screen==="reconciliation"&& <ReconciliationScreen     onBack={goBack}/>}
      {screen==="discrepancies" && <DiscrepanciesScreen      onBack={goBack}/>}
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
