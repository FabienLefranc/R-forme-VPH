
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Category, SubCategory, Brand, Model, Message } from '../types';

interface ChatInterfaceProps {
  category: Category;
  subCategory: SubCategory;
  brand: Brand | null;
  model?: Model | null;
}

export function ChatInterface({ category, subCategory, brand, model }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `Bonjour. Je suis votre assistant pour ${model ? `le modèle **${model.name}**` : `la classe **${subCategory.name}**`}${brand && !model ? ` de la marque **${brand.name}**` : ''} (${subCategory.description}) dans le cadre de la nouvelle réforme. Je peux vous aider sur les critères d'éligibilité, les montants de remboursement ou les démarches administratives. Quelle est votre question ?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        Tu es un assistant expert pour les ergothérapeutes français.
        Le contexte est la "Réforme des fauteuils roulants" entrée en vigueur le 1er décembre 2025 en France.
        La catégorie sélectionnée est : ${category.name}.
        La sous-catégorie spécifique est : ${subCategory.name} (${subCategory.description}).
        ${brand ? `La marque spécifique concernée est : ${brand.name}.` : ''}
        ${model ? `Le modèle précis en cours de consultation est : ${model.name}.` : ''}
        
        Ton rôle est d'aider l'ergothérapeute à :
        1. Vérifier les critères techniques et médicaux pour ce type de fauteuil.
        2. Expliquer les nouvelles bases de remboursement (LPPR) spécifiquement pour cette catégorie${model ? ` et ce modèle (${model.name})` : (brand ? ` et si possible pour les modèles de la marque ${brand.name}` : '')}.
        3. Conseiller sur le choix en fonction des besoins du patient.
        
        Sois précis, professionnel, et concis. Utilise un formatage Markdown pour la clarté (listes à puces, gras).
        Si tu ne connais pas une spécificité très pointue de la réforme ou un modèle précis de la marque, invite l'utilisateur à vérifier le texte officiel ou la fiche technique constructeur, mais essaie de répondre au mieux avec tes connaissances générales sur la réforme 2024 et la nomenclature LPPR.
      `;

      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            ...history,
            { role: 'user', parts: [{ text: userMessage }]}
        ],
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const responseText = response.text || "Désolé, je n'ai pas pu générer de réponse.";

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Une erreur est survenue lors de la communication avec l'IA. Veuillez vérifier votre clé API ou réessayer plus tard." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header specific to Chat */}
      {model && (
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
             </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">{model.name}</h3>
            <p className="text-xs text-slate-500">{brand?.name} - {subCategory.name}</p>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
              }`}
            >
              {msg.role === 'model' ? (
                <div className="prose prose-sm max-w-none text-slate-800" dangerouslySetInnerHTML={{ 
                  __html: msg.text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br/>')
                    .replace(/- (.*?)(\n|<br\/>|$)/g, '• $1<br/>') 
                }} />
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleSubmit} className="relative flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Question sur ${model ? model.name : subCategory.name}...`}
            className="flex-1 pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
        <div className="text-center mt-2">
           <p className="text-[10px] text-slate-400">L'IA peut faire des erreurs. Vérifiez les informations officielles.</p>
        </div>
      </div>
    </div>
  );
}
