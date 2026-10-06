import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminSidebar from './components/AdminSidebar';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import PortfolioPage from './pages/public/PortfolioPage';
import ServicesPage from './pages/public/ServicesPage';
import PackagesPage from './pages/public/PackagesPage';
import TestimonialsPage from './pages/public/TestimonialsPage';
import ContactPage from './pages/public/ContactPage';
import EnquiryPage from './pages/public/EnquiryPage';
import PrivacyPage from './pages/public/PrivacyPage';
import TermsPage from './pages/public/TermsPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLeads from './pages/admin/AdminLeads';
import AdminPortfolio from './pages/admin/AdminPortfolio';
import AdminServices from './pages/admin/AdminServices';
import AdminPackages from './pages/admin/AdminPackages';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminSettings from './pages/admin/AdminSettings';

// Public Layout Wrapper
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-100">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

// Protected Admin Route Component
function ProtectedAdminLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-amber-600 text-sm font-semibold">
        Verifying Admin Authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto min-h-screen pb-16">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            
            {/* Public Customer Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio font-['Outfit']" element={<PortfolioPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/enquiry font-['Outfit']" element={<EnquiryPage />} />
              <Route path="/enquiry" element={<EnquiryPage />} />
              <Route path="/privacy-policy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
            </Route>

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Dashboard & Management Routes */}
            <Route element={<ProtectedAdminLayout />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/leads" element={<AdminLeads />} />
              <Route path="/admin/portfolio" element={<AdminPortfolio />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/packages" element={<AdminPackages />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>

            {/* Fallback Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </AuthProvider>
  );
}
