import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { CheckCircle2, Clock, Send, MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import EnquiryModal from '../../components/EnquiryModal';

export default function ServicesPage() {
  const { getWhatsAppLink } = useSettings();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    api.get('/services')
      .then(res => res.data?.data && setServices(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openEnquiry = (name) => {
    setSelectedService(name);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">Specialized Offerings</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Photography Services
          </h1>
          <p className="text-slate-400 text-sm">
            Professional full-day coverage, cinematic video, pre-wedding storytelling, and commercial shoot packages.
          </p>
        </div>

        {/* Services List Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading Services...</div>
        ) : (
          <div className="space-y-12">
            {services.map((svc, index) => (
              <div
                key={svc._id}
                className={`glass-card rounded-3xl overflow-hidden border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-6 rounded-2xl overflow-hidden relative h-64 sm:h-80 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img
                    src={svc.coverImage}
                    alt={svc.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  {svc.duration && (
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 text-slate-700 text-xs flex items-center gap-1.5 border border-slate-200 shadow-sm">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{svc.duration}</span>
                    </span>
                  )}
                </div>

                <div className={`lg:col-span-6 space-y-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">{svc.name}</h2>
                    {svc.startingPrice > 0 && (
                      <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold border border-amber-500/30 whitespace-nowrap">
                        Starting ₹{svc.startingPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">{svc.description}</p>

                  {svc.features?.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">What's Included:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {svc.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      onClick={() => openEnquiry(svc.name)}
                      className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
                    >
                      Enquire Now
                    </button>
                    <a
                      href={getWhatsAppLink(`Hi, I'm interested in your ${svc.name} service. Please share availability & rates.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-600 font-semibold text-xs uppercase tracking-wider flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Rates</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedService}
      />
    </div>
  );
}
