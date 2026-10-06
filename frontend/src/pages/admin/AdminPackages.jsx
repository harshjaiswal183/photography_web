import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    service: 'Wedding Photography',
    description: '',
    price: 0,
    priceVisibility: 'starting_from',
    featured: false,
    featuresText: '',
    status: 'active'
  });

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await api.get('/packages/admin/all');
      if (res.data?.data) setPackages(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      service: 'Wedding Photography',
      description: '',
      price: 0,
      priceVisibility: 'starting_from',
      featured: false,
      featuresText: '',
      status: 'active'
    });
    setModalOpen(true);
  };

  const openEditModal = (pkg) => {
    setEditingId(pkg._id);
    setFormData({
      name: pkg.name,
      service: pkg.service || 'Wedding Photography',
      description: pkg.description || '',
      price: pkg.price || 0,
      priceVisibility: pkg.priceVisibility || 'starting_from',
      featured: pkg.featured || false,
      featuresText: (pkg.features || []).join('\n'),
      status: pkg.status || 'active'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.featuresText.split('\n').filter(f => f.trim())
    };

    try {
      if (editingId) {
        await api.put(`/packages/${editingId}`, payload);
      } else {
        await api.post('/packages', payload);
      }
      setModalOpen(false);
      fetchPackages();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this package?')) return;
    try {
      await api.delete(`/packages/${id}`);
      fetchPackages();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-['Outfit']">Pricing Packages</h1>
          <p className="text-xs text-slate-400 mt-1">Configure investment tiers, features, and price display options.</p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs">Loading Packages...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg._id} className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs text-amber-600 font-semibold uppercase">{pkg.service}</span>
                <h3 className="text-xl font-bold text-white font-['Outfit'] mt-1">{pkg.name}</h3>
                <div className="text-xl font-extrabold text-white font-['Outfit'] my-2">
                  {pkg.priceVisibility === 'show' && `₹${pkg.price.toLocaleString()}`}
                  {pkg.priceVisibility === 'starting_from' && `Starting ₹${pkg.price.toLocaleString()}`}
                  {pkg.priceVisibility === 'hide' && `Price Hidden (Get Quote)`}
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300">
                  {pkg.features?.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => openEditModal(pkg)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-xs text-rose-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-white border border-white/10 w-full max-w-lg rounded-3xl p-6 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white font-['Outfit']">
              {editingId ? 'Edit Package' : 'Add New Package'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Package Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Royal Wedding Package"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Service Tag</label>
                  <input
                    type="text"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Price Visibility Setting</label>
                <select
                  value={formData.priceVisibility}
                  onChange={(e) => setFormData({ ...formData, priceVisibility: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="starting_from">Show "Starting From ₹XX,XXX"</option>
                  <option value="show">Show Exact Price "₹XX,XXX"</option>
                  <option value="hide">Hide Price (Show "Get Quote" only)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Package Features List (One per line)</label>
                <textarea
                  rows="4"
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  placeholder="2 Lead Photographers&#10;Full Day Coverage&#10;Edited Photos & Album"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 font-mono"
                ></textarea>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-amber-600 w-4 h-4"
                  />
                  <span>Highlight as "Most Popular"</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                Save Package
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
