import React, { useState, useMemo } from 'react';
import { Model, Category } from '../types';

interface ComparisonViewProps {
  models: Model[];
  onRemove: (modelId: string) => void;
  onClear: () => void;
  allCategories?: Category[];
  onAddModel?: (model: Model) => void;
}

type CriteriaCategory = 'ALL' | 'GENERAL' | 'DIMENSIONS' | 'SEATING' | 'PERFORMANCE' | 'SAFETY' | 'SUMMARY';

interface CriteriaRow {
  id: string;
  category: 'GENERAL' | 'DIMENSIONS' | 'SEATING' | 'PERFORMANCE' | 'SAFETY';
  label: string;
  icon: string;
  patterns: string[];
  helper?: string;
  customExtractor?: (model: Model) => string | null;
}

export function ComparisonView({ models, onRemove, onClear, allCategories, onAddModel }: ComparisonViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<CriteriaCategory>('ALL');
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  const [hideEmptyRows, setHideEmptyRows] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modelSearchTerm, setModelSearchTerm] = useState('');

  /**
   * Liste exhaustive et structurée de tous les critères techniques ergonomiques et cliniques
   */
  const criteriaRows: CriteriaRow[] = useMemo(() => [
    // --- 1. GÉNÉRAL & PROFIL ---
    {
      id: 'profile',
      category: 'GENERAL',
      label: 'Profil utilisateur',
      icon: '👤',
      patterns: [],
      helper: 'Indication pédiatrique ou bariatrique certifiée',
      customExtractor: (model: Model) => {
        const badges: string[] = [];
        if (model.isPediatric) badges.push('👶 Pédiatrique');
        if (model.isBariatric) badges.push('⚖️ Bariatrique');
        if (badges.length === 0) return 'Standard / Adulte';
        return badges.join(' • ');
      }
    },
    {
      id: 'frame_material',
      category: 'GENERAL',
      label: 'Matière du châssis & structure',
      icon: '🧱',
      patterns: ['matière du châssis', 'matière du cadre', 'matériau', 'châssis en', 'structure en', 'cadre']
    },
    {
      id: 'folding_type',
      category: 'GENERAL',
      label: 'Type de châssis & Pliabilité',
      icon: '📦',
      patterns: ['pliage', 'pliable', 'châssis pliant', 'type de châssis', 'cadre rigide', 'croisillon'],
      customExtractor: (model: Model) => {
        const found = model.details?.specs.find(s => 
          ['pliage', 'pliable', 'type de châssis', 'châssis'].some(p => s.label.toLowerCase().includes(p))
        );
        if (found) return found.value;
        const desc = (model.description || '') + ' ' + (model.details?.presentation.join(' ') || '');
        if (desc.toLowerCase().includes('pliable') || desc.toLowerCase().includes('croisillon')) return 'Pliable';
        if (desc.toLowerCase().includes('rigide') || desc.toLowerCase().includes('mono-tube')) return 'Rigide';
        return '-';
      }
    },
    {
      id: 'total_weight',
      category: 'GENERAL',
      label: 'Poids total (avec équipements/batteries)',
      icon: '⚖️',
      patterns: ['poids total', 'poids du fauteuil', 'poids à vide', 'poids complet', 'poids net', 'poids']
    },
    {
      id: 'transport_weight',
      category: 'GENERAL',
      label: 'Poids de transport / sans éléments lourds',
      icon: '🧳',
      patterns: ['poids de transport', 'poids sans batterie', 'sans batterie', 'sans roues', 'poids châssis nu']
    },
    {
      id: 'max_user_weight',
      category: 'GENERAL',
      label: 'Charge maximale utilisateur',
      icon: '🏋️',
      patterns: ['poids max. utilisateur', 'poids maximal utilisateur', 'charge max', 'capacité', 'poids max utilisateur', 'charge']
    },

    // --- 2. DIMENSIONS & ENCOMBREMENT ---
    {
      id: 'seat_width',
      category: 'DIMENSIONS',
      label: "Largeur d'assise",
      icon: '↔️',
      patterns: ["largeur d'assise", "largeurs d'assise", "largeur assise", "assise"]
    },
    {
      id: 'seat_depth',
      category: 'DIMENSIONS',
      label: "Profondeur d'assise",
      icon: '↕️',
      patterns: ["profondeur d'assise", "profondeurs d'assise", "profondeur"]
    },
    {
      id: 'seat_height_front',
      category: 'DIMENSIONS',
      label: "Hauteur d'assise avant / sol",
      icon: '📐',
      patterns: ["hauteur d'assise avant", "hauteur d'assise", "hauteur d'assise basse", "hauteur du siège"]
    },
    {
      id: 'seat_height_rear',
      category: 'DIMENSIONS',
      label: "Hauteur d'assise arrière",
      icon: '📐',
      patterns: ["hauteur d'assise arrière"]
    },
    {
      id: 'total_width',
      category: 'DIMENSIONS',
      label: 'Largeur totale hors-tout',
      icon: '📏',
      patterns: ['largeur totale', 'largeur hors-tout', 'largeur hors tout', 'largeur de base', 'largeur de l\'unité motrice']
    },
    {
      id: 'total_length',
      category: 'DIMENSIONS',
      label: 'Longueur totale',
      icon: '📐',
      patterns: ['longueur totale', 'longueur hors-tout', 'longueur']
    },
    {
      id: 'total_height',
      category: 'DIMENSIONS',
      label: 'Hauteur totale',
      icon: '📏',
      patterns: ['hauteur totale', 'hauteur du fauteuil']
    },
    {
      id: 'folded_dimensions',
      category: 'DIMENSIONS',
      label: 'Dimensions ou largeur plié',
      icon: '📁',
      patterns: ['largeur pliée', 'dimensions pliée', 'dimensions plié', 'encombrement plié', 'largeur plié']
    },
    {
      id: 'turning_radius',
      category: 'DIMENSIONS',
      label: 'Rayon / Diamètre de braquage (giration)',
      icon: '🔄',
      patterns: ['rayon de braquage', 'rayon de giration', 'diamètre de braquage', 'giration', 'braquage']
    },

    // --- 3. ASSISE, POSTURE & CONFORT ---
    {
      id: 'backrest_height',
      category: 'SEATING',
      label: 'Hauteur du dossier',
      icon: '🪑',
      patterns: ['hauteur du dossier', 'hauteur dossier']
    },
    {
      id: 'backrest_angle',
      category: 'SEATING',
      label: 'Angle & Inclinaison du dossier',
      icon: '📐',
      patterns: ['angle du dossier', 'inclinaison du dossier', 'dossier électrique', 'dossier', 'inclinaison dossier']
    },
    {
      id: 'seat_tilt',
      category: 'SEATING',
      label: "Bascule d'assise (Tilt)",
      icon: '🔄',
      patterns: ["bascule d'assise", "bascule", "inclinaison d'assise", "tilt", "bascule d'assise électrique"]
    },
    {
      id: 'lift_elevation',
      category: 'SEATING',
      label: "Lift / Élévateur d'assise",
      icon: '⬆️',
      patterns: ['lift', 'élévateur', 'hauteur d\'assise électrique', 'élévation']
    },
    {
      id: 'armrests',
      category: 'SEATING',
      label: 'Accoudoirs & manchettes',
      icon: '🛋️',
      patterns: ['hauteur des accoudoirs', 'accoudoirs', 'manchettes']
    },
    {
      id: 'legrests',
      category: 'SEATING',
      label: 'Repose-jambes & Palettes',
      icon: '🦵',
      patterns: ['repose-jambes', 'repose-pieds', 'palettes', 'angle des potences', 'potences']
    },

    // --- 4. MOTORISATION, BATTERIES & ROULAGE ---
    {
      id: 'speed_max',
      category: 'PERFORMANCE',
      label: 'Vitesse maximale',
      icon: '⚡',
      patterns: ['vitesse maximale', 'vitesse', 'vitesses']
    },
    {
      id: 'autonomy',
      category: 'PERFORMANCE',
      label: 'Autonomie estimée',
      icon: '🔋',
      patterns: ['autonomie maximale', 'autonomie', 'rayon d\'action']
    },
    {
      id: 'batteries',
      category: 'PERFORMANCE',
      label: 'Batteries & Technologie',
      icon: '⚡',
      patterns: ['batteries', 'batterie', 'pack batterie', 'capacité batterie']
    },
    {
      id: 'motors_power',
      category: 'PERFORMANCE',
      label: 'Moteurs & Puissance',
      icon: '⚙️',
      patterns: ['puissance moteur', 'moteur', 'moteurs', 'puissance']
    },
    {
      id: 'obstacle_climb',
      category: 'PERFORMANCE',
      label: "Franchissement d'obstacle & Garde au sol",
      icon: '🧗',
      patterns: ['franchissement', 'hauteur d\'obstacle', 'garde au sol', 'obstacle', 'garde au sol']
    },
    {
      id: 'max_slope',
      category: 'PERFORMANCE',
      label: 'Pente maximale admissible',
      icon: '📐',
      patterns: ['pente maximale', 'pente', 'dévers']
    },
    {
      id: 'drive_type',
      category: 'PERFORMANCE',
      label: 'Roues motrices / Type de propulsion',
      icon: '🛞',
      patterns: ['roues motrices', 'propulsion', 'traction', 'roues centrales'],
      customExtractor: (model: Model) => {
        const found = model.details?.specs.find(s => 
          ['roues motrices', 'propulsion', 'traction', 'roues centrales motrices'].some(p => s.label.toLowerCase().includes(p))
        );
        if (found) return found.value;
        const text = (model.description || '') + ' ' + (model.details?.presentation.join(' ') || '');
        if (text.toLowerCase().includes('traction avant')) return 'Traction avant (FWD)';
        if (text.toLowerCase().includes('roues centrales') || text.toLowerCase().includes('propulsion centrale') || text.toLowerCase().includes('mwd')) return 'Roues motrices centrales (MWD)';
        if (text.toLowerCase().includes('propulsion arrière') || text.toLowerCase().includes('roues arrière motrices') || text.toLowerCase().includes('rwd')) return 'Propulsion arrière (RWD)';
        if (text.toLowerCase().includes('4x4') || text.toLowerCase().includes('quatre roues motrices')) return '4 roues motrices (4x4)';
        return '-';
      }
    },
    {
      id: 'wheels_specs',
      category: 'PERFORMANCE',
      label: 'Roues & Pneus (dimensions / bandages)',
      icon: '🛞',
      patterns: ['roues arrière', 'roues avant', 'roues', 'pneumatiques', 'bandages']
    },
    {
      id: 'camber',
      category: 'PERFORMANCE',
      label: 'Carrossage des roues arrière',
      icon: '📐',
      patterns: ['carrossage', 'carrossage des roues arrière']
    },
    {
      id: 'suspension',
      category: 'PERFORMANCE',
      label: 'Système de suspensions',
      icon: 'ネ',
      patterns: ['suspension', 'suspensions', 'amortisseurs']
    },

    // --- 5. SÉCURITÉ, ÉLECTRONIQUE & HOMOLOGATION ---
    {
      id: 'crash_test',
      category: 'SAFETY',
      label: 'Crash-test & Transport en véhicule',
      icon: '🛡️',
      patterns: ['crash test', 'crash-test', 'homologation', 'crash-testé', 'iso 7176-19', 'dahl', 'wc-19']
    },
    {
      id: 'electronics_controls',
      category: 'SAFETY',
      label: 'Électronique & Système de commande',
      icon: '🕹️',
      patterns: ['électronique', 'module de commande', 'joystick', 'commande', 'r-net', 'linx', 'q-logic']
    },
    {
      id: 'lighting',
      category: 'SAFETY',
      label: 'Éclairage & Feux de signalisation',
      icon: '💡',
      patterns: ['éclairage', 'feux', 'phares', 'clignotants']
    },
    {
      id: 'brakes',
      category: 'SAFETY',
      label: 'Système de freins',
      icon: '🛑',
      patterns: ['frein', 'freins', 'freinage']
    }
  ], []);

  /**
   * Helper d'extraction intelligente de valeur dans les specs d'un modèle
   */
  const findValue = (model: Model, row: CriteriaRow): string => {
    if (row.customExtractor) {
      const custom = row.customExtractor(model);
      if (custom && custom !== '-') return custom;
    }

    if (!model.details?.specs || model.details.specs.length === 0) return '-';

    // 1. Recherche par correspondance exacte ou forte
    const specs = model.details.specs;
    for (const pattern of row.patterns) {
      const match = specs.find(s => s.label.toLowerCase().trim() === pattern.toLowerCase().trim());
      if (match) return match.value;
    }

    // 2. Recherche par inclusion
    for (const pattern of row.patterns) {
      const match = specs.find(s => s.label.toLowerCase().includes(pattern.toLowerCase()));
      if (match) return match.value;
    }

    return '-';
  };

  /**
   * Filtre les lignes selon l'onglet, la recherche, et les toggles
   */
  const visibleRows = useMemo(() => {
    return criteriaRows.filter(row => {
      // Filtre d'onglet
      if (selectedFilter !== 'ALL' && row.category !== selectedFilter) {
        return false;
      }

      // Filtre de recherche textuelle
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesLabel = row.label.toLowerCase().includes(q);
        const matchesHelper = row.helper?.toLowerCase().includes(q) || false;
        const matchesValues = models.some(m => findValue(m, row).toLowerCase().includes(q));
        if (!matchesLabel && !matchesHelper && !matchesValues) return false;
      }

      // Masquer les lignes où tous les modèles ont '-'
      if (hideEmptyRows) {
        const allEmpty = models.every(m => findValue(m, row) === '-');
        if (allEmpty) return false;
      }

      // Afficher uniquement les différences
      if (showOnlyDifferences && models.length > 1) {
        const values = models.map(m => findValue(m, row).trim().toLowerCase());
        const firstVal = values[0];
        const allSame = values.every(v => v === firstVal);
        if (allSame) return false;
      }

      return true;
    });
  }, [criteriaRows, selectedFilter, searchQuery, hideEmptyRows, showOnlyDifferences, models]);

  // Modèles disponibles pour l'ajout rapide
  const allAvailableModels = useMemo(() => {
    if (!allCategories) return [];
    const list: { model: Model; brandName: string; subCatName: string }[] = [];
    allCategories.forEach(cat => {
      cat.subCategories?.forEach(sub => {
        sub.brands?.forEach(brand => {
          brand.models?.forEach(m => {
            if (!models.some(curr => curr.id === m.id)) {
              list.push({ model: m, brandName: brand.name, subCatName: sub.name });
            }
          });
        });
      });
    });
    return list;
  }, [allCategories, models]);

  const filteredAvailableModels = useMemo(() => {
    if (!modelSearchTerm.trim()) return allAvailableModels.slice(0, 20);
    const q = modelSearchTerm.toLowerCase();
    return allAvailableModels.filter(item => 
      item.model.name.toLowerCase().includes(q) ||
      item.brandName.toLowerCase().includes(q) ||
      item.subCatName.toLowerCase().includes(q)
    ).slice(0, 30);
  }, [allAvailableModels, modelSearchTerm]);

  if (models.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200 mx-auto max-w-2xl px-6">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border border-indigo-100">
          ⚖️
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Le comparateur est vide</h2>
        <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto leading-relaxed">
          Pour comparer des aides techniques (fauteuils manuels, électriques, verticalisateurs, scooters), cliquez sur le bouton <span className="font-semibold text-indigo-700">« Sélectionner pour comparatif »</span> dans leurs fiches techniques.
        </p>
        {allCategories && onAddModel && allAvailableModels.length > 0 && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Choisir un modèle à comparer
          </button>
        )}
      </div>
    );
  }

  const categoryTabs = [
    { id: 'ALL', label: 'Tous les critères', count: criteriaRows.length, icon: '📋' },
    { id: 'GENERAL', label: 'Gabarit & Poids', count: criteriaRows.filter(r => r.category === 'GENERAL').length, icon: '⚖️' },
    { id: 'DIMENSIONS', label: 'Dimensions & Assise', count: criteriaRows.filter(r => r.category === 'DIMENSIONS').length, icon: '📐' },
    { id: 'SEATING', label: 'Posture & Confort', count: criteriaRows.filter(r => r.category === 'SEATING').length, icon: '🪑' },
    { id: 'PERFORMANCE', label: 'Roulage & Moteur', count: criteriaRows.filter(r => r.category === 'PERFORMANCE').length, icon: '⚡' },
    { id: 'SAFETY', label: 'Sécurité & Contrôle', count: criteriaRows.filter(r => r.category === 'SAFETY').length, icon: '🛡️' },
    { id: 'SUMMARY', label: 'Bilan Clinique (Forces / Vigilances)', count: 2, icon: '🩺' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-fade-in w-full">
      {/* En-tête principal */}
      <div className="bg-slate-900 text-white p-6 border-b border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚖️</span>
              <h2 className="text-2xl font-bold tracking-tight">Comparatif Technique & Ergonomique des VPH</h2>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Analyse multi-critères approfondie pour ergothérapeutes et professionnels de santé • {models.length} modèle(s) sélectionné(s) (max 4)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {allCategories && onAddModel && models.length < 4 && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Ajouter un fauteuil ({models.length}/4)
              </button>
            )}

            <button
              onClick={() => window.print()}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors border border-slate-700 flex items-center gap-1.5"
              title="Imprimer ou exporter en PDF"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24-1.011-.37-2.062-.37-3.139a9.715 9.715 0 011.666-5.46M12 3.75v3.75m0 0a3.75 3.75 0 003.75 3.75h1.875M12 7.5a3.75 3.75 0 01-3.75 3.75H6.375m11.25 0a3.75 3.75 0 013.75 3.75v6.75a3.75 3.75 0 01-3.75 3.75H6.375a3.75 3.75 0 01-3.75-3.75V11.25" />
              </svg>
              Imprimer
            </button>

            <button 
              onClick={onClear}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold px-3 py-2 rounded-lg transition-colors border border-red-500/30"
              title="Vider la sélection"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Barre de contrôle : Recherche + Toggles */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Recherche rapide dans les critères */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrer un critère (ex: lift, rayon, pliage, autonomie...)"
              className="w-full bg-slate-800 text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-8 py-2.5 border border-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Toggles interactifs */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Toggle Différences */}
            <label className={`cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all select-none ${
              showOnlyDifferences 
                ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 font-bold' 
                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}>
              <input 
                type="checkbox" 
                checked={showOnlyDifferences} 
                onChange={(e) => setShowOnlyDifferences(e.target.checked)}
                className="hidden" 
              />
              <span className="text-sm">{showOnlyDifferences ? '✨' : '⚪'}</span>
              <span>Différences uniquement</span>
            </label>

            {/* Toggle Masquer les lignes vides */}
            <label className={`cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all select-none ${
              hideEmptyRows 
                ? 'bg-indigo-500/20 border-indigo-400/50 text-indigo-300 font-bold' 
                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}>
              <input 
                type="checkbox" 
                checked={hideEmptyRows} 
                onChange={(e) => setHideEmptyRows(e.target.checked)}
                className="hidden" 
              />
              <span className="text-sm">{hideEmptyRows ? '👁️' : '⚪'}</span>
              <span>Masquer critères non renseignés</span>
            </label>

            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 font-mono text-[11px]">
              {visibleRows.length} critère(s) affiché(s)
            </span>
          </div>
        </div>

        {/* Onglets de filtrage par famille de critères */}
        <div className="flex items-center gap-1.5 mt-5 overflow-x-auto scrollbar-none pb-1 pt-1 border-t border-slate-800/60">
          {categoryTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as CriteriaCategory)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                selectedFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tableau comparatif */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <table className="w-full text-sm text-left border-collapse table-fixed min-w-[1050px]">
          {/* Header des modèles */}
          <thead>
            <tr>
              <th className="p-4 bg-slate-100/80 border-b border-r border-slate-200 w-64 font-bold text-slate-800 sticky left-0 z-20 shadow-[2px_0_6px_rgba(0,0,0,0.06)]">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-extrabold mb-1">Critères d'analyse</div>
                <div className="text-[11px] font-normal text-slate-500 leading-snug">
                  Données certifiées constructeur & nomenclature LPPR
                </div>
              </th>
              {models.map(model => (
                <th key={model.id} className="p-4 bg-white border-b border-r border-slate-200 last:border-r-0 min-w-[260px] align-top">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      Modèle #{models.indexOf(model) + 1}
                    </span>
                    <button 
                      onClick={() => onRemove(model.id)} 
                      className="text-slate-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                      title="Retirer ce modèle du comparatif"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="h-32 w-full flex items-center justify-center mb-3 bg-slate-50/60 rounded-xl p-2 border border-slate-100">
                      {model.imageUrl ? (
                        <img 
                          src={model.imageUrl} 
                          alt={model.name} 
                          className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105" 
                          referrerPolicy="no-referrer" 
                        />
                      ) : (
                        <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center text-3xl opacity-30">
                          ♿
                        </div>
                      )}
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base leading-tight min-h-[2.5rem] flex items-center justify-center uppercase tracking-tight">
                      {model.name}
                    </h3>

                    {/* Badges Pédiatrique / Bariatrique */}
                    <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                      {model.isPediatric && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          👶 Pédiatrique
                        </span>
                      )}
                      {model.isBariatric && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          ⚖️ Bariatrique
                        </span>
                      )}
                    </div>

                    {model.manufacturerUrl && (
                      <a
                        href={model.manufacturerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 text-[11px] text-indigo-600 hover:text-indigo-800 hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        <span>Fiche fabricant</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {/* Lignes techniques exhaustives */}
            {selectedFilter !== 'SUMMARY' && visibleRows.map((row, idx) => {
              const rowValues = models.map(m => findValue(m, row));
              const isDifferent = models.length > 1 && rowValues.some(v => v !== rowValues[0] && v !== '-');

              return (
                <tr key={row.id || idx} className={`transition-colors ${isDifferent ? 'bg-indigo-50/20 hover:bg-indigo-50/40' : 'hover:bg-slate-50/80'}`}>
                  {/* Colonne critère fixe */}
                  <td className="p-3.5 bg-slate-50/90 font-medium text-slate-800 border-r border-slate-200 sticky left-0 z-10 shadow-[2px_0_6px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base shrink-0">{row.icon}</span>
                        <div>
                          <div className="font-semibold text-slate-900 leading-snug">{row.label}</div>
                          {row.helper && (
                            <div className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5">{row.helper}</div>
                          )}
                        </div>
                      </div>
                      {isDifferent && (
                        <span className="shrink-0 w-2 h-2 rounded-full bg-indigo-500" title="Critère discriminant (valeurs différentes)"></span>
                      )}
                    </div>
                  </td>

                  {/* Données de chaque modèle */}
                  {models.map(model => {
                    const value = findValue(model, row);
                    const isMissing = value === '-';

                    return (
                      <td key={model.id} className="p-3.5 text-slate-700 border-r border-slate-100 last:border-0 align-top">
                        {isMissing ? (
                          <span className="text-slate-300 font-mono text-xs select-none">-</span>
                        ) : (
                          <div className="font-medium text-slate-800 text-xs sm:text-sm leading-relaxed">
                            {value}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* SECTION OPTIONS & ÉQUIPEMENTS NOTABLES */}
            {(selectedFilter === 'ALL' || selectedFilter === 'SEATING' || selectedFilter === 'SAFETY') && (
              <tr className="bg-slate-50/40">
                <td className="p-3.5 bg-slate-100/90 font-bold text-slate-900 border-r border-slate-200 sticky left-0 z-10 shadow-[2px_0_6px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🔧</span>
                    <div>
                      <div className="font-bold text-slate-900">Options & Équipements notables</div>
                      <div className="text-[10px] text-slate-500 font-normal">Fonctions modulaires disponibles</div>
                    </div>
                  </div>
                </td>
                {models.map(model => (
                  <td key={model.id} className="p-3.5 border-r border-slate-100 last:border-0 align-top">
                    {model.details?.options && model.details.options.length > 0 ? (
                      <ul className="space-y-1.5">
                        {model.details.options.map((opt, i) => (
                          <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 leading-snug">
                            <span className="text-indigo-500 font-bold shrink-0">▸</span>
                            <span>{opt}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-300 font-mono text-xs">-</span>
                    )}
                  </td>
                ))}
              </tr>
            )}

            {/* SECTION COULEURS & FINITIONS */}
            {(selectedFilter === 'ALL' || selectedFilter === 'GENERAL') && (
              <tr>
                <td className="p-3.5 bg-slate-50/90 font-bold text-slate-900 border-r border-slate-200 sticky left-0 z-10 shadow-[2px_0_6px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎨</span>
                    <div>
                      <div className="font-bold text-slate-900">Finitions & Couleurs</div>
                      <div className="text-[10px] text-slate-500 font-normal">Nuancier constructeur</div>
                    </div>
                  </div>
                </td>
                {models.map(model => (
                  <td key={model.id} className="p-3.5 border-r border-slate-100 last:border-0 align-top">
                    {model.details?.colors && model.details.colors.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {model.details.colors.map((color, i) => (
                          <div 
                            key={i} 
                            className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-200/80"
                            title={color.name}
                          >
                            <span 
                              className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs shrink-0" 
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-[11px] text-slate-700 font-medium">{color.name}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs italic">Selon configurateur</span>
                    )}
                  </td>
                ))}
              </tr>
            )}

            {/* BILAN CLINIQUE : POINTS FORTS */}
            {(selectedFilter === 'ALL' || selectedFilter === 'SUMMARY') && (
              <tr className="bg-emerald-50/20">
                <td className="p-4 bg-emerald-50/70 font-bold text-emerald-950 border-r border-emerald-100 sticky left-0 z-10 shadow-[2px_0_6px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✅</span>
                    <div>
                      <div className="text-emerald-900 font-extrabold text-sm">Points forts</div>
                      <div className="text-[10px] text-emerald-700 font-medium">Bénéfices ergothérapiques majeurs</div>
                    </div>
                  </div>
                </td>
                {models.map(model => (
                  <td key={model.id} className="p-4 text-emerald-950 border-r border-emerald-100/50 last:border-0 align-top">
                    {model.details?.pros && model.details.pros.length > 0 ? (
                      <ul className="space-y-2">
                        {model.details.pros.map((p, i) => (
                          <li key={i} className="text-xs leading-relaxed flex items-start gap-2">
                            <span className="text-emerald-600 font-black shrink-0 mt-0.5">✓</span>
                            <span className="font-medium text-emerald-900">{p}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-300 font-mono text-xs">-</span>
                    )}
                  </td>
                ))}
              </tr>
            )}

            {/* BILAN CLINIQUE : VIGILANCE & LIMITES */}
            {(selectedFilter === 'ALL' || selectedFilter === 'SUMMARY') && (
              <tr className="bg-amber-50/20">
                <td className="p-4 bg-amber-50/70 font-bold text-amber-950 border-r border-amber-100 sticky left-0 z-10 shadow-[2px_0_6px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚠️</span>
                    <div>
                      <div className="text-amber-900 font-extrabold text-sm">Points de vigilance</div>
                      <div className="text-[10px] text-amber-700 font-medium">Limites ou points à valider lors d'essais</div>
                    </div>
                  </div>
                </td>
                {models.map(model => (
                  <td key={model.id} className="p-4 text-amber-950 border-r border-amber-100/50 last:border-0 align-top">
                    {model.details?.cons && model.details.cons.length > 0 ? (
                      <ul className="space-y-2">
                        {model.details.cons.map((c, i) => (
                          <li key={i} className="text-xs leading-relaxed flex items-start gap-2">
                            <span className="text-amber-600 font-black shrink-0 mt-0.5">!</span>
                            <span className="font-medium text-amber-900">{c}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-300 font-mono text-xs">-</span>
                    )}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer informatif */}
      <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-xs text-slate-500 italic">
          <strong className="text-slate-700">Guide de lecture :</strong> Les données sont extraites dynamiquement des fiches techniques fabricants et de la LPPR (réforme 2025). Le point violet indique une différence technique entre les modèles comparés.
        </p>
        <div className="text-xs font-semibold text-indigo-700 shrink-0">
          Outil d'aide à la décision ergothérapique
        </div>
      </div>

      {/* Modal d'ajout rapide de modèle */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Ajouter un modèle au comparatif</h3>
                <p className="text-xs text-slate-500 mt-0.5">Sélectionnez un autre fauteuil à intégrer dans l'analyse</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/50"
              >
                ✕
              </button>
            </div>

            <div className="p-4 border-b border-slate-100">
              <input
                type="text"
                autoFocus
                value={modelSearchTerm}
                onChange={(e) => setModelSearchTerm(e.target.value)}
                placeholder="Rechercher par nom, marque, catégorie (ex: Action, Edge, Invacare...)"
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredAvailableModels.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Aucun modèle disponible correspondant à cette recherche.
                </div>
              ) : (
                filteredAvailableModels.map(({ model, brandName, subCatName }) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      if (onAddModel) {
                        onAddModel(model);
                        setIsAddModalOpen(false);
                        setModelSearchTerm('');
                      }
                    }}
                    className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all flex items-center gap-3 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                      {model.imageUrl ? (
                        <img src={model.imageUrl} alt={model.name} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="text-lg opacity-40">♿</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-slate-900 group-hover:text-indigo-700 truncate">
                        {model.name}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {brandName} • <span className="font-mono">{subCatName}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      + Comparer
                    </span>
                  </button>
                ))
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}