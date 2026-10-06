import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Phone, Mail, MapPin, ShieldCheck, Share2, Globe, Video } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

// Clean Social SVG Icons
const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.714 5H18V0h-3.808C10.598 0 9 1.582 9 4.615V8z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Footer() {
  const { settings, getWhatsAppLink } = useSettings();

  return (
    <footer className="bg-slate-50 border-t border-white/10 text-slate-400 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold">
                <Camera className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white font-['Outfit'] tracking-tight">
                {settings.businessName || 'LENSCRAFT'}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              {settings.aboutBio || 'Professional photography tailored for weddings, pre-weddings, portraits and high-profile events. Capturing timeless memories with artistic excellence.'}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-300 hover:text-amber-600 hover:border-amber-500/40 transition-colors">
                  <InstagramIcon />
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-300 hover:text-amber-600 hover:border-amber-500/40 transition-colors">
                  <FacebookIcon />
                </a>
              )}
              {settings.youtube && (
                <a href={settings.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-300 hover:text-amber-600 hover:border-amber-500/40 transition-colors">
                  <YoutubeIcon />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider uppercase font-['Outfit'] text-xs text-amber-600">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-amber-700 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-700 transition-colors">About Photographer</Link></li>
              <li><Link to="/portfolio" className="hover:text-amber-700 transition-colors">Portfolio / Gallery</Link></li>
              <li><Link to="/services" className="hover:text-amber-700 transition-colors">Services Offered</Link></li>
              <li><Link to="/packages" className="hover:text-amber-700 transition-colors">Pricing Packages</Link></li>
              <li><Link to="/testimonials" className="hover:text-amber-700 transition-colors">Client Reviews</Link></li>
              <li><Link to="/enquiry" className="hover:text-amber-700 transition-colors">Book a Shoot / Enquiry</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider uppercase font-['Outfit'] text-xs text-amber-600">
              Direct Contact
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">{settings.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                <span>{settings.address}, {settings.city}</span>
              </li>
            </ul>
          </div>

          {/* Lead Callout */}
          <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="inline-block px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 text-xs font-semibold mb-3 border border-amber-500/20">
                Ready for your shoot?
              </span>
              <h4 className="text-white font-bold text-lg font-['Outfit']">Let's Create Visual Art</h4>
              <p className="text-xs text-slate-400 mt-1">Get an instant quote & date availability confirmation directly on WhatsApp.</p>
            </div>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-lg shadow-emerald-500/20"
            >
              Chat on WhatsApp
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-900">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-900">Terms & Conditions</Link>
            <Link to="/admin/login" className="flex items-center gap-1 text-slate-400 hover:text-amber-600 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
