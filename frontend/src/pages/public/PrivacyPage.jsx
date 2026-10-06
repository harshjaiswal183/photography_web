import React from 'react';
import { useSettings } from '../../context/SettingsContext';

export default function PrivacyPage() {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen bg-white text-slate-100 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-white font-['Outfit']">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            At {settings.businessName}, we respect your privacy and are committed to protecting any personal data you share with us through our website.
          </p>
          <h2 className="text-lg font-bold text-white font-['Outfit']">Information We Collect</h2>
          <p>
            When you submit an enquiry or contact us via WhatsApp, we collect details such as your name, phone number, email address, event date, venue location, and specific shoot requirements.
          </p>
          <h2 className="text-lg font-bold text-white font-['Outfit']">How We Use Your Data</h2>
          <p>
            Your information is strictly used to provide quotes, communicate about your bookings, coordinate photography schedules, and send gallery updates. We never sell or share your data with unauthorized third parties.
          </p>
        </div>
      </div>
    </div>
  );
}
