import React from 'react';
import { useSettings } from '../../context/SettingsContext';

export default function TermsPage() {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen bg-white text-slate-100 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-white font-['Outfit']">Terms & Conditions</h1>
        <p className="text-xs text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            Welcome to {settings.businessName}. By booking a shoot or submitting an enquiry on our site, you agree to the following terms and conditions.
          </p>
          <h2 className="text-lg font-bold text-white font-['Outfit']">1. Booking & Retainers</h2>
          <p>
            Event dates are reserved upon mutual confirmation and receipt of the advance booking retainer. Retainers hold the photographer's exclusive availability for your date.
          </p>
          <h2 className="text-lg font-bold text-white font-['Outfit']">2. Copyright & Intellectual Property</h2>
          <p>
            All photographs, videos, and artistic edits remain the intellectual property of {settings.photographerName} / {settings.businessName}. Clients receive personal printing and display rights.
          </p>
        </div>
      </div>
    </div>
  );
}
