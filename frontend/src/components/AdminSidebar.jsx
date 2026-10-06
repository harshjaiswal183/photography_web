import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Image, Layers, Package, Star, Settings, LogOut, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { settings } = useSettings();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Leads & Enquiries', path: '/admin/leads', icon: Users },
    { name: 'Portfolio Gallery', path: '/admin/portfolio', icon: Image },
    { name: 'Services', path: '/admin/services', icon: Layers },
    { name: 'Packages', path: '/admin/packages', icon: Package },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-white/10 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
              <Camera className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base font-['Outfit'] block leading-none">
                {settings.businessName || 'LENSCRAFT'}
              </span>
              <span className="text-[10px] text-amber-600 font-semibold tracking-wider uppercase block mt-0.5">
                ADMIN PANEL
              </span>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 mx-3 my-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-400 uppercase font-semibold">Logged in as</div>
          <div className="text-sm font-bold text-white font-['Outfit']">{user?.name || 'Administrator'}</div>
          <div className="text-xs text-slate-400 truncate">{user?.email || 'admin@lenscraft.com'}</div>
        </div>

        {/* Nav Links */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 font-semibold text-xs uppercase tracking-wider transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
