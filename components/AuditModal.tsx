import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES } from '../data';
import { NEWS_ARTICLES } from '../newsData';
import { Model, Category, SubCategory, Brand } from '../types';

interface AuditItem {
  id: string;
  name: string;
  categoryName: string;
  subCategoryName: string;
  brandName: string;
  category: Category;
  subCategory: SubCategory;
  brand: Brand;
  model: Model;
  hasImageUrl: boolean;
  imageUrl?: string;
  imageStatus: 'checking' | 'loaded' | 'error' | 'none';
  manufacturerUrl?: string;
}

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModel: (category: Category, subCategory: SubCategory, brand: Brand, model: Model) => void;
}

export function AuditModal({ isOpen, onClose, onSelectModel }: AuditModalProps) {
  const [activeFilter, setActiveFilter] = useState<'all_issues' | 'missing' | 'error' | 'valid' | 'all'>('all_issues');
  const [searchQuery, setSearchQuery] = useState('');
  const [imageStatuses, setImageStatuses] = useState<Record<string, 'loaded' | 'error'>>({});
  const [isTestingImages, setIsTestingImages] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Flatten all models across categories, subcategories, brands
  const allModels: AuditItem[] = useMemo(() => {
    const list: AuditItem[] = [];
    CATEGORIES.forEach(cat => {
      cat.subCategories.forEach(sub => {
        sub.brands?.forEach(brand => {
          brand.models?.forEach(model => {
            const hasImg = !!model.imageUrl && model.imageUrl.trim() !== '';
            list.push({
              id: model.id,
              name: model.name,
              categoryName: cat.name,
              subCategoryName: sub.name,
              brandName: brand.name,
              category: cat,
              subCategory: sub,
              brand: brand,
              model: model,
              hasImageUrl: hasImg,
              imageUrl: model.imageUrl,
              imageStatus: !hasImg ? 'none' : (imageStatuses[model.id] || 'checking'),
              manufacturerUrl: model.manufacturerUrl
            });
          });
        });
      });
    });
    return list;
  }, [imageStatuses]);

  // Statistics
  const stats = useMemo(() => {
    const total = allModels.length;
    const withImage = allModels.filter(m => m.hasImageUrl).length;
    const withoutImage = total - withImage;
    const loadedCount = Object.values(imageStatuses).filter(s => s === 'loaded').length;
    const errorCount = Object.values(imageStatuses).filter(s => s === 'error').length;
    const manufacturerLinksCount = allModels.filter(m => !!m.manufacturerUrl).length;
    const newsTotal = NEWS_ARTICLES.length;
    const newsWithImage = NEWS_ARTICLES.filter(n => !!n.imageUrl).length;

    return {
      total,
      withImage,
      withoutImage,
      loadedCount,
      errorCount,
      manufacturerLinksCount,
      newsTotal,
      newsWithImage
    };
  }, [allModels, imageStatuses]);

  // Image tester: test loaded images in batches or on-demand
  const testImages = () => {
    setIsTestingImages(true);
    const newStatuses: Record<string, 'loaded' | 'error'> = {};
    let processed = 0;
    const modelsWithImages = allModels.filter(m => m.hasImageUrl && m.imageUrl);

    if (modelsWithImages.length === 0) {
      setIsTestingImages(false);
      return;
    }

    modelsWithImages.forEach(m => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.onload = () => {
        newStatuses[m.id] = 'loaded';
        processed++;
        if (processed >= modelsWithImages.length) {
          setImageStatuses({ ...newStatuses });
          setIsTestingImages(false);
        }
      };
      img.onerror = () => {
        newStatuses[m.id] = 'error';
        processed++;
        if (processed >= modelsWithImages.length) {
          setImageStatuses({ ...newStatuses });
          setIsTestingImages(false);
        }
      };
      img.src = m.imageUrl!;
    });
  };

  // Run test when modal opens if not tested yet
  useEffect(() => {
    if (isOpen && Object.keys(imageStatuses).length === 0 && !isTestingImages) {
      testImages();
    }
  }, [isOpen]);

  // Filtered list
  const filteredModels = useMemo(() => {
    return allModels.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subCategoryName.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === 'missing') return !item.hasImageUrl;
      if (activeFilter === 'error') return item.hasImageUrl && imageStatuses[item.id] === 'error';
      if (activeFilter === 'valid') return item.hasImageUrl && imageStatuses[item.id] === 'loaded';
      if (activeFilter === 'all_issues') {
        return !item.hasImageUrl || imageStatuses[item.id] === 'error';
      }
      return true; // 'all'
    });
  }, [allModels, activeFilter, searchQuery, imageStatuses]);

  // Generate text report for external AI
  const copyReportForAI = () => {
    const missingPhotos = allModels.filter(m => !m.hasImageUrl);
    const brokenPhotos = allModels.filter(m => m.hasImageUrl && imageStatuses[m.id] === 'error');
    
    let report = `# RAPPORT D'AUDIT DU CATALOGUE (Assistant Ergo 2025)\n\n`;
    report += `Date du test : ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}\n`;
    report += `Nombre total de modèles : ${stats.total}\n`;
    report += `Modèles avec URL d'image : ${stats.withImage} / ${stats.total} (${Math.round((stats.withImage / stats.total) * 100)}%)\n`;
    report += `Modèles SANS image : ${missingPhotos.length}\n`;
    report += `Images testées en erreur (404/cassées) : ${brokenPhotos.length}\n`;
    report += `Nombre d'articles d'actualité : ${stats.newsTotal} (dont ${stats.newsWithImage} avec illustration)\n\n`;

    if (brokenPhotos.length > 0) {
      report += `## ❌ IMAGES EN ERREUR (${brokenPhotos.length}) :\n`;
      brokenPhotos.forEach(m => {
        report += `- [${m.subCategoryName}] ${m.brandName} - ${m.name} : ${m.imageUrl}\n`;
      });
      report += `\n`;
    }

    if (missingPhotos.length > 0) {
      report += `## ⚠️ MODÈLES SANS PHOTO (${missingPhotos.length}) :\n`;
      missingPhotos.forEach(m => {
        report += `- [${m.subCategoryName}] ${m.brandName} - ${m.name}\n`;
      });
      report += `\n`;
    }

    report += `## ÉTAT DE L'ACCESSIBILITÉ BOT / IA :\n`;
    report += `- Nom de domaine officiel : https://assistant-ergo.fr\n`;
    report += `- Application : Single Page Application (React / Vite)\n`;
    report += `- Fichier robots.txt : https://assistant-ergo.fr/robots.txt (autorise GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)\n`;
    report += `- Sitemap XML : https://assistant-ergo.fr/sitemap.xml\n`;

    navigator.clipboard.writeText(report).then(() => {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-600 rounded-lg text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <h2 className="text-xl font-bold">Audit Liens & Images — Diagnostic de Santé du Site</h2>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Vérification automatisée de l'ensemble du catalogue (photos manquantes, images 404, liens externes et compatibilité IA).
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Explain why external AIs fail */}
        <div className="bg-amber-50 border-b border-amber-200 p-4 text-xs text-amber-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-600 text-base font-bold">ℹ️ Pourquoi une IA externe dit "Je n'ai pas accès" ?</span>
            <span>
              1) L'URL de prévisualisation Google est protégée par authentification. 
              2) Le site est une SPA en JavaScript (les bots basiques ne voient pas les images injectées dynamiquement).
            </span>
          </div>
          <button
            onClick={copyReportForAI}
            className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white font-medium px-3 py-1.5 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {copiedNotification ? '✓ Rapport copié !' : 'Copier le rapport pour une IA'}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 border-b border-slate-200">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 font-medium">Total Modèles</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{stats.total}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{CATEGORIES.length} catégories</div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 font-medium">Photos Conformes</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {stats.loadedCount > 0 ? stats.loadedCount : stats.withImage}
            </div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
              {Math.round(((stats.loadedCount || stats.withImage) / (stats.total || 1)) * 100)}% du catalogue
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 font-medium">Photos Manquantes</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{stats.withoutImage}</div>
            <div className="text-[10px] text-amber-600 font-medium mt-0.5">À renseigner</div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 font-medium">Images 404 / Erreur</div>
            <div className="text-2xl font-black text-rose-600 mt-1">{stats.errorCount}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {isTestingImages ? 'Analyse en cours...' : 'Liens brisés'}
            </div>
          </div>
        </div>

        {/* Toolbar: Filters & Search */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveFilter('all_issues')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeFilter === 'all_issues'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ⚠️ À corriger ({stats.withoutImage + stats.errorCount})
            </button>
            <button
              onClick={() => setActiveFilter('missing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeFilter === 'missing'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Sans photo ({stats.withoutImage})
            </button>
            {stats.errorCount > 0 && (
              <button
                onClick={() => setActiveFilter('error')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeFilter === 'error'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Erreurs 404 ({stats.errorCount})
              </button>
            )}
            <button
              onClick={() => setActiveFilter('valid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeFilter === 'valid'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Valides ({stats.loadedCount || stats.withImage})
            </button>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tout voir ({stats.total})
            </button>
          </div>

          {/* Search + Retest */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Filtrer un modèle, marque..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg w-full sm:w-48 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              onClick={testImages}
              disabled={isTestingImages}
              title="Relancer le test des images"
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium shrink-0 disabled:opacity-50"
            >
              {isTestingImages ? '🔄 Test...' : '🔄 Retester'}
            </button>
          </div>
        </div>

        {/* Table / List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredModels.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <span className="text-4xl">🎉</span>
              <p className="mt-2 font-medium">Aucun élément dans cette catégorie.</p>
              {activeFilter === 'all_issues' && (
                <p className="text-xs text-slate-400 mt-1">Tous les modèles de cette sélection disposent d'une image valide !</p>
              )}
            </div>
          ) : (
            filteredModels.map((item) => {
              const status = !item.hasImageUrl 
                ? 'missing' 
                : (imageStatuses[item.id] === 'error' ? 'error' : imageStatuses[item.id] === 'loaded' ? 'loaded' : 'checking');

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-sm gap-4"
                >
                  {/* Photo Thumbnail */}
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
                    {item.hasImageUrl && status !== 'error' ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain p-1"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-xl opacity-30">♿</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 truncate">{item.name}</span>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {item.brandName}
                      </span>
                      <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.subCategoryName}
                      </span>
                    </div>
                    {item.hasImageUrl ? (
                      <div className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">
                        {item.imageUrl}
                      </div>
                    ) : (
                      <div className="text-[11px] text-amber-700 italic mt-0.5">
                        Aucune image renseignée dans la base
                      </div>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0 flex items-center gap-3">
                    {status === 'missing' && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                        ⚠️ Sans photo
                      </span>
                    )}
                    {status === 'error' && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                        ❌ Image 404 / Erreur
                      </span>
                    )}
                    {status === 'loaded' && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                        ✅ Valide
                      </span>
                    )}
                    {status === 'checking' && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        ⏳ Vérification...
                      </span>
                    )}

                    {/* View Button */}
                    <button
                      onClick={() => {
                        onClose();
                        onSelectModel(item.category, item.subCategory, item.brand, item.model);
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2.5 py-1 bg-white border border-indigo-200 hover:border-indigo-400 rounded-lg shadow-sm transition-colors"
                    >
                      Voir la fiche
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            Affichage de <strong>{filteredModels.length}</strong> sur <strong>{allModels.length}</strong> modèles répertoriés.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={copyReportForAI}
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              📋 Copier les résultats
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
