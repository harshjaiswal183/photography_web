import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Star, Quote, MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function TestimonialsPage() {
  const { getWhatsAppLink } = useSettings();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/testimonials')
      .then(res => res.data?.data && setReviews(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">Client Feedback</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Client Testimonials & Reviews
          </h1>
          <p className="text-slate-400 text-sm">
            Read what couples, families, and brands say about working with LensCraft Studios.
          </p>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading Testimonials...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((item) => (
              <div
                key={item._id}
                className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 relative"
              >
                <Quote className="w-10 h-10 text-amber-600/20 absolute top-6 right-6 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex text-amber-600">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 italic leading-relaxed">
                    "{item.review}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  {item.avatar ? (
                    <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover border border-amber-500/30" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-700 font-bold flex items-center justify-center font-['Outfit'] border border-amber-500/30">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-white font-['Outfit']">{item.name}</h3>
                    <span className="text-xs text-amber-600/90 font-medium block">{item.service}</span>
                    <span className="text-[11px] text-slate-500 block">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
