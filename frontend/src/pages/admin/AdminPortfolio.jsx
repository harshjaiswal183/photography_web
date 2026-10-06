import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Check, Star, X, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';

export default function AdminPortfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Wedding',
    imageUrl: '',
    description: '',
    displayOrder: 0,
    featured: false,
    status: 'published'
  });
  const [editingId, setEditingId] = useState(null);

  const categories = ['Wedding', 'Pre-Wedding', 'Couple', 'Events', 'Birthday', 'Fashion', 'Portrait', 'Corporate', 'Product', 'Other'];

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get('/portfolio/admin/all');
      if (res.data?.data) setItems(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Wedding',
      imageUrl: '',
      description: '',
      displayOrder: 0,
      featured: false,
      status: 'published'
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
      description: item.description || '',
      displayOrder: item.displayOrder || 0,
      featured: item.featured || false,
      status: item.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/portfolio/${editingId}`, formData);
      } else {
        await api.post('/portfolio', formData);
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this portfolio item?')) return;
    try {
      await api.delete(`/portfolio/${id}`);
      fetchItems();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-['Outfit']">Portfolio Management</h1>
          <p className="text-xs text-slate-400 mt-1">Upload & organize portfolio gallery photos across categories.</p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Portfolio Shot</span>
        </button>
      </div>

      {/* Gallery Cards */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs">Loading Gallery...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item._id} className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                {item.featured && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase flex items-center gap-1 shadow">
                    <Star className="w-3 h-3 fill-slate-950" /> Featured
                  </span>
                )}
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-white/90 text-amber-700 text-[10px] font-semibold border border-amber-500/30 shadow-sm">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="font-bold text-white text-sm font-['Outfit'] truncate">{item.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-1">{item.description || 'No description'}</p>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-white/5 mt-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-xs text-rose-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-white border border-white/10 w-full max-w-lg rounded-3xl p-6 space-y-6 relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white font-['Outfit']">
              {editingId ? 'Edit Portfolio Shot' : 'Add New Portfolio Shot'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Shot Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Sunset Royal Vows"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image URL (Unsplash or Cloudinary) *</label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short description..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
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
                  <span>Mark as Featured Home Shot</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                Save Portfolio Item
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
