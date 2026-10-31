
import React, { useState } from 'react';
import { Model, Brand, SubCategory, Category } from '../types';

interface ProductSheetProps {
  model: Model;
  brand: Brand | null;
  subCategory: SubCategory;
  category: Category;
  onAddToComparison?: (model: Model) => void;
  isInComparison?: boolean;
}

export function ProductSheet({ model, brand, subCategory, category, onAddToComparison, isInComparison }: ProductSheetProps) {
  const [imgError, setImgError] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  if (!model.details) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{model.name}</h3>
        <p className="text-slate-500">Aucune fiche détaillée disponible pour ce modèle pour le moment.</p>
      </div>
    );
  }

  // Fix: Use default values for optional properties to prevent map() errors when data is missing
  const { presentation, specs, options = [], pros = [], cons = [], colors = [] } = model.details;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in relative">
      
      {/* Lightbox / Image Agrandie */}
      {isImageExpanded && model.imageUrl && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 md:p-10 animate-fade-in cursor-zoom-out"
          onClick={() => setIsImageExpanded(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-indigo-400 transition-colors bg-white/10 p-2 rounded-full"
            onClick={() => setIsImageExpanded(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-5xl max-h-full flex flex-col items-center gap-4">
            <img 
              src={model.imageUrl} 
              alt={model.name} 
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl bg-white p-4"
              referrerPolicy="no-referrer"
            />
            <div className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full text-white font-bold text-lg">
              {model.name}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-indigo-900 text-white p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex-1">
                <span className="inline-block px-2 py-1 rounded bg-indigo-800 text-indigo-100 text-xs font-semibold mb-2">
                {subCategory.name} - {brand?.name}
                </span>
                <h2 className="text-3xl font-bold flex flex-wrap items-center gap-3">
                  {model.name}

                  {model.isPediatric && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      👶 Pédiatrique
                    </span>
                  )}

                  {model.isBariatric && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                      ⚖️ Bariatrique
                    </span>
                  )}
                </h2>
                <p className="text-indigo-200 mt-1">{model.description}</p>
            </div>
            {model.imageUrl && !imgError ? (
                <div 
                  className="w-48 h-48 bg-white rounded-lg p-2 shrink-0 flex items-center justify-center cursor-zoom-in group relative overflow-hidden shadow-inner"
                  onClick={() => setIsImageExpanded(true)}
                  title="Cliquez pour agrandir"
                >
                    <img 
                      src={model.imageUrl} 
                      alt={model.name} 
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                    />
                    <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                        </svg>
                    </div>
                </div>
            ) : (
                <div className="hidden md:block text-5xl opacity-20 p-8">
                    ♿
                </div>
            )}
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8 pb-32">
        {/* Présentation */}
        <section>
          <h3 className="flex items-center gap-2 text-xl font-bold text-indigo-900 mb-4 pb-2 border-b border-slate-100">
            ✅ Présentation générale
          </h3>
          <ul className="space-y-2 text-slate-700 leading-relaxed">
            {presentation.map((p, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-indigo-500">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Couleurs (si disponibles) */}
        {colors && colors.length > 0 && (
          <section>
            <h3 className="flex items-center gap-2 text-xl font-bold text-indigo-900 mb-4 pb-2 border-b border-slate-100">
              🎨 Couleurs disponibles
            </h3>
            <div className="flex flex-wrap gap-6">
              {colors.map((color, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 group">
                  <div 
                    className="w-12 h-12 rounded-full shadow-sm border-2 border-white ring-1 ring-slate-200 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  ></div>
                  <span className="text-xs font-medium text-slate-600">{color.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Caractéristiques Techniques */}
        <section>
          <h3 className="flex items-center gap-2 text-xl font-bold text-indigo-900 mb-4 pb-2 border-b border-slate-100">
            📐 Caractéristiques techniques
          </h3>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 w-1/3">Critère</th>
                  <th className="px-4 py-3">Valeur / Configuration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {specs.map((spec, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-900 bg-slate-50/30">{spec.label}</td>
                    <td className="px-4 py-3 text-slate-700">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Options */}
        <section>
          <h3 className="flex items-center gap-2 text-xl font-bold text-indigo-900 mb-4 pb-2 border-b border-slate-100">
            🔧 Confort & Options
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
             {options.map((opt, idx) => (
                <li key={idx} className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 border border-slate-100">
                   {opt}
                </li>
             ))}
          </ul>
        </section>

        {/* Points forts / Limites */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
              <span className="text-xl">👍</span> Points forts
            </h4>
            <ul className="space-y-2">
              {pros.map((item, idx) => (
                <li key={idx} className="text-sm text-emerald-900 flex gap-2">
                  <span className="font-bold">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
             <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
              <span className="text-xl">⚠️</span> Limites à vérifier
            </h4>
            <ul className="space-y-2">
              {cons.map((item, idx) => (
                <li key={idx} className="text-sm text-amber-900 flex gap-2">
                   <span className="font-bold">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
        
        <div className="text-center pt-8 border-t border-slate-100">
            <p className="text-xs text-slate-400 italic">
                Fiche établie selon les données constructeurs et nomenclature LPPR. Usage professionnel.
            </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-lg flex flex-col sm:flex-row gap-3 items-center justify-between z-10">
        <a 
            href={model.manufacturerUrl || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex-1 w-full sm:w-auto text-center px-6 py-3 rounded-lg font-semibold transition-colors border-2 border-indigo-100 text-indigo-700 hover:bg-indigo-50 ${!model.manufacturerUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            🌐 Voir sur le site revendeur
        </a>
        <button 
            onClick={() => onAddToComparison && onAddToComparison(model)}
            disabled={isInComparison}
            className={`flex-1 w-full sm:w-auto text-center px-6 py-3 rounded-lg font-semibold text-white transition-colors shadow-sm flex items-center justify-center gap-2 ${
                isInComparison 
                ? 'bg-emerald-600 cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
        >
            {isInComparison ? (
                <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Ajouté au comparateur
                </>
            ) : (
                <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Sélectionner pour comparatif
                </>
            )}
        </button>
      </div>
    </div>
  );
}