
import React, { useState } from 'react';

export function ContactView() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    email: '',
    subject: 'Question générale',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setStatus('sending');

    try {
      // Utilisation de l'ID Formspree fourni : xvzgagav
      const FORMSPREE_ID = "xvzgagav"; 
      
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ email: '', subject: 'Question générale', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto p-6 animate-fade-in text-center py-20">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 flex flex-col items-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <p className="text-slate-600 mb-8 text-lg leading-relaxed font-medium">
            Merci pour votre retour. Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md active:scale-95"
          >
            Retour au formulaire
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Contact</h2>
        <p className="text-slate-500">
          Une suggestion ? Un bug ? Ou simplement envie d'échanger sur la réforme ?
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'error' && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
              Désolé, une erreur est survenue lors de l'envoi. Veuillez réessayer ou utiliser l'adresse email directe ci-dessous.
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Votre Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="ergo@exemple.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Sujet</label>
              <select 
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                <option>Question générale</option>
                <option>Demande de fonctionnalité</option>
                <option>Signaler une erreur</option>
                <option>Partenariat</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea 
              id="message" 
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
              placeholder="Votre message ici..."
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
             <a 
                href="mailto:contact.assistant.ergo@gmail.com" 
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
             >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                contact.assistant.ergo@gmail.com
             </a>
             <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full sm:w-auto px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-black transition-all shadow-md active:scale-95 disabled:bg-slate-400 disabled:scale-100 flex items-center justify-center gap-2"
             >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Envoi en cours...
                  </>
                ) : 'Envoyer le message'}
             </button>
          </div>
        </form>
      </div>

      <div className="mt-8 text-center text-xs text-slate-400">
        <p>Généralement traité sous 48h ouvrées.</p>
      </div>
    </div>
  );
}
