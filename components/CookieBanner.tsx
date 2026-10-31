import React, { useEffect, useState } from 'react';

// Bandeau de consentement aux cookies (exigence CNIL / RGPD).
// Google Analytics n'est chargé QUE si le visiteur clique sur « Accepter ».
// Le choix est mémorisé 6 mois dans le navigateur. Le lien « Cookies » du pied
// de page permet de rouvrir le bandeau pour changer d'avis.

const GA_ID = 'G-YBFSK2Y2XM';
const STORAGE_KEY = 'cookie-consent';
const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 182;

type Choice = 'granted' | 'denied';

function readChoice(): Choice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { choice, date } = JSON.parse(raw);
    if (Date.now() - date > SIX_MONTHS_MS) return null; // on redemande après 6 mois
    return choice === 'granted' || choice === 'denied' ? choice : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, date: Date.now() }));
  } catch {
    /* navigation privée : on ne mémorise pas */
  }
}

let gaLoaded = false;
function loadGoogleAnalytics() {
  if (gaLoaded) return;
  gaLoaded = true;
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag('js', new Date());
  w.gtag('config', GA_ID, { anonymize_ip: true });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function deleteGaCookies() {
  document.cookie.split(';').forEach(c => {
    const name = c.split('=')[0].trim();
    if (name.startsWith('_ga')) {
      const host = window.location.hostname;
      const domains = ['', host, '.' + host, '.' + host.replace(/^www\./, '')];
      domains.forEach(d => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? '; domain=' + d : ''}`;
      });
    }
  });
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === 'granted') loadGoogleAnalytics();
    else if (choice === null) setVisible(true);

    const reopen = () => setVisible(true);
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  const accept = () => {
    saveChoice('granted');
    loadGoogleAnalytics();
    setVisible(false);
  };

  const refuse = () => {
    const wasLoaded = gaLoaded;
    saveChoice('denied');
    deleteGaCookies();
    setVisible(false);
    // Si GA tournait déjà, on recharge pour l'arrêter complètement
    if (wasLoaded) window.location.reload();
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Gestion des cookies"
      className="fixed inset-x-0 bottom-16 sm:bottom-0 z-50 p-3 sm:p-4 print:hidden"
    >
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center">
        <p className="text-sm text-slate-600 flex-1">
          🍪 Ce site utilise des cookies de mesure d'audience (Google Analytics) pour savoir quelles pages sont
          utiles et améliorer le guide. Aucune donnée n'est revendue. Vous pouvez accepter ou refuser,
          et changer d'avis à tout moment via le lien « Cookies » en bas de page.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={refuse}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
