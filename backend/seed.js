import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User, Lead, Portfolio, Service, Package, Testimonial, Settings } from './models/index.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/photography_db';

export const seedDatabase = async () => {
  console.log('🌱 Starting Database Seeding...');

  // 1. Admin User
  const existingUser = await User.findOne({ email: 'admin@lenscraft.com' });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Aarav Sharma',
      email: 'admin@lenscraft.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('✅ Default Admin Created: admin@lenscraft.com / admin123');
  }

  // 2. Settings
  const existingSettings = await Settings.findOne();
  if (!existingSettings) {
    await Settings.create({
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
      aboutBio: 'With over 10 years behind the lens, I specialize in capturing raw emotion, candid grandeur, and timeless visual stories across India and internationally.',
      aboutExperience: '10+ Years Experience',
      seoTitle: 'LensCraft Studios | Premium Wedding & Event Photographer',
      seoDescription: 'Award-winning wedding, pre-wedding & portrait photography studio. Book high-end visual storytelling for your special day.'
    });
    console.log('✅ Settings Initialized');
  }

  // 3. Services
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany([
      {
        name: 'Wedding Photography',
        slug: 'wedding-photography',
        description: 'Complete royal wedding day coverage capturing intimate rituals, emotional smiles, and festive visual grandeur.',
        coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        features: ['Full Day Dual Photographer Coverage', '4K Cinematic Teaser & Highlight Reel', '500+ Hand-Edited High-Res Photos', 'Luxury Premium Hardcover Album', 'Online Cloud Gallery Access'],
        duration: 'Full Day (12+ Hrs)',
        startingPrice: 75000,
        displayOrder: 1,
        status: 'active'
      },
      {
        name: 'Pre-Wedding Shoot',
        slug: 'pre-wedding-photography',
        description: 'Romantic, candid, and dramatic couple sessions in breathtaking outdoor locations & custom aesthetic sets.',
        coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        features: ['2 Scenic Locations', '3 Outfit Changes Included', 'Aerial Drone Shot Sequences', 'Short Cinematic Video Teaser (60s)', '100+ Master Edited Deliverables'],
        duration: '6 Hours',
        startingPrice: 35000,
        displayOrder: 2,
        status: 'active'
      },
      {
        name: 'Event Photography',
        slug: 'event-photography',
        description: 'High-energy coverage for anniversaries, birthdays, milestone galas, and corporate celebrations.',
        coverImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
        features: ['Candidate & Stage Coverage', 'Fast 48-Hour Sample Delivery', 'High Resolution Digital Download', 'Lighting & Flash Rig Included'],
        duration: '4 - 8 Hours',
        startingPrice: 20000,
        displayOrder: 3,
        status: 'active'
      },
      {
        name: 'Fashion & Portrait Shoot',
        slug: 'fashion-photography',
        description: 'High-fashion editorial portraiture, model portfolios, lookbooks, and personal lifestyle shoots.',
        coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
        features: ['Studio or Outdoor Setup', 'Professional Retouching & Color Grade', 'Multiple Concept Stylings', 'Commercial License Rights'],
        duration: '4 Hours',
        startingPrice: 25000,
        displayOrder: 4,
        status: 'active'
      },
      {
        name: 'Cinematic Video Coverage',
        slug: 'cinematic-video',
        description: 'Hollywood-grade cinematic storytelling video films with original sound design and color grading.',
        coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
        features: ['4K Ultra HD Cinema Cameras', 'Steadicam & Gimbal Shots', 'Drone Aerial Video Footage', 'Custom Soundtrack & Audio Mastering'],
        duration: 'Full Day',
        startingPrice: 50000,
        displayOrder: 5,
        status: 'active'
      },
      {
        name: 'Product & Commercial Photography',
        slug: 'product-photography',
        description: 'Clean e-commerce studio photography and stylized lifestyle flatlays for brands and businesses.',
        coverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
        features: ['Studio White / Color Backdrops', 'High Resolution Detail Shots', 'Web & Print Ready Files', 'Infographic & Ad Formats'],
        duration: 'Per Project / Day',
        startingPrice: 18000,
        displayOrder: 6,
        status: 'active'
      }
    ]);
    console.log('✅ Default Services Seeded');
  }

  // 4. Packages
  const packageCount = await Package.countDocuments();
  if (packageCount === 0) {
    await Package.insertMany([
      {
        name: 'Essential Celebration Package',
        service: 'Event & Portrait',
        description: 'Ideal for intimate family functions, birthdays, and half-day milestone events.',
        features: [
          '1 Lead Senior Photographer',
          'Up to 4 Hours Coverage',
          '150+ Color-Corrected High-Res Photos',
          'Digital Private Web Gallery (1 Year)',
          'Delivery within 7 Working Days'
        ],
        price: 24999,
        priceVisibility: 'show',
        featured: false,
        displayOrder: 1,
        status: 'active'
      },
      {
        name: 'Royal Wedding Experience',
        service: 'Wedding Photography',
        description: 'Comprehensive luxury wedding storytelling with full photo & video crew for all wedding functions.',
        features: [
          '2 Lead Photographers + 2 Cinematic Videographers',
          'Full Wedding Day + Sangeet Coverage',
          '4K 3-Minute Trailer & 20-Minute Film',
          '600+ Retouched Signature Photographs',
          'Handcrafted Velvet Hardcover Photo Album',
          'Complimentary Pre-Wedding Shoot'
        ],
        price: 125000,
        priceVisibility: 'starting_from',
        featured: true,
        displayOrder: 2,
        status: 'active'
      },
      {
        name: 'Pre-Wedding & Couple Story',
        service: 'Pre-Wedding Shoot',
        description: 'A cinematic romantic day tailored to your unique love story.',
        features: [
          'Full Day Outdoor Session (Up to 2 Locations)',
          '1 Cinematographer + 1 Photographer',
          'Drone Footage Included (Subject to venue)',
          '100+ Retouched Digital Deliverables',
          'Teaser Video Reel for Instagram'
        ],
        price: 45000,
        priceVisibility: 'show',
        featured: false,
        displayOrder: 3,
        status: 'active'
      },
      {
        name: 'Custom Bespoke Photography',
        service: 'Custom Package',
        description: 'Tailored specifically to your destination wedding, multi-day festivity or specialized commercial project.',
        features: [
          'Customizable Crew Size & Gear',
          'Multi-City / Destination Coverage',
          'Raw Files & Express Delivery Options',
          'Custom Photobook Printing',
          'Exclusive Rights & Retainers'
        ],
        price: 0,
        priceVisibility: 'hide',
        featured: false,
        displayOrder: 4,
        status: 'active'
      }
    ]);
    console.log('✅ Default Packages Seeded');
  }

  // 5. Portfolio Images
  const portfolioCount = await Portfolio.countDocuments();
  if (portfolioCount === 0) {
    await Portfolio.insertMany([
      {
        title: 'Golden Hour Royal Vows',
        category: 'Wedding',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        description: 'A breathtaking bridal moment captured during sunset at Udaipur palace.',
        displayOrder: 1,
        featured: true,
        status: 'published'
      },
      {
        title: 'Mystic Lake Romance',
        category: 'Pre-Wedding',
        imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        description: 'Cinematic pre-wedding shoot near serene mist-laden waters.',
        displayOrder: 2,
        featured: true,
        status: 'published'
      },
      {
        title: 'Laughter in the Festivities',
        category: 'Wedding',
        imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
        description: 'Joyful candid emotion during turmeric ceremony rituals.',
        displayOrder: 3,
        featured: true,
        status: 'published'
      },
      {
        title: 'High-Fashion Editorial Glow',
        category: 'Fashion',
        imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
        description: 'Studio mood portrait focusing on dramatic shadows and haute couture.',
        displayOrder: 4,
        featured: true,
        status: 'published'
      },
      {
        title: 'Electric Gala Celebration',
        category: 'Events',
        imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
        description: 'Vibrant stage lights and crowd enthusiasm at a milestone corporate dinner.',
        displayOrder: 5,
        featured: false,
        status: 'published'
      },
      {
        title: 'Candid Warmth',
        category: 'Couple',
        imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
        description: 'Intimate embrace under heritage archways.',
        displayOrder: 6,
        featured: true,
        status: 'published'
      },
      {
        title: 'Minimalist Timepiece',
        category: 'Product',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
        description: 'Luxury watch studio shot for e-commerce catalog.',
        displayOrder: 7,
        featured: false,
        status: 'published'
      },
      {
        title: 'First Birthday Magic',
        category: 'Birthday',
        imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
        description: 'Colorful cake smash and toddler laughter.',
        displayOrder: 8,
        featured: false,
        status: 'published'
      },
      {
        title: 'Leadership Portrait',
        category: 'Corporate',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
        description: 'Executive headshot for corporate annual report.',
        displayOrder: 9,
        featured: false,
        status: 'published'
      }
    ]);
    console.log('✅ Default Portfolio Seeded');
  }

  // 6. Testimonials
  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany([
      {
        name: 'Rohan & Ananya Kapoor',
        role: 'Wedding Couple',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        review: 'Aarav and his team were pure magic! They made us feel so comfortable, and every single photograph looks straight out of a luxury magazine.',
        rating: 5,
        service: 'Wedding Photography',
        status: 'published'
      },
      {
        name: 'Priya Verma',
        role: 'Pre-Wedding Client',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
        review: 'Our pre-wedding shoot in Goa was seamless. The drone shots and video teaser left our families stunned. Highly recommended!',
        rating: 5,
        service: 'Pre-Wedding Shoot',
        status: 'published'
      },
      {
        name: 'Vikramaditya Singhania',
        role: 'Event Organizer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        review: 'Punctual, professional, and equipped with top-grade gear. The turnaround time for photos was insanely fast.',
        rating: 5,
        service: 'Event Photography',
        status: 'published'
      }
    ]);
    console.log('✅ Default Testimonials Seeded');
  }

  // 7. Initial Sample Leads
  const leadCount = await Lead.countDocuments();
  if (leadCount === 0) {
    await Lead.insertMany([
      {
        name: 'Karan Malhotra',
        mobile: '9820011223',
        whatsapp: '919820011223',
        email: 'karan.m@gmail.com',
        city: 'Mumbai',
        service: 'Wedding Photography',
        eventDate: '2026-11-20',
        eventLocation: 'Taj Lands End, Bandra',
        eventType: 'Royal Wedding',
        guestCount: '450',
        budget: '₹1,50,000+',
        message: 'Looking for full 2-day wedding coverage including Sangeet and Pheras.',
        status: 'New',
        source: 'Website Form',
        notes: [{ text: 'Submitted via Home enquiry form.' }]
      },
      {
        name: 'Neha Roy',
        mobile: '9871122334',
        whatsapp: '919871122334',
        email: 'neharoy@outlook.com',
        city: 'Pune',
        service: 'Pre-Wedding Shoot',
        eventDate: '2026-10-15',
        eventLocation: 'Mahabaleshwar Lake',
        eventType: 'Outdoor Shoot',
        guestCount: '2',
        budget: '₹40,000',
        message: 'Want romantic sunset drone shots and short Instagram reel.',
        status: 'Contacted',
        source: 'WhatsApp',
        notes: [{ text: 'Sent package details via WhatsApp.' }]
      },
      {
        name: 'Siddharth Mehta',
        mobile: '9988776655',
        whatsapp: '919988776655',
        email: 'siddharth@techsummit.io',
        city: 'Bengaluru',
        service: 'Event Photography',
        eventDate: '2026-10-05',
        eventLocation: 'JW Marriott',
        eventType: 'Corporate Gala',
        guestCount: '200',
        budget: '₹30,000',
        message: 'Need 1 day coverage for annual award ceremony.',
        status: 'Quoted',
        source: 'Website Form',
        notes: [{ text: 'Quote sent: ₹28,000 + GST' }]
      }
    ]);
    console.log('✅ Sample Leads Created');
  }

  console.log('🎉 Seeding Complete!');
};

// Run directly if invoked from command line
if (import.meta.url === `file://${process.argv[1]}`) {
  mongoose.connect(MONGODB_URI)
    .then(async () => {
      await seedDatabase();
      mongoose.disconnect();
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seed DB connection error:', err);
      process.exit(1);
    });
}
