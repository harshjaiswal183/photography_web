import express from 'express';
import { Service } from '../models/index.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Get all active services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ status: 'active' }).sort({ displayOrder: 1, createdAt: -1 });
    res.json({ status: 'success', data: services });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Get all services
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const services = await Service.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({ status: 'success', data: services });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Add Service
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, description, coverImage, features, duration, startingPrice, displayOrder, status } = req.body;
    if (!name || !description || !coverImage) {
      return res.status(400).json({ status: 'error', message: 'Name, description and cover image are required.' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const service = new Service({
      name,
      slug,
      description,
      coverImage,
      features: features || [],
      duration: duration || 'Full Day',
      startingPrice: startingPrice || 0,
      displayOrder: displayOrder || 0,
      status: status || 'active'
    });

    await service.save();
    res.status(201).json({ status: 'success', data: service });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Update Service
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) {
      return res.status(404).json({ status: 'error', message: 'Service not found.' });
    }
    res.json({ status: 'success', data: service });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Delete Service
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ status: 'error', message: 'Service not found.' });
    }
    res.json({ status: 'success', message: 'Service deleted.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
