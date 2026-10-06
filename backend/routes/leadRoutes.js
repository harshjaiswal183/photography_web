import express from 'express';
import { Lead } from '../models/index.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Submit Lead / Enquiry Form
router.post('/', async (req, res) => {
  try {
    const { name, mobile, whatsapp, email, city, service, eventDate, eventLocation, eventType, guestCount, budget, message, source } = req.body;
    
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ status: 'error', message: 'Name must be at least 2 characters.' });
    }
    if (!mobile || !/^[0-9+\-\s]{10,15}$/.test(mobile.trim())) {
      return res.status(400).json({ status: 'error', message: 'Please enter a valid mobile number.' });
    }
    if (!service) {
      return res.status(400).json({ status: 'error', message: 'Please select a service.' });
    }

    const lead = new Lead({
      name: name.trim(),
      mobile: mobile.trim(),
      whatsapp: (whatsapp || mobile).trim(),
      email: (email || '').trim(),
      city: (city || '').trim(),
      service,
      eventDate: eventDate || '',
      eventLocation: eventLocation || '',
      eventType: eventType || service,
      guestCount: guestCount || '',
      budget: budget || '',
      message: message || '',
      source: source || 'Website Form',
      status: 'New'
    });

    await lead.save();

    res.status(201).json({
      status: 'success',
      message: 'Thank you for your enquiry! Our team will contact you shortly.',
      data: lead
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Get all leads with filtering and search
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const { status, service, search, source, city } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }
    if (service && service !== 'All') {
      query.service = service;
    }
    if (source && source !== 'All') {
      query.source = source;
    }
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { eventLocation: { $regex: search, $options: 'i' } }
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });

    // Stats summary
    const totalLeads = await Lead.countDocuments({});
    const newLeads = await Lead.countDocuments({ status: 'New' });
    const contactedLeads = await Lead.countDocuments({ status: 'Contacted' });
    const followUpLeads = await Lead.countDocuments({ status: 'Follow-up' });
    const confirmedLeads = await Lead.countDocuments({ status: 'Confirmed' });

    res.json({
      status: 'success',
      stats: { totalLeads, newLeads, contactedLeads, followUpLeads, confirmedLeads },
      data: leads
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Get single lead
router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ status: 'error', message: 'Lead not found.' });
    }
    res.json({ status: 'success', data: lead });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Update lead status
router.put('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['New', 'Contacted', 'Follow-up', 'Quoted', 'Confirmed', 'Completed', 'Cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ status: 'error', message: 'Invalid status value.' });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({ status: 'error', message: 'Lead not found.' });
    }
    res.json({ status: 'success', data: lead });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Add note to lead
router.post('/:id/notes', verifyAdmin, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ status: 'error', message: 'Note text cannot be empty.' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ status: 'error', message: 'Lead not found.' });
    }

    lead.notes.push({ text: text.trim(), createdAt: new Date() });
    await lead.save();

    res.json({ status: 'success', data: lead });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Delete lead
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ status: 'error', message: 'Lead not found.' });
    }
    res.json({ status: 'success', message: 'Lead deleted successfully.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
