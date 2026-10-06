import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';
import { useSettings } from '../../context/SettingsContext';

export default function AdminSettings() {
  const { fetchSettings } = useSettings();
  const [formData, setFormData] = useState({
    photographerName: '',
    businessName: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    instagram: '',
    facebook: '',
    youtube: '',
    whatsappDefaultMsg: '',
    heroHeadline: '',
    heroSubheading: '',
    aboutBio: '',
    aboutExperience: '',
    seoTitle: '',
    seoDescription: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api.get('/settings')
      .then(res => {
        if (res.data?.data) {
          setFormData(res.data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/settings', formData);
      if (res.data?.status === 'success') {
        setSuccess(true);
        fetchSettings(); // Refresh global settings context
      }
    } catch (err) {
      alert('Failed to update website settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 text-xs">Loading Settings...</div>;
  }

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-['Outfit']">Website Settings</h1>
          <p className="text-xs text-slate-400 mt-1">Configure business profile, WhatsApp integrations, and SEO metadata.</p>
        </div>

        {success && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 text-xs font-bold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved Live!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 text-xs">
        
        {/* 1. Business Info */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-amber-600 font-['Outfit'] border-b border-white/10 pb-2">
            1. Business Profile Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Photographer Name</label>
              <input
                type="text"
                name="photographerName"
                value={formData.photographerName}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Business / Studio Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">City / Region</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Studio Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* 2. WhatsApp Settings */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-emerald-600 font-['Outfit'] border-b border-white/10 pb-2">
            2. WhatsApp Integration & Lead Settings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">WhatsApp Number (with Country Code)</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="919876543210"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 font-mono"
              />
              <span className="text-[10px] text-slate-400">Format: 919876543210 (without + symbol)</span>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Pre-filled WhatsApp Lead Message</label>
              <textarea
                rows="2"
                name="whatsappDefaultMsg"
                value={formData.whatsappDefaultMsg}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>
          </div>
        </div>

        {/* 3. Hero & About Settings */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-amber-600 font-['Outfit'] border-b border-white/10 pb-2">
            3. Homepage & Bio Content
          </h2>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Hero Main Headline</label>
            <input
              type="text"
              name="heroHeadline"
              value={formData.heroHeadline}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Hero Subheading</label>
            <input
              type="text"
              name="heroSubheading"
              value={formData.heroSubheading}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">About Biography Text</label>
            <textarea
              rows="3"
              name="aboutBio"
              value={formData.aboutBio}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
            ></textarea>
          </div>
        </div>

        {/* 4. Social Links & SEO */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-amber-600 font-['Outfit'] border-b border-white/10 pb-2">
            4. Social Media & SEO Optimization
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Facebook URL</label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">YouTube URL</label>
              <input
                type="url"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">SEO Title Tag</label>
            <input
              type="text"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">SEO Meta Description</label>
            <textarea
              rows="2"
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 transition-all"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? 'Saving Settings...' : 'Save All Website Settings'}</span>
        </button>

      </form>
    </div>
  );
}
