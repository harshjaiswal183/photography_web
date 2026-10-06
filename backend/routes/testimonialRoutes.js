import express from 'express';
import { Testimonial } from '../models/index.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Get published testimonials
router.get('/', async (req, res) => {
  try {
    const list = await Testimonial.find({ status: 'published' }).sort({ createdAt: -1 });
    res.json({ status: 'success', data: list });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Get all testimonials
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const list = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ status: 'success', data: list });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Add Testimonial
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, avatar, role, review, rating, service, status } = req.body;
    if (!name || !review) {
      return res.status(400).json({ status: 'error', message: 'Name and review text are required.' });
    }

    const item = new Testimonial({
      name,
      avatar: avatar || '',
      role: role || 'Client',
      review,
      rating: rating || 5,
      service: service || 'Photography Service',
      status: status || 'published'
    });

    await item.save();
    res.status(201).json({ status: 'success', data: item });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Update Testimonial
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ status: 'error', message: 'Testimonial not found.' });
    }
    res.json({ status: 'success', data: item });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Delete Testimonial
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ status: 'error', message: 'Testimonial not found.' });
    }
    res.json({ status: 'success', message: 'Testimonial deleted.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
