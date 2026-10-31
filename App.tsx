
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AppStep, Category, SubCategory, Brand, Model, MainTab } from './types';
import { CATEGORIES } from './data';
import { parseUrl, buildSearch, applyPageMeta, NavState } from './routing';
import { CookieBanner } from './components/CookieBanner';
import { ChatInterface } from './components/ChatInterface';
import { ProductSheet } from './components/ProductSheet';
import { ComparisonView } from './components/ComparisonView';
import { InfoModal } from './components/InfoModal';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { SearchBar } from './components/SearchBar';
import { LegalView } from './components/LegalView';
import { PrivacyView } from './components/PrivacyView';
import { NewsView } from './components/NewsView';
import { AuditModal } from './components/AuditModal';

// Composant Logo avec une icône de fauteuil roulant réaliste
const Logo = () => (
  <div className="flex items-center gap-4">
    {/* Icône Fauteuil Roulant Classique - Tracé explicite */}
    <div className="text-indigo-600 shrink-0">
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Dossier et poignées */}
        <path d="M4 3h2l2 11" />
        {/* Assise */}
        <path d="M8 14h9" />
        {/* Grande roue arrière */}
        <circle cx="8" cy="17" r="5" />
        {/* Rayons de la roue arrière pour plus de réalisme */}
        <path d="M8 14v6M5 17h6" strokeWidth="1" opacity="0.5"/>
        {/* Support avant et petite roue */}
        <path d="M17 14l1.5 5" />
        <circle cx="18.5" cy="20" r="1.5" />
        {/* Repose-pieds */}
        <path d="M18.5 19h2" strokeWidth="1.5" />
      </svg>
    </div>
    
    {/* Texte Signature */}
    <div className="flex flex-col justify-center border-l border-slate-200 pl-4">
      <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
        Assistant <span className="text-indigo-600">Ergo</span>
      </span>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mt-1.5 leading-none">
        Guide VPH &amp; LPPR
      </span>
    </div>
  </div>
);

