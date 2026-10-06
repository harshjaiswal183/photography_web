import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Calendar, MessageCircle, Star, ArrowRight, CheckCircle2, Award, Zap, Heart, Shield, Sparkles } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import api from '../../services/api';
import LightboxModal from '../../components/LightboxModal';
import EnquiryModal from '../../components/EnquiryModal';

export default function Home() {
  const { settings, getWhatsAppLink } = useSettings();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState('Wedding Photography');

  // Inline Enquiry Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    email: '',
    city: '',
    service: 'Wedding Photography',
    eventDate: '',
    eventLocation: '',
    guestCount: '',
    budget: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // Fetch Homepage Data
    api.get('/portfolio?featured=true').then(res => res.data?.data && setPortfolioItems(res.data.data)).catch(() => {});
    api.get('/services').then(res => res.data?.data && setServices(res.data.data)).catch(() => {});
    api.get('/packages').then(res => res.data?.data && setPackages(res.data.data)).catch(() => {});
    api.get('/testimonials').then(res => res.data?.data && setTestimonials(res.data.data)).catch(() => {});
  }, []);

  const filteredPortfolio = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name.trim() || leadForm.name.length < 2) {
      setFormError('Please enter your full name (min 2 characters).');
      return;
    }
    if (!leadForm.mobile.trim() || leadForm.mobile.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setFormSubmitting(true);
    setFormError('');
    try {
      const res = await api.post('/leads', { ...leadForm, source: 'Website Home Form' });
      if (res.data && res.data.status === 'success') {
        setFormSuccess(true);
      }
    } catch (err) {
      setFormError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const openEnquiry = (serviceName) => {
    setSelectedServiceForModal(serviceName || 'Wedding Photography');
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-100">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with Light Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90"
            alt="Photography Hero"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-semibold uppercase tracking-widest backdrop-blur-md animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Award Winning Visual Storyteller</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight leading-[1.1]">
            {settings.heroHeadline || 'Capturing Moments That Last Forever'}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            {settings.heroSubheading || 'Professional photography for weddings, events, couples, portraits and special occasions.'}
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/enquiry"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5"
            >
              Book a Shoot
            </Link>

            <Link
              to="/portfolio"
              className="px-8 py-4 rounded-full bg-white/85 hover:bg-slate-50 text-slate-900 font-semibold text-sm uppercase tracking-wider border border-slate-200 shadow-lg backdrop-blur-md transition-all"
            >
              View Our Work
            </Link>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 rounded-full bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 font-semibold text-sm uppercase tracking-wider border border-emerald-600/30 backdrop-blur-md flex items-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-400/20" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>

      {/* QUICK STATS METRICS BAR */}
      <section className="border-y border-white/10 bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-['Outfit']">500+</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Events Covered</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-['Outfit']">10+</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-['Outfit']">100%</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-['Outfit']">4.9 ★</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Customer Rating</div>
          </div>
        </div>
      </section>

      {/* ABOUT PHOTOGRAPHER SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                alt="Photographer Profile"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 z-20 bg-white border border-amber-500/30 p-4 rounded-xl shadow-2xl hidden sm:block">
              <span className="text-2xl font-bold text-amber-600 font-['Outfit'] block">{settings.photographerName}</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">Lead Photographer</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">About The Artist</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit']">
              Crafting Visual Stories with Emotion & Timeless Artistry
            </h2>
            <p className="text-slate-300 leading-relaxed">
              {settings.aboutBio || 'Over a decade of crafting visual stories with emotion, light, and timeless artistry.'}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every shoot is a collaborative journey. Whether it's a grand royal wedding, an intimate pre-wedding shoot, or a fashion portfolio, I capture authenticity, spontaneous laughter, and deep human connection.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="px-6 py-3 rounded-full bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20"
              >
                Work With Me
              </Link>
              <Link
                to="/portfolio"
                className="px-6 py-3 rounded-full border border-white/20 text-slate-300 hover:text-white hover:border-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Explore Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE */}
      <section className="py-20 bg-slate-50 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">Our Portfolio</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit'] mt-1">Featured Work</h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Wedding', 'Pre-Wedding', 'Couple', 'Fashion', 'Events'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-50 border border-slate-200 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.slice(0, 6).map((item) => (
              <div
                key={item._id}
                onClick={() => setLightboxImage(item)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-200 text-[11px] font-semibold mb-1 border border-amber-400/30">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#ffffff] font-['Outfit'] group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-amber-500/40 text-amber-700 hover:bg-amber-400 hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">What We Do</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit'] mt-1">
            Photography & Video Services
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Tailored visual storytelling solutions for every special milestone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc._id}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between hover:border-amber-500/30 transition-all"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img src={svc.coverImage} alt={svc.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>
                  {svc.startingPrice > 0 && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-amber-700 font-bold text-xs border border-amber-500/30 shadow-sm">
                      Starting ₹{svc.startingPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-white font-['Outfit']">{svc.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{svc.description}</p>
                  
                  {svc.features?.length > 0 && (
                    <ul className="pt-2 space-y-1.5 text-xs text-slate-300">
                      {svc.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => openEnquiry(svc.name)}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section className="py-20 bg-slate-50 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">Investment</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit'] mt-1">
              Curated Pricing Packages
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Transparent, premium packages tailored to your vision and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className={`relative rounded-2xl p-8 border flex flex-col justify-between transition-all ${
                  pkg.featured
                    ? 'bg-gradient-to-b from-white to-slate-50 border-amber-500 shadow-2xl ring-2 ring-amber-500/30'
                    : 'bg-white border-white/10'
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-widest shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <span className="text-xs text-amber-600 font-semibold uppercase">{pkg.service}</span>
                  <h3 className="text-2xl font-bold text-white font-['Outfit'] mt-1">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 mt-2">{pkg.description}</p>

                  <div className="my-6">
                    {pkg.priceVisibility === 'show' && (
                      <div className="text-3xl font-extrabold text-white font-['Outfit']">
                        ₹{pkg.price.toLocaleString()}
                      </div>
                    )}
                    {pkg.priceVisibility === 'starting_from' && (
                      <div>
                        <span className="text-xs text-slate-400 block uppercase">Starting From</span>
                        <div className="text-3xl font-extrabold text-amber-600 font-['Outfit']">
                          ₹{pkg.price.toLocaleString()}
                        </div>
                      </div>
                    )}
                    {pkg.priceVisibility === 'hide' && (
                      <div className="text-lg font-bold text-amber-700 font-['Outfit']">
                        Custom Quote Required
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 text-xs text-slate-300">
                    {pkg.features?.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <button
                    onClick={() => openEnquiry(pkg.name)}
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                      pkg.featured
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {pkg.priceVisibility === 'hide' ? 'Request Custom Quote' : 'Get Quote'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">The LensCraft Edge</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit'] mt-1">
            Why Discerning Clients Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">Professional Equipment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full-frame Sony cinema cameras, prime lenses, drone aerial rigs, and studio lighting setups.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">Experienced Team</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Over 10 years of experience directing high-profile destination weddings & celebrity shoots.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">Fast Delivery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sneak peek sample photos delivered within 48 hours; complete digital gallery on schedule.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">Customer Focused</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Candid comfort, customized package options, and 100% dedicated personal attention.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-slate-50 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit'] mt-1">
              Words From Our Clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex text-amber-600">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 italic">"{item.review}"</p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  {item.avatar && (
                    <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-white font-['Outfit']">{item.name}</h4>
                    <span className="text-xs text-slate-400">{item.role} • {item.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD GENERATION ENQUIRY FORM SECTION */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit']">Book Your Photography Shoot</h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Fill out your event details below to receive a personalized quote and check date availability.
            </p>
          </div>

          {formSuccess ? (
            <div className="text-center py-10 space-y-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-bold text-white font-['Outfit']">Thank You for Your Enquiry!</h3>
              <p className="text-sm text-slate-300">
                Our studio team will review your dates and contact you shortly.
              </p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={leadForm.mobile}
                    onChange={(e) => setLeadForm({ ...leadForm, mobile: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={leadForm.city}
                    onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Service Required *</label>
                  <select
                    value={leadForm.service}
                    onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Wedding Photography">Wedding Photography</option>
                    <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                    <option value="Event Photography">Event Photography</option>
                    <option value="Fashion & Portrait Shoot">Fashion & Portrait Shoot</option>
                    <option value="Cinematic Video Coverage">Cinematic Video Coverage</option>
                    <option value="Product & Commercial">Product & Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Event Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={leadForm.eventDate}
                    onChange={(e) => setLeadForm({ ...leadForm, eventDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Additional Details / Message</label>
                <textarea
                  rows="3"
                  placeholder="Share details like venue, guest count, or shoot style preference..."
                  value={leadForm.message}
                  onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all"
              >
                {formSubmitting ? 'Sending Request...' : 'Send Enquiry Request'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <LightboxModal
          image={lightboxImage}
          items={filteredPortfolio}
          onClose={() => setLightboxImage(null)}
          onNext={() => {
            const idx = filteredPortfolio.findIndex(i => i._id === lightboxImage._id);
            setLightboxImage(filteredPortfolio[(idx + 1) % filteredPortfolio.length]);
          }}
          onPrev={() => {
            const idx = filteredPortfolio.findIndex(i => i._id === lightboxImage._id);
            setLightboxImage(filteredPortfolio[(idx - 1 + filteredPortfolio.length) % filteredPortfolio.length]);
          }}
        />
      )}

      {/* Enquiry Quick Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultService={selectedServiceForModal}
      />
    </div>
  );
}
