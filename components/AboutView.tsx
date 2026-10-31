
import React from 'react';

export function AboutView() {
  // CONFIGURATION DE LA PHOTO DE PROFIL
  const profileImage = "https://i.ibb.co/tTY38jbb/1758364079357.jpg";
  
  // Image de secours si le fichier n'est pas trouvé (Initiales)
  const fallbackImage = "https://ui-avatars.com/api/?name=Fabien+Lefranc&background=0D8ABC&color=fff&size=256&font-size=0.33";

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900 relative">
          <div className="absolute -bottom-16 left-8 p-1 bg-white rounded-full">
            <img 
              src={profileImage}
              alt="Fabien Lefranc" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-slate-200"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />
          </div>
        </div>
        
        <div className="pt-20 px-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Fabien Lefranc</h1>
              <p className="text-slate-500 font-medium">Ergothérapeute - Fondateur de ce site</p>
            </div>
            <a 
              href="https://www.linkedin.com/in/fabien-lefranc-b67482233/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Me suivre sur LinkedIn
            </a>
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              Bienvenue sur cet outil. Je suis ergothérapeute spécialisé dans l'accompagnement de personnes en situation d'handicap physique et dans leur mobilité au quotidien. 
              Face à la complexité de la nouvelle réforme de financement des fauteuils roulants, j'ai souhaité créer un outil simple et efficace pour aider mes confrères ergothérapeutes et autres.
            </p>
            
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-xl">🎯</span> Raison d'être du site
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  Centraliser les informations de la LPPR et les spécificités techniques.
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  Faciliter la comparaison entre les modèles pour une préconisation objective.
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  Gagner du temps sur la partie administrative grâce à l'assistance IA.
                </li>
              </ul>
            </div>

            <p>
              Cet outil est en constante évolution. N'hésitez pas à me faire part de vos retours via la page Contact pour l'améliorer ensemble.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
