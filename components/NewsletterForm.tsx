import React, { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// RÉGLAGE À FAIRE UNE SEULE FOIS
// Adresse du formulaire Brevo (Brevo › Contacts › Formulaires › ton formulaire
// › « Partager » › code HTML : c'est l'adresse qui suit action="…").
// Elle ressemble à : https://xxxxxxxx.sibforms.com/serve/MUIFAxxxxxxxxxxxxxxxx
// Tant qu'elle est vide, le formulaire affiche « Inscriptions bientôt ouvertes ».
// ─────────────────────────────────────────────────────────────────────────────
export const BREVO_FORM_ACTION = '';

type Status = 'idle' | 'sending' | 'ok' | 'error';

interface NewsletterFormProps {
  /** Version sur fond coloré (bandeau indigo) ou claire (pages). */
  onAccent?: boolean;
  /** Version compacte : un champ et un bouton sur une ligne. */
  compact?: boolean;
  /** Affiche le lien « En savoir plus » vers la page newsletter. */
  onMore?: () => void;
  /** Lien vers la politique de confidentialité. */
  onPrivacy?: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ onAccent = false, compact = false, onMore, onPrivacy }) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState(''); // anti-robots : champ invisible
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const id = React.useId();

  const ready = BREVO_FORM_ACTION.trim() !== '';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) return;
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error');
      setMessage('Cette adresse e-mail ne semble pas valide.');
      return;
    }
    if (!consent) {
      setStatus('error');
      setMessage('Merci de cocher la case pour accepter de recevoir le journal.');
      return;
    }
    setStatus('sending');
    setMessage('');

    const body = new FormData();
    body.append('EMAIL', email.trim());
    body.append('OPT_IN', '1');
    body.append('email_address_check', '');
    body.append('locale', 'fr');

    const url = `${BREVO_FORM_ACTION}${BREVO_FORM_ACTION.includes('?') ? '&' : '?'}isAjax=1`;
    try {
      const res = await fetch(url, { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success !== false) {
        setStatus('ok');
      } else {
        setStatus('error');
        setMessage("L'inscription n'a pas pu être enregistrée. Réessayez dans quelques minutes.");
      }
    } catch {
      // Certains navigateurs bloquent la lecture de la réponse : on envoie quand même.
      try {
        await fetch(url, { method: 'POST', body, mode: 'no-cors' });
        setStatus('ok');
      } catch {
        setStatus('error');
        setMessage("Problème de connexion. Vérifiez votre réseau et réessayez.");
      }
    }
  };

  const text = onAccent ? 'text-indigo-50' : 'text-slate-600';
  const title = onAccent ? 'text-white' : 'text-slate-900';
  const link = onAccent ? 'text-white hover:text-indigo-100 underline' : 'text-indigo-600 hover:text-indigo-700';
  const input = onAccent
    ? 'bg-white border-white text-slate-900 placeholder-slate-500 focus:border-amber-300'
    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500';
  const button = onAccent
    ? 'bg-slate-900 hover:bg-slate-800 text-white'
    : 'bg-indigo-600 hover:bg-indigo-700 text-white';

  if (status === 'ok') {
    return (
      <div className={`rounded-2xl p-5 ${onAccent ? 'bg-white/15' : 'bg-emerald-50 border border-emerald-200'}`} role="status">
        <p className={`font-bold ${onAccent ? 'text-white' : 'text-emerald-900'}`}>Presque fini !</p>
        <p className={`text-sm mt-1 ${onAccent ? 'text-indigo-50' : 'text-emerald-800'}`}>
          Un e-mail de confirmation vient de vous être envoyé. Cliquez sur le lien qu'il contient pour valider votre inscription
          (pensez à regarder dans les spams).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3" aria-labelledby={`${id}-title`}>
      {!compact && (
        <p id={`${id}-title`} className={`font-bold ${title}`}>Recevoir le Journal du VPH</p>
      )}
      {compact && <span id={`${id}-title`} className="sr-only">Inscription au Journal du VPH</span>}

      {!ready ? (
        <p className={`text-sm ${text}`}>Les inscriptions ouvrent très bientôt.</p>
      ) : (
        <>
          <div className={compact ? 'flex flex-col sm:flex-row gap-2' : 'flex flex-col gap-2'}>
            <label htmlFor={`${id}-email`} className="sr-only">Votre adresse e-mail</label>
            <input
              id={`${id}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              className={`flex-1 min-h-[44px] px-4 rounded-xl border-2 outline-none transition-colors ${input}`}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`min-h-[44px] px-5 rounded-xl disabled:opacity-60 font-semibold transition-colors ${button}`}
            >
              {status === 'sending' ? 'Envoi…' : "Je m'inscris"}
            </button>
          </div>

          {/* Champ piège pour les robots, invisible pour les visiteurs */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
            <input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={e => setTrap(e.target.value)} name="email_address_check" />
          </div>

          <label className={`flex items-start gap-2 text-xs leading-relaxed ${text}`}>
            <input
              type="checkbox"
              checked={consent}
              onChange={e => setConsent(e.target.checked)}
              className={`mt-0.5 w-4 h-4 shrink-0 ${onAccent ? 'accent-slate-900' : 'accent-indigo-600'}`}
            />
            <span>
              J'accepte de recevoir le Journal du VPH par e-mail. Désinscription en un clic à tout moment.
              {onPrivacy && (
                <>
                  {' '}
                  <button type="button" onClick={onPrivacy} className={`underline ${link}`}>Données personnelles</button>
                </>
              )}
            </span>
          </label>

          {status === 'error' && (
            <p className={`text-sm font-semibold ${onAccent ? 'text-white bg-red-700 rounded-lg px-3 py-2' : 'text-red-700'}`} role="alert">{message}</p>
          )}
        </>
      )}

      {onMore && (
        <button type="button" onClick={onMore} className={`self-start text-sm font-semibold ${link}`}>
          En savoir plus sur le journal →
        </button>
      )}
    </form>
  );
};
