
import React, { useState, useEffect, useRef } from 'react';
import { Category, SubCategory, Brand, Model } from '../types';

interface SearchResult {
  type: 'MODEL' | 'BRAND' | 'SUBCATEGORY';
  item: Model | Brand | SubCategory;
  category: Category;
  subCategory: SubCategory;
  brand?: Brand;
  model?: Model;
  label: string;
  context: string;
}

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (result: SearchResult) => void;
  categories?: Category[];
}

export function SearchBar({ isOpen, onClose, onSelect, categories = [] }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    // Recherche insensible aux accents et à la casse ("electrique" trouve "Électrique")
    const norm = (t?: string) => (t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const searchTerms = norm(query.trim());
    const matches: SearchResult[] = [];

    categories.forEach(cat => {
      cat.subCategories.forEach(sub => {
        // Search in subcategories
        if (norm(sub.name).includes(searchTerms) || norm(sub.description).includes(searchTerms)) {
          matches.push({
            type: 'SUBCATEGORY',
            item: sub,
            category: cat,
            subCategory: sub,
            label: sub.name,
            context: cat.name
          });
        }

        sub.brands?.forEach(brand => {
          // Search in brands
          if (norm(brand.name).includes(searchTerms)) {
            matches.push({
              type: 'BRAND',
              item: brand,
              category: cat,
              subCategory: sub,
              brand: brand,
              label: brand.name,
              context: `${cat.name} > ${sub.name}`
            });
          }

          brand.models?.forEach(model => {
            // Search in models
            if (norm(model.name).includes(searchTerms) || norm(model.description).includes(searchTerms)) {
              matches.push({
                type: 'MODEL',
                item: model,
                category: cat,
                subCategory: sub,
                brand: brand,
                model: model,
                label: model.name,
                context: `${brand.name} (${sub.name})`
              });
            }
          });
        });
      });
    });

    setResults(matches.slice(0, 50)); // Jusqu'à 50 résultats (liste défilante)
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up border border-slate-200">
        <div className="flex items-center p-4 border-b border-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 ml-3 text-lg focus:outline-none text-slate-800 placeholder-slate-400"
            placeholder="Rechercher un fauteuil, une marque (ex: Action 3, DHCare / Invacare)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
          />
          <button onClick={onClose} className="text-xs font-bold text-slate-400 border border-slate-200 px-2 py-1 rounded hover:bg-slate-50">
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.length >= 2 && results.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              Aucun résultat trouvé pour "{query}"
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((res, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelect(res)}
                  className="w-full text-left p-4 hover:bg-indigo-50 rounded-xl transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      res.type === 'MODEL' ? 'bg-indigo-100 text-indigo-600' : 
                      res.type === 'BRAND' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {res.type === 'MODEL' ? '♿' : res.type === 'BRAND' ? '🏭' : '📂'}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-indigo-700">{res.label}</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider">{res.context}</div>
                    </div>
                  </div>
                  <div className="text-slate-300 group-hover:text-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-sm">
              Saisissez au moins 2 caractères pour lancer la recherche...
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-3 px-6 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-medium">
          <span>{results.length} résultat(s) affiché(s)</span>
          <span className="flex gap-4">
            <span className="flex items-center gap-1">
              <kbd className="bg-white border border-slate-200 px-1 rounded shadow-sm">Enter</kbd> pour sélectionner
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