export default function App() {
  // Page de départ lue dans l'adresse (permet d'ouvrir directement un lien partagé)
  const initialNav = useMemo(() => parseUrl(window.location.search), []);

  const [currentTab, setCurrentTab] = useState<MainTab>(initialNav.tab);
  const [step, setStep] = useState<AppStep>(initialNav.step);
  const [filterType, setFilterType] = useState<
    'ALL' | 'PEDIATRIC' | 'BARIATRIC'
  >('ALL');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(initialNav.category);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(initialNav.subCategory);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(initialNav.brand);
  const [selectedModel, setSelectedModel] = useState<Model | null>(initialNav.model);
  const [comparisonList, setComparisonList] = useState<Model[]>(initialNav.compareModels);
  const [infoModalData, setInfoModalData] = useState<{title: string, content: string} | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  // --- Synchronisation page affichée <-> adresse du navigateur ---
  const isFirstUrlSync = useRef(true);

  useEffect(() => {
    const nav: NavState = {
      tab: currentTab,
      step,
      category: selectedCategory,
      subCategory: selectedSubCategory,
      brand: selectedBrand,
      model: selectedModel,
      compareModels: comparisonList,
    };
    const search = buildSearch(nav);
    if (search !== window.location.search) {
      const url = window.location.pathname + search + window.location.hash;
      // On remplace l'entrée (au lieu d'en ajouter une) au premier affichage
      // et quand on modifie simplement la liste du comparatif affiché.
      const replace =
        isFirstUrlSync.current ||
        (step === AppStep.COMPARISON_VIEW && window.location.search.includes('comparer='));
      if (replace) window.history.replaceState(null, '', url);
      else window.history.pushState(null, '', url);
    }
    isFirstUrlSync.current = false;
    applyPageMeta(nav, search);
  }, [currentTab, step, selectedCategory, selectedSubCategory, selectedBrand, selectedModel, comparisonList]);

  // Bouton « Retour » / « Suivant » du navigateur
  useEffect(() => {
    const onPopState = () => {
      const nav = parseUrl(window.location.search);
      setCurrentTab(nav.tab);
      setStep(nav.step);
      setSelectedCategory(nav.category);
      setSelectedSubCategory(nav.subCategory);
      setSelectedBrand(nav.brand);
      setSelectedModel(nav.model);
      if (nav.step === AppStep.COMPARISON_VIEW) setComparisonList(nav.compareModels);
      setInfoModalData(null);
      setIsSearchOpen(false);
      setIsAuditOpen(false);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleAuditSelectModel = (category: Category, subCategory: SubCategory, brand: Brand, model: Model) => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);
    setSelectedBrand(brand);
    setSelectedModel(model);
    setStep(AppStep.DETAILS_CHAT);
    setCurrentTab(MainTab.COMPARATOR);
  };

  // Scroll to top on tab or step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTab, step, selectedCategory, selectedSubCategory, selectedBrand, selectedModel]);

  const modelMatchesFilter = (model: Model) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'PEDIATRIC') return model.isPediatric === true;
    if (filterType === 'BARIATRIC') return model.isBariatric === true;
    return true;
  };

  const brandMatchesFilter = (brand: Brand) => {
      if (!brand.models || brand.models.length === 0) return false;
      return brand.models.some(modelMatchesFilter);
  };

  const subCategoryMatchesFilter = (subCategory: SubCategory) => {
      if (!subCategory.brands || subCategory.brands.length === 0) return false;

      return subCategory.brands.some(brand =>
        brand.models?.some(modelMatchesFilter)
      );
   };

  const goToHome = () => {
    setStep(AppStep.CATEGORY_SELECTION);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedBrand(null);
    setSelectedModel(null);
  };

  const goToSubCategories = () => {
    if (selectedCategory) {
      setStep(AppStep.SUBCATEGORY_SELECTION);
      setSelectedSubCategory(null);
      setSelectedBrand(null);
      setSelectedModel(null);
    }
  };

  const goToBrands = () => {
    if (selectedSubCategory) {
      setStep(AppStep.BRAND_SELECTION);
      setSelectedBrand(null);
      setSelectedModel(null);
    }
  };

  const goToModels = () => {
    if (selectedBrand) {
      setStep(AppStep.MODEL_SELECTION);
      setSelectedModel(null);
    }
  };

  const goToComparison = () => {
      setStep(AppStep.COMPARISON_VIEW);
  };

  const handleCategorySelect = (category: Category) => {
        setFilterType('ALL'); // important
        setSelectedCategory(category);

        if (category.subCategories.length > 0) {
          setStep(AppStep.SUBCATEGORY_SELECTION);
        } else {
          setSelectedSubCategory({ id: 'general', name: 'Général', description: category.name });
          setStep(AppStep.DETAILS_CHAT);
        }
    };


  const handleSubCategorySelect = (subCategory: SubCategory) => {
    setSelectedSubCategory(subCategory);
    if (subCategory.brands && subCategory.brands.length > 0) {
      setStep(AppStep.BRAND_SELECTION);
    } else {
      setStep(AppStep.DETAILS_CHAT);
    }
  };

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    if (brand.models && brand.models.length > 0) {
      setStep(AppStep.MODEL_SELECTION);
    } else {
      setStep(AppStep.DETAILS_CHAT);
    }
  };

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    setStep(AppStep.DETAILS_CHAT);
  };

  const handleSearchResult = (result: any) => {
    setCurrentTab(MainTab.COMPARATOR);
    setSelectedCategory(result.category);
    setSelectedSubCategory(result.subCategory);
    if (result.type === 'MODEL') {
      setSelectedBrand(result.brand);
      setSelectedModel(result.model);
      setStep(AppStep.DETAILS_CHAT);
    } else if (result.type === 'BRAND') {
      setSelectedBrand(result.brand);
      setSelectedModel(null);
      if (result.brand.models && result.brand.models.length > 0) setStep(AppStep.MODEL_SELECTION);
      else setStep(AppStep.DETAILS_CHAT);
    } else if (result.type === 'SUBCATEGORY') {
      setSelectedBrand(null);
      setSelectedModel(null);
      if (result.subCategory.brands && result.subCategory.brands.length > 0) setStep(AppStep.BRAND_SELECTION);
      else setStep(AppStep.DETAILS_CHAT);
    }
    setIsSearchOpen(false);
  };

  const handleNewsNavigate = (link: any) => {
    if (link.type === 'EXTERNAL' && link.url) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
      return;
    }

    const category = CATEGORIES.find(c => c.id === link.categoryId);
    if (!category) return;

    setSelectedCategory(category);
    
    const subCategory = category.subCategories.find(s => s.id === link.subCategoryId);
    if (!subCategory) {
      setStep(AppStep.SUBCATEGORY_SELECTION);
      setCurrentTab(MainTab.COMPARATOR);
      return;
    }

    setSelectedSubCategory(subCategory);
    
    if (link.type === 'INFO_MODAL') {
      if (subCategory.detailedInfo) {
        setInfoModalData({
          title: subCategory.detailedInfo.title,
          content: subCategory.detailedInfo.content
        });
      }
      return;
    }

    if (link.type === 'SUBCATEGORY') {
      if (subCategory.brands && subCategory.brands.length > 0) {
        setStep(AppStep.BRAND_SELECTION);
      } else {
        setStep(AppStep.DETAILS_CHAT);
      }
    } else if (link.type === 'BRAND' || link.type === 'MODEL') {
      const brand = subCategory.brands?.find(b => b.id === link.brandId);
      if (!brand) {
        setStep(AppStep.BRAND_SELECTION);
      } else {
        setSelectedBrand(brand);
        if (link.type === 'BRAND') {
          if (brand.models && brand.models.length > 0) {
            setStep(AppStep.MODEL_SELECTION);
          } else {
            setStep(AppStep.DETAILS_CHAT);
          }
        } else {
          const model = brand.models?.find(m => m.id === link.id);
          if (model) {
            setSelectedModel(model);
            setStep(AppStep.DETAILS_CHAT);
          } else {
            setStep(AppStep.MODEL_SELECTION);
          }
        }
      }
    }
    
    setCurrentTab(MainTab.COMPARATOR);
  };

  const addToComparison = (model: Model) => {
    if (comparisonList.find(m => m.id === model.id)) return;
    if (comparisonList.length >= 4) {
        console.warn("Maximum 4 modèles.");
        return;
    }
    setComparisonList([...comparisonList, model]);
  };

  const removeFromComparison = (modelId: string) => {
    const newList = comparisonList.filter(m => m.id !== modelId);
    setComparisonList(newList);
    if (newList.length === 0 && step === AppStep.COMPARISON_VIEW) {
      handleBack();
    }
  };

  const clearComparison = () => {
    setComparisonList([]);
    if (step === AppStep.COMPARISON_VIEW) {
      handleBack();
    }
  };

  const handleBack = () => {
    if (step === AppStep.COMPARISON_VIEW) {
        if (selectedModel) setStep(AppStep.DETAILS_CHAT);
        else goToHome();
    } else if (step === AppStep.DETAILS_CHAT) {
      if (selectedModel) goToModels();
      else if (selectedBrand) {
        if (selectedBrand.models && selectedBrand.models.length > 0) goToModels();
        else goToBrands();
      } else if (selectedCategory?.subCategories.length === 0) goToHome();
      else goToSubCategories();
    } else if (step === AppStep.MODEL_SELECTION) goToBrands();
    else if (step === AppStep.BRAND_SELECTION) goToSubCategories();
    else if (step === AppStep.SUBCATEGORY_SELECTION) goToHome();
  };

  const openInfoModal = (e: React.MouseEvent, title: string, content: string) => {
    e.stopPropagation();
    setInfoModalData({ title, content });
  };

  const BreadcrumbItem = ({ label, onClick, active }: { label: string, onClick?: () => void, active?: boolean }) => (
    <button 
      onClick={onClick}
      disabled={!onClick || active}
      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 ${
        onClick && !active ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 cursor-pointer' : 'bg-slate-100 text-slate-500 cursor-default'
      }`}
    >
      {label}
    </button>
  );

  const TabButton = ({ tab, label, icon }: { tab: MainTab, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setCurrentTab(tab)}
      aria-label={label}
      aria-current={currentTab === tab ? 'page' : undefined}
      title={label}
      className={`flex items-center gap-2 px-3 sm:px-4 py-6 text-sm font-medium transition-all relative whitespace-nowrap ${currentTab === tab ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
    >
      <span className={currentTab === tab ? 'text-indigo-600' : 'text-slate-400'}>{icon}</span>
      <span className="hidden md:inline">{label}</span>
      {currentTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></span>}
    </button>
  );

  const containerClass = step === AppStep.COMPARISON_VIEW ? "max-w-[98%] mx-auto p-2 md:p-4 transition-all duration-500" : "max-w-5xl mx-auto p-4 md:p-6 transition-all duration-500";

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 pb-16 sm:pb-0 print:pb-0">
      <CookieBanner />
      <InfoModal isOpen={!!infoModalData} onClose={() => setInfoModalData(null)} title={infoModalData?.title || ''} content={infoModalData?.content || ''} />
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelect={handleSearchResult} categories={CATEGORIES} />
      <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} onSelectModel={handleAuditSelectModel} />

      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer py-4 group" onClick={() => { setCurrentTab(MainTab.COMPARATOR); goToHome(); }}>
             <Logo />
          </div>

          <div className="flex items-center">
            <nav className="hidden sm:flex items-center" aria-label="Navigation principale">
               <TabButton tab={MainTab.COMPARATOR} label="Matériel" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg>} />
               <TabButton tab={MainTab.NEWS} label="Actualités" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg>} />
               <TabButton tab={MainTab.ABOUT} label="Présentation" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>} />
               <TabButton tab={MainTab.CONTACT} label="Contact" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>} />
            </nav>
            <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>
            <button onClick={() => setIsSearchOpen(true)} className="p-2 ml-1 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 rounded-full transition-all duration-300 group shadow-inner" title="Recherche globale" aria-label="Rechercher un modèle, une marque ou une catégorie">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
               </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full bg-slate-50">
        {currentTab === MainTab.COMPARATOR && (
            <div className={containerClass}>
                <div className="flex items-center justify-between mb-6 px-1 print:hidden">
                    {step !== AppStep.CATEGORY_SELECTION && (
                        <button onClick={handleBack} className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 flex items-center gap-2 transition-all shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg> Retour
                        </button>
                    )}
                    <div className="flex-1"></div>
                    {comparisonList.length > 0 && step !== AppStep.COMPARISON_VIEW && (
                        <button onClick={goToComparison} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A5.96 5.96 0 0019.995 2.25c0-.855-.224-1.65-.615-2.35M5.25 4.97A5.96 5.96 0 014.005 2.25c0-.855.224-1.65.615-2.35" /></svg> Voir le comparatif ({comparisonList.length}/4)
                        </button>
                    )}
                </div>

                {step === AppStep.CATEGORY_SELECTION && (
                <div className="space-y-6 animate-fade-in text-center">
                    <div className="space-y-2 mb-8">
                      <h1 className="text-2xl font-bold text-slate-800">Quel type de dispositif recherchez-vous ?</h1>
                      <p className="text-slate-500">Sélectionnez une catégorie pour commencer l'accompagnement.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {CATEGORIES.map((cat) => (
                        <button key={cat.id} onClick={() => handleCategorySelect(cat)} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all group text-left flex flex-col gap-3">
                        <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300 block w-fit h-10 flex items-center">
                            {cat.icon.startsWith('<svg') ? <span dangerouslySetInnerHTML={{__html: cat.icon}} className="block w-10 h-10" /> : cat.icon}
                        </span>
                        <div>
                            <h3 className="font-semibold text-lg text-slate-900 group-hover:text-indigo-700">{cat.name}</h3>
                            <p className="text-sm text-slate-500 mt-1">{cat.subCategories.length > 0 ? `${cat.subCategories.length} sous-catégories` : 'Consultation directe'}</p>
                        </div>
                        </button>
                    ))}
                    </div>
                </div>
                )}

                {step === AppStep.SUBCATEGORY_SELECTION && selectedCategory && (
                <div className="space-y-6 animate-fade-in text-center">
                    <div className="space-y-2 mb-8">
                      <div className="flex items-center justify-center gap-2 mb-2"><BreadcrumbItem label="Accueil" onClick={goToHome} /><span className="text-slate-300">/</span><BreadcrumbItem label={selectedCategory.name} active /></div>
                      <h1 className="text-2xl font-bold text-slate-800">Précisez le type de matériel</h1>
                      <p className="text-slate-500">Choisissez la sous-catégorie correspondant au besoin du patient.</p>
                    </div>
                    {/* Filtres pédiatrique / bariatrique */}
                      <div className="flex justify-center gap-3 mb-6">
                        <button
                          onClick={() => setFilterType('ALL')}
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            filterType === 'ALL'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Tous
                        </button>

                        <button
                          onClick={() => setFilterType('PEDIATRIC')}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold leading-tight text-center ${
                            filterType === 'PEDIATRIC'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          <div>👶 Pédiatrique</div>
                          <div className="text-[10px] font-normal opacity-80">
                            largeur d’assise &lt; 35 cm
                          </div>
                        </button>


                        <button
                          onClick={() => setFilterType('BARIATRIC')}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold leading-tight text-center ${
                            filterType === 'BARIATRIC'
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          <div>⚖️ Bariatrique</div>
                          <div className="text-[10px] font-normal opacity-80">
                            poids utilisateur &gt; 140 kg
                          </div>
                        </button>

                      </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedCategory.subCategories.map((sub) => {
                        const isCompatible = subCategoryMatchesFilter(sub);

                        return (
                          <button
                            key={sub.id}
                            onClick={() => isCompatible && handleSubCategorySelect(sub)}
                            disabled={!isCompatible}
                            className={`bg-white p-5 rounded-xl shadow-sm border transition-all text-left group relative
                              ${
                                isCompatible
                                  ? 'border-slate-200 hover:border-indigo-500 hover:shadow-md'
                                  : 'border-slate-200 opacity-40 cursor-not-allowed'
                              }`}
                          >
                            <div className="flex items-baseline justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-xl text-indigo-900">
                                  {sub.name}
                                </h3>

                                {sub.detailedInfo && isCompatible && (
                                  <div
                                    onClick={(e) => openInfoModal(e, sub.detailedInfo!.title, sub.detailedInfo!.content)}
                                    className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-serif font-bold hover:bg-blue-600 transition-colors shadow-sm z-10"
                                    title="Voir la fiche descriptive"
                                  >
                                    i
                                  </div>
                                )}
                              </div>

                              {sub.brands && sub.brands.length > 0 && (
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                                  {sub.brands.length} marques
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-slate-600">{sub.description}</p>

                            {!isCompatible && (
                              <p className="mt-2 text-xs italic text-slate-400">
                                Aucun modèle compatible avec ce filtre
                              </p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                </div>
                )}


                {step === AppStep.BRAND_SELECTION && selectedCategory && selectedSubCategory && (
                  <div className="space-y-6 animate-fade-in text-center">
                    <div className="space-y-2 mb-8">
                      <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
                        <BreadcrumbItem label="Accueil" onClick={goToHome} />
                        <span className="text-slate-300">/</span>
                        <BreadcrumbItem label={selectedCategory.name} onClick={goToSubCategories} />
                        <span className="text-slate-300">/</span>
                        <BreadcrumbItem label={selectedSubCategory.name} active />
                      </div>

                      <h1 className="text-2xl font-bold text-slate-800">
                        Sélectionnez une marque
                      </h1>
                      <p className="text-slate-500">
                        Pour affiner les conseils sur les modèles spécifiques disponibles.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...(selectedSubCategory.brands || [])]
                        .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }))
                        .map((brand) => {
                        const isCompatible = brandMatchesFilter(brand);

                        return (
                          <button
                            key={brand.id}
                            onClick={() => isCompatible && handleBrandSelect(brand)}
                            disabled={!isCompatible}
                            className={`
                              p-8 rounded-xl border transition-all flex flex-col items-center justify-center gap-4
                              ${
                                isCompatible
                                  ? 'bg-white shadow-sm border-slate-200 hover:border-indigo-500 hover:shadow-md cursor-pointer'
                                  : 'bg-slate-100 border-slate-200 opacity-40 cursor-not-allowed'
                              }
                            `}
                          >
                            <div
                              className={`
                                w-16 h-16 rounded-full flex items-center justify-center text-2xl
                                ${
                                  isCompatible
                                    ? 'bg-slate-100 text-indigo-600'
                                    : 'bg-slate-200 text-slate-400'
                                }
                              `}
                            >
                              {brand.name.charAt(0)}
                            </div>

                            <h3 className="font-bold text-lg text-slate-900">
                              {brand.name}
                            </h3>

                            {brand.models && brand.models.length > 0 && (
                              <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                {brand.models.length} modèles
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}


                {step === AppStep.MODEL_SELECTION && selectedCategory && selectedSubCategory && selectedBrand && (
                <div className="space-y-6 animate-fade-in text-center">
                    <div className="space-y-2 mb-8">
                      <div className="flex flex-wrap items-center justify-center gap-2 mb-2"><BreadcrumbItem label="Accueil" onClick={goToHome} /><span className="text-slate-300">/</span><BreadcrumbItem label={selectedCategory.name} onClick={goToSubCategories} /><span className="text-slate-300">/</span><BreadcrumbItem label={selectedSubCategory.name} onClick={goToBrands} /><span className="text-slate-300">/</span><BreadcrumbItem label={selectedBrand.name} active /></div>
                      <h1 className="text-2xl font-bold text-slate-800">Choisissez un modèle</h1>
                      <p className="text-slate-500">Accédez à la fiche détaillée.</p>
                    </div>
                    <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
                    {selectedBrand.models?.map((model) => {
                      const isCompatible = modelMatchesFilter(model);
                       return (
                        <button
                        key={model.id}
                        onClick={() => isCompatible && handleModelSelect(model)}
                        disabled={!isCompatible}
                        className={`w-full p-4 rounded-xl border transition-all text-left flex items-center gap-4 relative overflow-hidden
                          ${isCompatible
                            ? 'bg-white shadow-sm border-slate-200 hover:border-indigo-500 hover:shadow-md cursor-pointer'
                            : 'bg-slate-100 border-slate-200 opacity-40 cursor-not-allowed'
                          }`}
                      >
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-slate-100 p-2">
                          {model.imageUrl ? (
                            <img
                              src={model.imageUrl}
                              alt={model.name}
                              className="max-w-full max-h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <span className="text-3xl grayscale opacity-20">♿</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-lg sm:text-xl text-slate-900">
                            {model.name}
                          </h3>

                          {model.description && (
                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                              {model.description}
                            </p>
                          )}

                          {!isCompatible && (
                            <p className="mt-2 text-xs font-semibold text-slate-400 italic">
                              Non disponible avec le filtre sélectionné
                            </p>
                          )}
                        </div>
                      </button>
                    )})}
                    </div>
                </div>
                )}

                {step === AppStep.DETAILS_CHAT && selectedCategory && selectedSubCategory && (
                <div className="animate-fade-in pb-10">
                    <div className="flex flex-wrap items-center gap-2 mb-6 px-1 print:hidden">
                        <BreadcrumbItem label="Accueil" onClick={goToHome} /><span className="text-slate-300">/</span><BreadcrumbItem label={selectedCategory.name} onClick={goToSubCategories} /><span className="text-slate-300">/</span>
                        {selectedSubCategory.brands && selectedSubCategory.brands.length > 0 ? <><BreadcrumbItem label={selectedSubCategory.name} onClick={goToBrands} /><span className="text-slate-300">/</span></> : <BreadcrumbItem label={selectedSubCategory.name} active />}
                        {selectedBrand && <><BreadcrumbItem label={selectedBrand.name} onClick={goToModels} /><span className="text-slate-300">/</span></>}
                        {selectedModel ? <BreadcrumbItem label={selectedModel.name} active /> : !selectedBrand && selectedSubCategory && <BreadcrumbItem label="Assistant" active />}
                    </div>
                    {selectedModel && selectedModel.details ? <ProductSheet model={selectedModel} brand={selectedBrand} subCategory={selectedSubCategory} category={selectedCategory} onAddToComparison={addToComparison} isInComparison={!!comparisonList.find(m => m.id === selectedModel.id)} onShowCategoryInfo={selectedSubCategory.detailedInfo ? () => setInfoModalData({ title: selectedSubCategory.detailedInfo!.title, content: selectedSubCategory.detailedInfo!.content }) : undefined} /> : <div className="h-[calc(100vh-200px)]"><ChatInterface category={selectedCategory} subCategory={selectedSubCategory} brand={selectedBrand} model={selectedModel} /></div>}
                </div>
                )}

                {step === AppStep.COMPARISON_VIEW && (
                    <div className="animate-fade-in pb-10">
                        <div className="flex flex-wrap items-center gap-2 mb-6 px-1"><BreadcrumbItem label="Accueil" onClick={goToHome} /><span className="text-slate-300">/</span><BreadcrumbItem label="Comparateur" active /></div>
                        <ComparisonView 
                          models={comparisonList} 
                          onRemove={removeFromComparison} 
                          onClear={clearComparison} 
                          allCategories={CATEGORIES}
                          onAddModel={addToComparison}
                        />
                    </div>
                )}
            </div>
        )}

        {currentTab === MainTab.NEWS && <NewsView onNavigate={handleNewsNavigate} onContact={() => setCurrentTab(MainTab.CONTACT)} />}
        {currentTab === MainTab.ABOUT && <AboutView />}
        {currentTab === MainTab.CONTACT && <ContactView />}
        {currentTab === MainTab.LEGAL && <LegalView />}
        {currentTab === MainTab.PRIVACY && <PrivacyView />}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="bg-white/10 p-1.5 rounded-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 3h2l2 11" /><path d="M8 14h9" /><circle cx="8" cy="17" r="5" /><path d="M17 14l1.5 5" /><circle cx="18.5" cy="20" r="1.5" />
                  </svg>
                </div>
                <span className="text-white font-black tracking-tight text-lg uppercase">Assistant <span className="text-indigo-400">Ergo</span></span>
              </div>
              <p className="text-sm max-w-xs mx-auto md:mx-0">
                Le guide des ergothérapeutes pour les fauteuils roulants et VPH pris en charge (LPPR).
              </p>
              <div className="mt-4 flex items-center justify-center md:justify-start">
                <div className="inline-flex items-center bg-slate-800/90 hover:bg-slate-800 rounded-full px-3 py-1.5 text-xs border border-slate-700/80 transition-colors shadow-sm">
                  <a 
                    href="https://assistant-ergo.fr" 
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-indigo-300 hover:text-white font-medium transition-colors"
                    title="assistant-ergo.fr"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>assistant-ergo.fr</span>
                  </a>
                  
                  <span className="mx-2 text-slate-600">|</span>

                  {/* Bouton diagnostic discret */}
                  <button 
                    onClick={() => setIsAuditOpen(true)} 
                    className="p-1 text-slate-400 hover:text-indigo-300 transition-colors rounded hover:bg-slate-700/60"
                    title="Diagnostic des liens et photos"
                    aria-label="Diagnostic des liens et photos"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-6 mb-4">
                <button onClick={() => setCurrentTab(MainTab.COMPARATOR)} className="hover:text-white transition-colors text-sm font-medium">Matériel</button>
                <button onClick={() => setCurrentTab(MainTab.NEWS)} className="hover:text-white transition-colors text-sm font-medium">Actualités</button>
                <button onClick={() => setCurrentTab(MainTab.ABOUT)} className="hover:text-white transition-colors text-sm font-medium">Présentation</button>
                <button onClick={() => setCurrentTab(MainTab.CONTACT)} className="hover:text-white transition-colors text-sm font-medium">Contact</button>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
                Réforme en vigueur depuis le 1er décembre 2025
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 text-sm">
              <p className="text-slate-300 font-medium">© 2025–{new Date().getFullYear()} Assistant Ergo (assistant-ergo.fr)</p>
              <p className="text-xs">Conçu par et pour les ergothérapeutes.</p>
              <div className="flex gap-4 mt-2">
                 <button onClick={() => setCurrentTab(MainTab.LEGAL)} className="hover:text-indigo-400 transition-colors">Mentions Légales</button>
                 <button onClick={() => setCurrentTab(MainTab.PRIVACY)} className="hover:text-indigo-400 transition-colors">Confidentialité</button>
                 <button onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))} className="hover:text-indigo-400 transition-colors">Cookies</button>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-slate-800/50 text-center">
             <p className="text-[9px] text-slate-600 max-w-3xl mx-auto uppercase tracking-tighter">
                Note : Les informations fournies sur ce site sont issues des textes de la nomenclature LPPR et des documentations constructeurs. Elles n'engagent pas la responsabilité de l'éditeur en cas de litige administratif.
             </p>
          </div>
        </div>
      </footer>
      {/* Barre de navigation mobile (en bas de l'écran, avec libellés) */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 grid grid-cols-4 print:hidden" aria-label="Navigation principale">
        {([
          [MainTab.COMPARATOR, 'Matériel', 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605'],
          [MainTab.NEWS, 'Actualités', 'M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z'],
          [MainTab.ABOUT, 'Présentation', 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'],
          [MainTab.CONTACT, 'Contact', 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'],
        ] as [MainTab, string, string][]).map(([tab, label, d]) => (
          <button
            key={tab}
            onClick={() => { if (tab === MainTab.COMPARATOR && currentTab === MainTab.COMPARATOR) goToHome(); setCurrentTab(tab); }}
            aria-current={currentTab === tab ? 'page' : undefined}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium ${currentTab === tab ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
