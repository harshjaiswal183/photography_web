import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { CheckCircle2, MessageCircle, Send } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import EnquiryModal from '../../components/EnquiryModal';

export default function PackagesPage() {
  const { getWhatsAppLink } = useSettings();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState('Wedding Photography');

  useEffect(() => {
    api.get('/packages')
      .then(res => res.data?.data && setPackages(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openEnquiry = (name) => {
    setSelectedPkg(name);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">Pricing & Packages</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Investment Packages
          </h1>
          <p className="text-slate-400 text-sm">
            Tailored photography packages designed for unmatched luxury storytelling and value.
          </p>
        </div>

        {/* Packages Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading Packages...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className={`relative rounded-3xl p-8 border flex flex-col justify-between transition-all ${
                  pkg.featured
                    ? 'bg-gradient-to-b from-white to-slate-50 border-amber-500 shadow-2xl ring-2 ring-amber-500/30'
                    : 'bg-white border-white/10'
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-widest shadow-md">
                    Most Popular Choice
                  </span>
                )}

                <div>
                  <span className="text-xs text-amber-600 font-semibold uppercase">{pkg.service}</span>
                  <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-1">{pkg.name}</h2>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{pkg.description}</p>

                  <div className="my-6 py-4 border-y border-white/10">
                    {pkg.priceVisibility === 'show' && (
                      <div className="text-3xl font-extrabold text-white font-['Outfit']">
                        ₹{pkg.price.toLocaleString()}
                      </div>
                    )}
                    {pkg.priceVisibility === 'starting_from' && (
                      <div>
                        <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Starting From</span>
                        <div className="text-3xl font-extrabold text-amber-600 font-['Outfit'] mt-0.5">
                          ₹{pkg.price.toLocaleString()}
                        </div>
                      </div>
                    )}
                    {pkg.priceVisibility === 'hide' && (
                      <div className="text-xl font-bold text-amber-700 font-['Outfit']">
                        Custom Quote Requested
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">Package Features:</span>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {pkg.features?.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 flex flex-col gap-2.5">
                  <button
                    onClick={() => openEnquiry(pkg.name)}
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                      pkg.featured
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {pkg.priceVisibility === 'hide' ? 'Request Custom Quote' : 'Get Quote'}
                  </button>

                  <a
                    href={getWhatsAppLink(`Hi, I would like to inquire about the "${pkg.name}" package.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-600 hover:bg-emerald-600/30 font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Quote</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedPkg}
      />
    </div>
  );
}
