import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function FloatingWhatsApp() {
  const { getWhatsAppLink } = useSettings();
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = getWhatsAppLink();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end group">
      {/* Tooltip */}
      {showTooltip && (
        <div className="relative mb-2 hidden sm:flex items-center gap-2 bg-white text-slate-900 text-xs py-2 px-3.5 rounded-full border border-emerald-500/30 shadow-xl backdrop-blur-md transition-all animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Chat on WhatsApp</span>
          <button 
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            className="ml-1 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-emerald-500/20 hover:ring-emerald-400/40"
      >
        <MessageCircle className="w-7 h-7 fill-white/10" />
        
        {/* Pulse Effect */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none"></span>
      </a>
    </div>
  );
}
