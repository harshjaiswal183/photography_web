import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LightboxModal from '../../components/LightboxModal';
import { Camera, Eye, MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function PortfolioPage() {
  const { getWhatsAppLink } = useSettings();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const categories = [
    'All', 'Wedding', 'Pre-Wedding', 'Couple', 'Events', 'Birthday', 'Fashion', 'Portrait', 'Corporate', 'Product', 'Other'
  ];

  useEffect(() => {
    api.get('/portfolio')
      .then(res => res.data?.data && setItems(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">Our Visual Gallery</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Portfolio & Recent Work
          </h1>
          <p className="text-slate-400 text-sm">
            Explore our curated gallery across weddings, fashion, pre-weddings, portraits and milestone events.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 font-bold'
                  : 'bg-slate-50 border border-slate-200 text-slate-300 hover:text-white hover:border-amber-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading Portfolio...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-white/10 text-slate-400">
            No portfolio images found in category "{selectedCategory}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                onClick={() => setActiveImage(item)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-white/90 backdrop-blur-md text-amber-700 border border-amber-500/30 shadow-sm">
                  <Eye className="w-4 h-4" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-200 text-[11px] font-semibold mb-1 border border-amber-400/30">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#ffffff] font-['Outfit'] group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-[#e2e8f0] line-clamp-1 mt-0.5">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Component */}
      {activeImage && (
        <LightboxModal
          image={activeImage}
          items={filteredItems}
          onClose={() => setActiveImage(null)}
          onNext={() => {
            const idx = filteredItems.findIndex(i => i._id === activeImage._id);
            setActiveImage(filteredItems[(idx + 1) % filteredItems.length]);
          }}
          onPrev={() => {
            const idx = filteredItems.findIndex(i => i._id === activeImage._id);
            setActiveImage(filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length]);
          }}
        />
      )}
    </div>
  );
}
