import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, default: 'Studio Director' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
}, { timestamps: true });

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Lead Schema
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  whatsapp: { type: String, default: '' },
  email: { type: String, default: '' },
  city: { type: String, default: '' },
  service: { type: String, required: true },
  eventDate: { type: String, default: '' },
  eventLocation: { type: String, default: '' },
  eventType: { type: String, default: '' },
  guestCount: { type: String, default: '' },
  budget: { type: String, default: '' },
  message: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Follow-up', 'Quoted', 'Confirmed', 'Completed', 'Cancelled'], 
    default: 'New' 
  },
  source: { 
    type: String, 
    default: 'Website Form' 
  },
  notes: [{
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Wedding', 'Pre-Wedding', 'Couple', 'Events', 'Birthday', 'Fashion', 'Portrait', 'Corporate', 'Product', 'Other']
  },
  imageUrl: { type: String, required: true },
  description: { type: String, default: '' },
  displayOrder: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

// Service Schema
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  features: [{ type: String }],
  duration: { type: String, default: 'Full Day' },
  startingPrice: { type: Number, default: 0 },
  displayOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

// Package Schema
const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  service: { type: String, default: 'All Services' },
  description: { type: String, default: '' },
  features: [{ type: String }],
  price: { type: Number, default: 0 },
  priceVisibility: { type: String, enum: ['show', 'hide', 'starting_from'], default: 'starting_from' },
  featured: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

// Testimonial Schema
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, default: '' },
  role: { type: String, default: 'Client' },
  review: { type: String, required: true },
  rating: { type: Number, default: 5 },
  service: { type: String, default: 'Wedding Photography' },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

// Settings Schema
const settingsSchema = new mongoose.Schema({
  photographerName: { type: String, default: 'Aarav Sharma' },
  businessName: { type: String, default: 'LensCraft Studios' },
  phone: { type: String, default: '+91 98765 43210' },
  whatsapp: { type: String, default: '919876543210' },
  email: { type: String, default: 'hello@lenscraftstudios.com' },
  address: { type: String, default: 'Studio 402, Creative Hub, Bandra West' },
  city: { type: String, default: 'Mumbai, Maharashtra' },
  instagram: { type: String, default: 'https://instagram.com/lenscraft_studios' },
  facebook: { type: String, default: 'https://facebook.com/lenscraftstudios' },
  youtube: { type: String, default: 'https://youtube.com/@lenscraftstudios' },
  whatsappDefaultMsg: { type: String, default: 'Hi, I found your photography website and would like to know more about your photography services.' },
  heroHeadline: { type: String, default: 'Capturing Moments That Last Forever' },
  heroSubheading: { type: String, default: 'Professional photography for weddings, events, couples, portraits and special occasions.' },
  aboutBio: { type: String, default: 'Over a decade of crafting visual stories with emotion, light, and timeless artistry.' },
  aboutExperience: { type: String, default: '10+ Years' },
  seoTitle: { type: String, default: 'LensCraft Studios | Premium Wedding & Event Photographer' },
  seoDescription: { type: String, default: 'Best wedding, pre-wedding, fashion and event photographer in Mumbai. Book your shoot today!' }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export const Lead = mongoose.model('Lead', leadSchema);
export const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export const Service = mongoose.model('Service', serviceSchema);
export const Package = mongoose.model('Package', packageSchema);
export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export const Settings = mongoose.model('Settings', settingsSchema);
