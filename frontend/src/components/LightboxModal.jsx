import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function LightboxModal({ image, items = [], onClose, onNext, onPrev }) {
  const { getWhatsAppLink } = useSettings();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!image) return null;

  const currentMsg = `Hi, I saw your "${image.title}" (${image.category}) in your portfolio and would like to inquire about booking a shoot!`;
  const whatsappUrl = getWhatsAppLink(currentMsg);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 animate-fadeIn">
      {/* Top Bar Actions */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Book This Style</span>
        </a>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-900 transition-colors border border-slate-200 shadow-lg"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Buttons */}
      {items.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/90 hover:bg-amber-400 hover:text-black text-slate-900 border border-slate-200 shadow-lg transition-all"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/90 hover:bg-amber-400 hover:text-black text-slate-900 border border-slate-200 shadow-lg transition-all"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Image & Details Container */}
      <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center">
        <div className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl max-h-[75vh]">
          <img
            src={image.imageUrl}
            alt={image.title}
            className="max-h-[75vh] w-auto max-w-full object-contain mx-auto select-none"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1.5 border border-amber-400/20">
            {image.category}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#ffffff] font-['Outfit']">
            {image.title}
          </h3>
          {image.description && (
            <p className="text-sm text-[#cbd5e1] mt-1">{image.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
