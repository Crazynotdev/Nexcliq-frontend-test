export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

    :root{
      --teal:#0B6B5C;--teal-light:#0D8570;--teal-pale:#E3F2EF;
      --teal-glow:rgba(11,107,92,0.18);--sand:#C4B49A;
      --sand-light:#F0EBE3;--cream:#F6F3EF;
      --text:#111815;--text2:#3D4F49;--muted:#6B7B74;--light:#A3B0AB;
      --green:#10B981;--green-bg:rgba(16,185,129,0.1);
      --red:#EF4444;--red-bg:rgba(239,68,68,0.1);
      --amber:#F59E0B;--amber-bg:rgba(245,158,11,0.1);
      --glass:rgba(255,255,255,0.65);--glass-border:rgba(255,255,255,0.7);
      --r-sm:10px;--r-md:16px;--r-lg:22px;--r-xl:28px;
      --shadow:0 4px 24px rgba(11,107,92,0.08);
    }

    html{font-size:16px;-webkit-font-smoothing:antialiased}
    body{font-family:'Sora',sans-serif;background:var(--cream);color:var(--text);min-height:100dvh}

    /* Animations */
    @keyframes pageIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
    @keyframes gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

    .app-shell{max-width:430px;min-height:100dvh;margin:0 auto;background:var(--cream);position:relative;overflow-x:hidden}
    .page{animation:pageIn 0.35s ease both}

    /* Glass */
    .glass{background:var(--glass);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-border);border-radius:var(--r-lg);box-shadow:var(--shadow)}
    .glass-dark{background:rgba(255,255,255,0.08);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.1);border-radius:var(--r-md)}

    /* Layout */
    .screen{padding:0 16px 100px}
    .pt-4{padding-top:20px}
    .stack{display:flex;flex-direction:column}
    .row{display:flex;align-items:center}
    .between{justify-content:space-between}
    .center{justify-content:center}
    .gap-2{gap:8px}.gap-3{gap:12px}.gap-4{gap:16px}.gap-5{gap:20px}
    .w-full{width:100%}

    /* Text */
    .text-sm{font-size:13px}.text-xs{font-size:11px}
    .c-muted{color:var(--muted)}.c-light{color:var(--light)}
    .c-teal{color:var(--teal)}.c-red{color:var(--red)}.c-green{color:#059669}
    .fw-600{font-weight:600}.fw-700{font-weight:700}.fw-800{font-weight:800}
    .mono{font-family:'JetBrains Mono',monospace}

    /* Nav */
    .bottom-nav{
      position:fixed;bottom:12px;left:50%;transform:translateX(-50%);
      width:calc(100% - 28px);max-width:402px;
      background:rgba(255,255,255,0.8);backdrop-filter:blur(28px);
      -webkit-backdrop-filter:blur(28px);border:1px solid rgba(255,255,255,0.6);
      border-radius:24px;display:flex;justify-content:space-around;
      padding:8px 4px;z-index:100;
      box-shadow:0 4px 24px rgba(11,107,92,0.06);
    }
    .nav-item{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:6px;border-radius:14px;transition:all 0.3s}
    .nav-item:active{transform:scale(0.9)}
    .nav-pill{width:38px;height:30px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:var(--light);transition:all 0.3s}
    .nav-item.active .nav-pill{background:var(--teal);color:#fff;box-shadow:0 4px 12px var(--teal-glow)}
    .nav-label{font-size:10px;font-weight:500;color:var(--light)}
    .nav-item.active .nav-label{color:var(--teal);font-weight:700}

    /* Header */
    .screen-header{
      position:sticky;top:0;z-index:50;
      background:rgba(246,243,239,0.75);backdrop-filter:blur(20px);
      -webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(11,107,92,0.05);
      padding:14px 16px;display:flex;align-items:center;justify-content:space-between;
    }
    .header-title{font-size:16px;font-weight:700;letter-spacing:-0.2px}

    /* Buttons */
    .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:none;cursor:pointer;font-family:inherit;font-weight:600;transition:all 0.2s;border-radius:var(--r-md);position:relative;overflow:hidden}
    .btn:active{transform:scale(0.96)}
    .btn:disabled{opacity:0.5;pointer-events:none}
    .btn-primary{background:linear-gradient(135deg,var(--teal),#073D34);color:#fff;padding:15px 22px;font-size:15px;width:100%;box-shadow:0 4px 16px var(--teal-glow)}
    .btn-glass{background:var(--glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--glass-border);padding:15px 22px;font-size:15px;width:100%}
    .btn-sm{padding:10px 16px;font-size:13px;width:auto}
    .btn-icon{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:rgba(255,255,255,0.5);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.5);color:var(--text2);transition:all 0.2s}
    .btn-icon:active{transform:scale(0.9)}
    .btn-danger{background:var(--red-bg);color:var(--red);border:1px solid rgba(239,68,68,0.2);padding:15px 22px;font-size:15px;width:100%}

    /* Inputs */
    .form-group{display:flex;flex-direction:column;gap:5px}
    .form-label{font-size:11px;font-weight:700;color:var(--muted);letter-spacing:0.05em;text-transform:uppercase}
    .input-wrap{position:relative}
    .form-input{
      background:var(--glass);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
      border:1.5px solid var(--glass-border);border-radius:var(--r-sm);
      padding:13px 15px;font-family:inherit;font-size:15px;color:var(--text);
      outline:none;transition:all 0.2s;width:100%;box-shadow:0 1px 3px rgba(0,0,0,0.03);
    }
    .form-input:focus{border-color:var(--teal);box-shadow:0 0 0 3px rgba(11,107,92,0.06)}
    .form-input.error{border-color:var(--red);box-shadow:0 0 0 3px rgba(239,68,68,0.06)}
    .form-input.pl-44{padding-left:44px}
    .form-input.pr-44{padding-right:44px}
    .input-icon-l{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--light)}
    .input-icon-r{position:absolute;right:14px;top:50%;transform:translateY(-50%);color:var(--light);cursor:pointer}
    .input-icon-r:hover{color:var(--teal)}

    /* Badges */
    .badge{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;font-size:10px;font-weight:700}
    .badge-dot{width:4px;height:4px;border-radius:50%}
    .badge-success{background:var(--green-bg);color:#065F46}.badge-success .badge-dot{background:var(--green)}
    .badge-pending{background:var(--amber-bg);color:#92400E}.badge-pending .badge-dot{background:var(--amber)}
    .badge-failed{background:var(--red-bg);color:#991B1B}.badge-failed .badge-dot{background:var(--red)}

    /* Toast */
    .toast-container{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:8px;width:calc(100%-32px);max-width:398px}
    .toast{padding:13px 16px;border-radius:var(--r-md);font-size:13px;font-weight:500;background:rgba(17,24,21,0.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1);color:#fff;display:flex;align-items:center;gap:8px;animation:pageIn 0.3s ease}
    .toast-success .toast-icon{color:#34D399}.toast-error .toast-icon{color:#F87171}.toast-info .toast-icon{color:var(--sand)}

    /* Wallet Hero */
    .wallet-hero{
      background:linear-gradient(145deg,#06433C,#0B6B5C,#042F2A);background-size:200%200%;
      animation:gradient 8s ease infinite;border-radius:var(--r-xl);
      padding:28px 24px;position:relative;overflow:hidden;
      box-shadow:0 20px 48px rgba(11,107,92,0.2),0 1px 0 rgba(255,255,255,0.06) inset;
    }

    /* Bento Grid */
    .bento{display:grid;gap:10px}
    .bento-2{grid-template-columns:1fr 1fr}
    .bento-4{grid-template-columns:repeat(4,1fr)}
    .bento-card{
      background:var(--glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
      border:1px solid var(--glass-border);border-radius:var(--r-lg);padding:18px;
      cursor:pointer;transition:all 0.25s;
    }
    .bento-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(11,107,92,0.06)}

    /* Scroll */
    .scroll-x{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
    .scroll-x::-webkit-scrollbar{display:none}

    /*Progress*/
    .prog-track{height:5px;background:rgba(11,107,92,0.08);border-radius:3px;overflow:hidden}
    .prog-fill{height:100%;background:linear-gradient(90deg,var(--teal),#0D8570);border-radius:3px;transition:width 0.5s ease}

    /* Empty */
    .empty{display:flex;flex-direction:column;align-items:center;padding:40px 20px;gap:10px;text-align:center}
    .empty-icon{width:56px;height:56px;border-radius:18px;background:var(--glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--glass-border);display:flex;align-items:center;justify-content:center;color:var(--light)}
    .empty-title{font-size:15px;font-weight:700;color:var(--text2)}
    .empty-sub{font-size:13px;color:var(--muted)}

    /* Section */
    .section-title{font-size:15px;font-weight:700;letter-spacing:-0.2px}
    .section-link{font-size:13px;font-weight:600;color:var(--teal);cursor:pointer}
    .section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}

    /* Row link */
    .row-link{display:flex;align-items:center;justify-content:space-between;padding:15px 0;cursor:pointer}
    .row-link+.row-link{border-top:1px solid rgba(11,107,92,0.05)}

    /* Provider card */
    .provider-card{
      border:1.5px solid rgba(11,107,92,0.08);border-radius:var(--r-md);
      padding:14px 16px;display:flex;align-items:center;gap:12px;
      cursor:pointer;transition:all 0.2s;
      background:var(--glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
    }
    .provider-card.selected{border-color:var(--teal);box-shadow:0 0 0 3px rgba(11,107,92,0.06);background:rgba(227,242,239,0.7)}

    /* Keypad */
    .keypad{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
    .key{height:58px;border-radius:var(--r-md);background:var(--glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--glass-border);font-size:20px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.15s;user-select:none}
    .key:active{transform:scale(0.9);background:var(--teal-pale)}
    .key-del{font-size:14px}

    /* Amount display */
    .amount-display{font-size:44px;font-weight:800;letter-spacing:-2px;text-align:center}
    .amount-display sup{font-size:18px;font-weight:600;vertical-align:super;color:var(--muted)}

    /* Toggle */
    .toggle{position:relative;width:44px;height:24px;flex-shrink:0;cursor:pointer}
    .toggle input{opacity:0;width:0;height:0}
    .toggle-track{position:absolute;inset:0;border-radius:12px;background:#D4DDD9;transition:background 0.3s}
    .toggle-thumb{position:absolute;height:18px;width:18px;left:3px;top:3px;background:#fff;border-radius:50%;transition:transform 0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.15)}
    .toggle input:checked~.toggle-track{background:var(--teal)}
    .toggle input:checked~.toggle-thumb{transform:translateX(20px)}

    /* Landing */
    .landing-bg{min-height:100dvh;background:linear-gradient(160deg,#042F2A,#06433C,#0B6B5C,#040F0C);background-size:300%300%;animation:gradient 10s ease infinite;display:flex;flex-direction:column;padding:44px 20px 36px;position:relative;overflow:hidden}
    .orb{position:absolute;border-radius:50%;pointer-events:none;animation:float 6s ease-in-out infinite}
  `}</style>
);
