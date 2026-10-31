import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { NEWS_ARTICLES } from '../newsData';

interface NewsViewProps {
  onNavigate: (link: NonNullable<NewsArticle['internalLink']>) => void;
  onContact: () => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ onNavigate, onContact }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ARTICLES_PER_PAGE = 6;

  // Scroll to top when selectedArticle or currentPage changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedArticle, currentPage]);

  // Force all anchor tags inside dynamically rendered HTML to open securely in a new tab
  useEffect(() => {
    if (selectedArticle) {
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
  }, [selectedArticle]);

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

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 animate-fade-in">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-3">Actualités & Nouveautés</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Restez informé des dernières innovations en matière de mobilité, des actualités du secteur et des conseils en ergothérapie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentArticles.map((article) => (
          <article 
            key={article.id} 
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-all group cursor-pointer"
            onClick={() => setSelectedArticle(article)}
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
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors text-slate-600"
            title="Page précédente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                  currentPage === page 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : 'text-slate-600 hover:bg-slate-100'
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
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
      
      <div className="mt-16 bg-indigo-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
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
