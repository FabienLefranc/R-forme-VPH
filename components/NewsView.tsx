import React, { useState, useEffect } from 'react';
import { NewsArticle, NewsCategory, JournalIssue } from '../types';
import { NEWS_ARTICLES } from '../newsData';
import {
  JOURNAL_ISSUES,
  UPCOMING_EVENTS,
  LPPR_TIMELINE,
  EXCLUSIVITE_JOURS,
  estLibre,
  joursAvantLiberation,
  dateLiberation,
  formatDateFr,
  parseISODate,
} from '../journalData';
import { NewsletterForm } from './NewsletterForm';

interface NewsViewProps {
  onNavigate: (link: NonNullable<NewsArticle['internalLink']>) => void;
  onContact: () => void;
  onNewsletter?: () => void;
  onPrivacy?: () => void;
}

type Tab = 'all' | 'journal' | NewsCategory;

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 'journal', label: 'Journal du VPH' },
  { id: 'lppr', label: 'Remboursement LPPR' },
  { id: 'solutions', label: 'Solutions terrain' },
  { id: 'fabricants', label: 'Fabricants et portraits' },
  { id: 'agenda', label: 'Agenda' },
];

const LockIcon = () => (
  <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const ArrowIcon = () => (
  <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

/** Carte d'article (même rendu que l'ancienne liste). */
const ArticleCard: React.FC<{ article: NewsArticle; onOpen: (a: NewsArticle) => void }> = ({ article, onOpen }) => (
    <article
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-all group cursor-pointer"
      onClick={() => onOpen(article)}
    >
      {article.imageUrl && (
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              {article.date}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {article.content}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {article.hashtags.map((tag) => (
            <span key={tag} className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 italic">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <span className="text-xs font-bold text-indigo-600 group-hover:underline">
            Lire la suite
          </span>

          {article.linkedinUrl && (
            <div className="text-slate-400 group-hover:text-[#0A66C2] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
          )}
        </div>
      </div>
    </article>);

/** Titre de section. */
const SectionTitle: React.FC<{ id: string; title: string; subtitle?: string; right?: React.ReactNode }> = ({ id, title, subtitle, right }) => (
  <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
    <div>
      <h3 id={id} className="text-2xl font-black text-slate-900">{title}</h3>
      {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
    </div>
    {right}
  </div>
);

export const NewsView: React.FC<NewsViewProps> = ({ onNavigate, onContact, onNewsletter, onPrivacy }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<JournalIssue | null>(null);
  const [tab, setTab] = useState<Tab>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ARTICLES_PER_PAGE = 6;

  // Scroll to top when selectedArticle or currentPage changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedArticle, selectedIssue, currentPage]);

  // Force all anchor tags inside dynamically rendered HTML to open securely in a new tab
  useEffect(() => {
    if (selectedArticle || selectedIssue) {
      // Small delay to ensure the DOM element has been fully updated
      const timer = setTimeout(() => {
        const container = document.querySelector('.news-content-prose');
        if (container) {
          const links = container.querySelectorAll('a');
          links.forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
          });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedArticle, selectedIssue]);

  const now = new Date();
  const issues = [...JOURNAL_ISSUES].sort((a, b) => b.dateEnvoi.localeCompare(a.dateEnvoi));
  const exclusifs = issues.filter(i => !estLibre(i, now));
  const libres = issues.filter(i => estLibre(i, now));

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const evenementsAVenir = UPCOMING_EVENTS
    .filter(e => parseISODate(e.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const byCat = (c: NewsCategory) => NEWS_ARTICLES.filter(a => a.categorie === c);
  const openArticleById = (id?: string) => {
    const a = NEWS_ARTICLES.find(x => x.id === id);
    if (a) setSelectedArticle(a);
  };

  const changeTab = (t: Tab) => {
    setTab(t);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(NEWS_ARTICLES.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = NEWS_ARTICLES.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6 animate-fade-in">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Retour aux actualités
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {selectedArticle.imageUrl && (
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={selectedArticle.imageUrl} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {selectedArticle.date}
              </span>
              <div className="flex gap-2">
                {selectedArticle.hashtags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium text-slate-400 italic">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">
              {selectedArticle.title}
            </h2>

            <div 
              className="news-content-prose prose prose-slate max-w-none text-slate-600 leading-relaxed mb-10"
              dangerouslySetInnerHTML={{ __html: selectedArticle.fullContent || selectedArticle.content }}
            />

            <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-4">
                {selectedArticle.linkedinUrl && (
                  <a 
                    href={selectedArticle.linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2] text-white text-sm font-bold hover:bg-[#004182] transition-colors shadow-md"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Suivre sur LinkedIn
                  </a>
                )}
              </div>

              {selectedArticle.internalLink && selectedArticle.internalLink.label && (
                selectedArticle.internalLink.type === 'EXTERNAL' ? (
                  <a 
                    href={selectedArticle.internalLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
                  >
                    {selectedArticle.internalLink.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                ) : (
                  <button 
                    onClick={() => onNavigate(selectedArticle.internalLink!)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
                  >
                    {selectedArticle.internalLink.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedIssue) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6 animate-fade-in">
        <button
          onClick={() => setSelectedIssue(null)}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Retour aux actualités
        </button>

        <article className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 text-white px-8 md:px-12 py-10">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-3">
              Le Journal du VPH · N° {selectedIssue.numero} · {formatDateFr(selectedIssue.dateEnvoi)}
            </p>
            <h2 className="text-3xl md:text-4xl font-black leading-tight">{selectedIssue.titre}</h2>
            <p className="mt-4 text-slate-300 text-lg">{selectedIssue.chapeau}</p>
          </div>
          <div className="p-8 md:p-12">
            {selectedIssue.contenu ? (
              <div
                className="news-content-prose prose prose-slate max-w-none text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedIssue.contenu }}
              />
            ) : (
              <>
                <p className="font-bold text-slate-900 mb-2">Au sommaire</p>
                <ul className="list-disc pl-5 text-slate-600 space-y-1">
                  {selectedIssue.sommaire.map(s => <li key={s}>{s}</li>)}
                </ul>
              </>
            )}
            {selectedIssue.lienWeb && (
              <a
                href={selectedIssue.lienWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
              >
                Lire la version e-mail <ArrowIcon />
              </a>
            )}
          </div>
        </article>
      </div>
    );
  }

  const show = (t: Tab) => tab === 'all' || tab === t;

  // ── Bloc Journal : numéros en exclusivité + inscription ──
  const journalBlock = (
    <section aria-labelledby="journal-title" className="bg-slate-900 text-white rounded-3xl p-6 md:p-9">
      <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-2">En avant-première pour les abonnés</p>
      <h3 id="journal-title" className="text-3xl font-black leading-tight">Le Journal du VPH</h3>
      <p className="text-slate-300 mt-2 max-w-2xl">
        Les abonnés le reçoivent chaque semaine. Ici, chaque numéro est en accès libre {EXCLUSIVITE_JOURS} jours après son envoi.
      </p>

      <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {exclusifs.map(issue => {
          const jours = joursAvantLiberation(issue, now);
          return (
            <article key={issue.numero} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-bold text-slate-200">N° {issue.numero} · {formatDateFr(issue.dateEnvoi)}</span>
                <span
                  className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full"
                  title={`Accès libre le ${dateLiberation(issue).toLocaleDateString('fr-FR')}`}
                >
                  <LockIcon /> Libre dans {jours} jour{jours > 1 ? 's' : ''}
                </span>
              </div>
              <h4 className="text-xl font-extrabold leading-snug">{issue.titre}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{issue.chapeau}</p>
              <div className="flex flex-col gap-2 py-1" aria-hidden="true">
                <div className="h-2.5 rounded-md bg-slate-600 blur-[3px] w-full" />
                <div className="h-2.5 rounded-md bg-slate-600 blur-[3px] w-11/12" />
                <div className="h-2.5 rounded-md bg-slate-600 blur-[3px] w-2/3" />
              </div>
              {issue.sommaire.length > 0 && (
                <>
                  <p className="text-sm font-bold text-indigo-300">Au sommaire</p>
                  <ul className="list-disc pl-5 text-sm text-slate-200 space-y-0.5">
                    {issue.sommaire.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </>
              )}
            </article>
          );
        })}

        {exclusifs.length === 0 && (
          <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col justify-center gap-2">
            <p className="text-xl font-extrabold">
              {issues.length === 0 ? 'Le premier numéro arrive bientôt.' : 'Le prochain numéro arrive bientôt.'}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Chaque semaine : les nouveautés produits, le remboursement et la LPPR, les alertes sécurité, ce qui se fait ailleurs et les nouvelles fiches du site.
            </p>
          </div>
        )}

        <div className={`bg-indigo-600 rounded-2xl p-6 flex flex-col gap-3 ${exclusifs.length === 1 ? 'lg:col-span-2' : ''}`}>
          <p className="text-2xl font-black leading-tight">Recevez-le {EXCLUSIVITE_JOURS} jours avant tout le monde</p>
          <p className="text-indigo-50 text-sm">Gratuit, chaque semaine. Juste ce qui peut changer quelque chose pour les personnes qu'on accompagne.</p>
          <NewsletterForm onAccent onMore={onNewsletter} onPrivacy={onPrivacy} />
        </div>
      </div>
    </section>
  );

  // ── Archive des numéros libres ──
  const archiveList = (items: JournalIssue[]) => (
    <section aria-labelledby="archive-title">
      <SectionTitle
        id="archive-title"
        title="Numéros en accès libre"
        right={tab === 'all' && libres.length > 3 ? (
          <button onClick={() => changeTab('journal')} className="text-sm font-bold text-indigo-600 hover:text-indigo-700">
            Voir toutes les archives →
          </button>
        ) : undefined}
      />
      {items.length === 0 ? (
        <p className="text-slate-600 bg-white border border-slate-200 rounded-2xl p-6">
          Les numéros apparaîtront ici {EXCLUSIVITE_JOURS} jours après leur envoi aux abonnés.
        </p>
      ) : (
        <ul className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200">
          {items.map(issue => (
            <li key={issue.numero}>
              <button
                onClick={() => setSelectedIssue(issue)}
                className="w-full text-left flex flex-wrap items-center gap-x-6 gap-y-1 px-6 py-4 hover:bg-slate-50 transition-colors"
              >
                <span className="font-extrabold text-sm text-indigo-600 min-w-[70px]">N° {issue.numero}</span>
                <span className="font-bold text-slate-900 flex-1 min-w-[240px]">{issue.titre}</span>
                <span className="text-sm text-slate-600">{formatDateFr(issue.dateEnvoi)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  // ── Historique LPPR ──
  const lpprBlock = (
    <section aria-labelledby="lppr-title" className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8">
      <SectionTitle id="lppr-title" title="Historique des remboursements 2026" subtitle="Les entrées à la LPPR et au guide, mois par mois." />
      <ol>
        {LPPR_TIMELINE.map(m => (
          <li key={m.mois} className="flex flex-wrap gap-x-6 gap-y-1 py-4 border-t border-slate-200">
            <span className="min-w-[130px] font-extrabold text-indigo-600">{m.mois}</span>
            <span className="flex-1 min-w-[260px] text-slate-800 leading-relaxed">
              {m.produits}
              {m.articleId && (
                <>
                  {' '}
                  <button onClick={() => openArticleById(m.articleId)} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 whitespace-nowrap">
                    Lire l'article →
                  </button>
                </>
              )}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-2 bg-indigo-50 text-indigo-900 rounded-xl px-4 py-3 text-sm font-semibold">
        Depuis octobre, le point LPPR est publié chaque semaine dans le Journal du VPH.
      </p>
    </section>
  );

  // ── Solutions terrain ──
  const solutionsBlock = (
    <section aria-labelledby="sol-title">
      <SectionTitle id="sol-title" title="Solutions terrain" subtitle="Classées par problème à résoudre, pas par marque." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {byCat('solutions').map(a => (
          <button
            key={a.id}
            onClick={() => setSelectedArticle(a)}
            className="text-left bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-2 hover:shadow-md transition-all"
          >
            <span className="font-extrabold text-lg text-slate-900 leading-snug">{a.accroche || a.title}</span>
            <span className="text-sm text-slate-600 leading-relaxed line-clamp-3">{a.title}</span>
            <span className="mt-auto pt-2 text-sm font-bold text-indigo-600">Lire la solution →</span>
          </button>
        ))}
      </div>
    </section>
  );

  // ── Agenda ──
  const agendaBlock = (
    <section aria-labelledby="agenda-title">
      <SectionTitle id="agenda-title" title="Agenda" />
      {evenementsAVenir.length === 0 ? (
        <p className="text-slate-600 bg-white border border-slate-200 rounded-2xl p-6">Pas de salon annoncé pour l'instant. Les prochains rendez-vous apparaîtront ici.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {evenementsAVenir.map(e => {
            const d = parseISODate(e.date);
            const inner = (
              <>
                <div className="bg-slate-900 text-white rounded-xl w-16 h-16 flex flex-col items-center justify-center shrink-0">
                  <span className="text-2xl font-black leading-none">{d.getDate()}</span>
                  <span className="text-[11px] font-bold uppercase">{d.toLocaleDateString('fr-FR', { month: 'short' })}</span>
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">{e.nom}</p>
                  <p className="text-sm text-slate-600">{e.lieu}</p>
                </div>
              </>
            );
            return e.url ? (
              <a key={e.nom + e.date} href={e.url} target="_blank" rel="noopener noreferrer" className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 items-center hover:shadow-md transition-all">{inner}</a>
            ) : (
              <div key={e.nom + e.date} className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 items-center">{inner}</div>
            );
          })}
        </div>
      )}
      {byCat('agenda').length > 0 && (
        <p className="mt-4 text-sm text-slate-600">
          Salons passés :{' '}
          {byCat('agenda').map((a, i) => (
            <React.Fragment key={a.id}>
              {i > 0 && ' · '}
              <button onClick={() => setSelectedArticle(a)} className="font-semibold text-indigo-600 hover:text-indigo-700 underline">
                {a.title.replace(/^Événement\s*:\s*/, '')}
              </button>
            </React.Fragment>
          ))}
        </p>
      )}
    </section>
  );

  // ── Grille d'articles d'une rubrique ──
  const categoryGrid = (c: NewsCategory, id: string, title: string, subtitle?: string) => (
    <section aria-labelledby={id}>
      <SectionTitle id={id} title={title} subtitle={subtitle} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {byCat(c).map(a => <ArticleCard key={a.id} article={a} onOpen={setSelectedArticle} />)}
      </div>
    </section>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 animate-fade-in">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Actualités</p>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">Ce qui bouge dans le monde du VPH</h2>
        <p className="text-slate-600 text-lg max-w-3xl">
          Le Journal du VPH chaque semaine, l'historique des remboursements et des solutions concrètes pour le terrain.
        </p>
      </div>

      <div role="tablist" aria-label="Filtrer les actualités" className="flex flex-wrap gap-2 mb-10">
        {TABS.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => changeTab(t.id)}
            className={`min-h-[44px] px-4 rounded-full text-sm font-bold border transition-colors ${
              tab === t.id
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-14">
        {show('journal') && journalBlock}
        {tab === 'all' && archiveList(libres.slice(0, 3))}
        {tab === 'journal' && archiveList(libres)}

        {tab === 'all' && solutionsBlock}
        {tab === 'all' && lpprBlock}

        {tab === 'all' && (
          <section aria-labelledby="latest-title">
            <SectionTitle id="latest-title" title="Toutes les actualités" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentArticles.map(article => <ArticleCard key={article.id} article={article} onOpen={setSelectedArticle} />)}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors text-slate-600"
                  title="Page précédente"
                  aria-label="Page précédente"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      aria-current={currentPage === page ? 'page' : undefined}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                        currentPage === page ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors text-slate-600"
                  title="Page suivante"
                  aria-label="Page suivante"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </section>
        )}

        {tab === 'lppr' && lpprBlock}
        {tab === 'lppr' && categoryGrid('lppr', 'lppr-articles', 'Les articles remboursement')}
        {tab === 'solutions' && solutionsBlock}
        {tab === 'fabricants' && categoryGrid('fabricants', 'brand-title', 'Fabricants et portraits', 'Les marques arrivées sur le guide, et ceux qui les font.')}
        {tab === 'agenda' && agendaBlock}
      </div>

      <div className="mt-16 bg-indigo-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Vous avez une actualité à partager ?</h3>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            Vous êtes fabricant ou professionnel de santé et vous souhaitez mettre en avant une innovation ou un retour d'expérience ?
          </p>
          <button
            onClick={onContact}
            className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-xl"
          >
            Contactez-nous
          </button>
        </div>
      </div>
    </div>
  );
};
