import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Award, MapPin, CheckCircle2, MessageCircle, Calendar } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function About() {
  const { settings, getWhatsAppLink } = useSettings();

  return (
    <div className="min-h-screen bg-white text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">Behind The Lens</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            About {settings.photographerName || 'Aarav Sharma'}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Capturing timeless memories, intimate laughter, and majestic visual grandiosity.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80"
                alt={settings.photographerName}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-xl backdrop-blur-md text-center">
              <span className="text-amber-700 font-bold text-lg font-['Outfit'] block">{settings.businessName}</span>
              <span className="text-xs text-slate-600">Based in {settings.city}</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-semibold uppercase tracking-wider border border-amber-500/20">
              {settings.aboutExperience || '10+ Years Experience'}
            </div>
            <h2 className="text-3xl font-bold text-white font-['Outfit']">
              Photography Philosophy: Emotion, Authenticity & Precision
            </h2>
            <p className="text-slate-300 leading-relaxed">
              {settings.aboutBio || 'Over a decade of crafting visual stories with emotion, light, and timeless artistry.'}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              My approach blends documentary candid storytelling with high-fashion editorial aesthetics. I believe every photograph should evoke the exact feeling of the moment it was taken—the nervous excitement of vows, the joy of family celebrations, and the elegance of quiet glances.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10">
              <div>
                <span className="text-xs text-slate-400 uppercase">Location</span>
                <p className="text-sm font-semibold text-white mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{settings.city || 'Mumbai, India'}</span>
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase">Specialization</span>
                <p className="text-sm font-semibold text-white mt-1 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span>Weddings & Portraits</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/enquiry"
                className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
              >
                Work With Me
              </Link>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full bg-emerald-600/20 border border-emerald-500/30 text-emerald-600 font-semibold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Equipment & Process Badges */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-white font-['Outfit']">Our Creative Standards</h3>
            <p className="text-xs text-slate-400">Why our studio consistently delivers industry-leading image quality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-white/10 space-y-2 shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-amber-600" />
              <h4 className="text-base font-bold text-white font-['Outfit']">Sony Full-Frame Cinema Rigs</h4>
              <p className="text-xs text-slate-400">Crisp low-light performance with G-Master prime lenses for silky bokeh.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-white/10 space-y-2 shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-amber-600" />
              <h4 className="text-base font-bold text-white font-['Outfit']">Dual Memory Backup</h4>
              <p className="text-xs text-slate-400">Zero risk data safety with real-time dual card slot recording.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-white/10 space-y-2 shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-amber-600" />
              <h4 className="text-base font-bold text-white font-['Outfit']">Handcrafted Color Grading</h4>
              <p className="text-xs text-slate-400">Custom artistic signature LUTs tailored specifically for Indian skin tones.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
