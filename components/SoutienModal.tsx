import React, { useEffect, useRef } from 'react';

export const KOFI_URL = 'https://ko-fi.com/lefrancfabien';

/** Ouvre la pop-up « Soutenir le site » depuis n'importe quel composant. */
export const openSoutien = () => window.dispatchEvent(new Event('open-soutien'));

interface SoutienModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContact: () => void;
}

export function SoutienModal({ isOpen, onClose, onContact }: SoutienModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden" role="dialog" aria-modal="true" aria-labelledby="soutien-titre">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-fade-in">
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8 text-slate-700 leading-relaxed space-y-3">
          <h2 id="soutien-titre" className="text-2xl font-bold text-indigo-600 pr-8">Soutenir Assistant-Ergo</h2>
          <p className="font-semibold text-slate-600">
            Un site gratuit, fait par un ergo, pour tous ceux qui accompagnent les personnes en situation de handicap.
          </p>

          <p>Je m'appelle Fabien. Je suis ergothérapeute en SAVS en Charente.</p>
          <p>
            J'ai créé Assistant-Ergo parce que je passais trop de temps à chercher des infos fiables sur les VPH :
            dimensions, options, coloris, références… J'ai donc décidé de tout regrouper au même endroit.
          </p>
          <p>
            Le site est <strong>gratuit</strong>, <strong>sans publicité</strong> et <strong>sans inscription</strong>.
            Je le fais seul, sur mon temps libre.
          </p>

          <h3 className="text-lg font-bold text-slate-800 pt-3">Pourquoi un soutien ?</h3>
          <p>L'hébergement, le nom de domaine et les outils ont un coût. Aujourd'hui, c'est moi qui paie tout.</p>
          <p><strong>Toute aide est la bienvenue</strong>, quel que soit le montant :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>les <strong>ergothérapeutes</strong>, à qui le site fait gagner du temps dans leurs préconisations,</li>
            <li>les <strong>revendeurs</strong> et <strong>prestataires</strong>, qui l'utilisent pour leurs devis et leurs conseils,</li>
            <li>les <strong>fabricants</strong> et <strong>fournisseurs</strong> de VPH, qui y voient leurs produits présentés clairement,</li>
            <li>et <strong>toute personne</strong> qui trouve le site utile et a envie qu'il continue d'exister.</li>
          </ul>

          <a
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center my-5 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-sm transition-colors"
          >
            ☕ Soutenir le site sur Ko-fi
          </a>

          <h3 className="text-lg font-bold text-slate-800 pt-1">Ce que je m'engage à faire</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Tous les dons servent uniquement au fonctionnement et à l'amélioration du site.</li>
            <li>Le site reste gratuit et accessible à tous.</li>
            <li>
              <strong>Les fiches restent neutres.</strong> Un don ne donne aucune contrepartie : pas de mise en avant,
              pas de classement, pas de droit de regard sur le contenu. C'est la même règle pour tout le monde.
            </li>
          </ul>

          <h3 className="text-lg font-bold text-slate-800 pt-3">Vous pouvez aussi aider autrement</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>En <strong>partageant le site</strong> autour de vous.</li>
            <li>En me <strong>signalant une erreur</strong> ou un modèle manquant.</li>
            <li>En me faisant part de vos <strong>idées d'amélioration</strong>.</li>
          </ul>
          <p>
            👉{' '}
            <a
              href="/?page=contact"
              onClick={(e) => { e.preventDefault(); onContact(); }}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Me contacter
            </a>
          </p>

          <p>Un grand merci à tous ceux qui utilisent le site, et encore plus à ceux qui le soutiennent.</p>
          <p className="italic">Fabien</p>
        </div>
      </div>
    </div>
  );
}
