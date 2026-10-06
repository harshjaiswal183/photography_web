import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    coverImage: '',
    duration: 'Full Day',
    startingPrice: 0,
    featuresText: '',
    status: 'active'
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/services/admin/all');
      if (res.data?.data) setServices(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      coverImage: '',
      duration: 'Full Day',
      startingPrice: 0,
      featuresText: '',
      status: 'active'
    });
    setModalOpen(true);
  };

  const openEditModal = (svc) => {
    setEditingId(svc._id);
    setFormData({
      name: svc.name,
      description: svc.description,
      coverImage: svc.coverImage,
      duration: svc.duration || 'Full Day',
      startingPrice: svc.startingPrice || 0,
      featuresText: (svc.features || []).join('\n'),
      status: svc.status || 'active'
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
        await api.put(`/services/${editingId}`, payload);
      } else {
        await api.post('/services', payload);
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service offering?')) return;
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-['Outfit']">Service Offerings</h1>
          <p className="text-xs text-slate-400 mt-1">Manage photography services, duration, and starting prices.</p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs">Loading Services...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div key={svc._id} className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between">
              <div>
                <div className="h-44 relative overflow-hidden bg-slate-100">
                  <img src={svc.coverImage} alt={svc.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-amber-700 font-bold text-xs border border-amber-500/30 shadow-sm">
                    Starting ₹{svc.startingPrice?.toLocaleString()}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-white font-['Outfit']">{svc.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{svc.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                <button
                  onClick={() => openEditModal(svc)}
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(svc._id)}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-xs text-rose-600 flex items-center gap-1"
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
          <div className="bg-white border border-white/10 w-full max-w-lg rounded-3xl p-6 space-y-6 relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white font-['Outfit']">
              {editingId ? 'Edit Service' : 'Add New Service'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Wedding Photography"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Starting Price (₹)</label>
                  <input
                    type="number"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="Full Day / 6 Hours"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description *</label>
                <textarea
                  rows="2"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Features (One feature per line)</label>
                <textarea
                  rows="3"
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  placeholder="Dual Photographer Coverage&#10;500+ Hand Edited Photos&#10;Hardcover Photobook"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 font-mono"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                Save Service Offering
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
