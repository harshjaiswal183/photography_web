import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const SettingsContext = createContext(null);

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    photographerName: 'Aarav Sharma',
    businessName: 'LensCraft Studios',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    email: 'hello@lenscraftstudios.com',
    address: 'Studio 402, Creative Hub, Bandra West',
    city: 'Mumbai, Maharashtra',
    instagram: 'https://instagram.com/lenscraft_studios',
    facebook: 'https://facebook.com/lenscraftstudios',
    youtube: 'https://youtube.com/@lenscraftstudios',
    whatsappDefaultMsg: 'Hi, I found your photography website and would like to know more about your photography services.',
    heroHeadline: 'Capturing Moments That Last Forever',
    heroSubheading: 'Professional luxury photography for weddings, pre-weddings, fashion, portraits, and grand celebrations.',
    aboutBio: 'Over a decade of crafting visual stories with emotion, light, and timeless artistry.',
    aboutExperience: '10+ Years',
    seoTitle: 'LensCraft Studios | Premium Wedding & Event Photographer',
    seoDescription: 'Best wedding, pre-wedding, fashion and event photographer. Book your shoot today!'
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      if (res.data && res.data.data) {
        setSettings(res.data.data);
      }
    } catch (error) {
      console.warn('Using default fallback settings:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const getWhatsAppLink = (customMsg = '') => {
    const cleanNum = (settings.whatsapp || '919876543210').replace(/[^0-9]/g, '');
    const msg = customMsg || settings.whatsappDefaultMsg || 'Hi, I would like to enquire about your photography services.';
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, fetchSettings, getWhatsAppLink }}>
      {children}
    </SettingsContext.Provider>
  );
}
