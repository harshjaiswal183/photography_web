import express from 'express';
import { Package } from '../models/index.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Get all active packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find({ status: 'active' }).sort({ displayOrder: 1, createdAt: -1 });
    res.json({ status: 'success', data: packages });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Get all packages
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const packages = await Package.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({ status: 'success', data: packages });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Add package
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, service, description, features, price, priceVisibility, featured, displayOrder, status } = req.body;
    if (!name) {
      return res.status(400).json({ status: 'error', message: 'Package name is required.' });
    }

    const pkg = new Package({
      name,
      service: service || 'All Services',
      description: description || '',
      features: features || [],
      price: price || 0,
      priceVisibility: priceVisibility || 'starting_from',
      featured: featured || false,
      displayOrder: displayOrder || 0,
      status: status || 'active'
    });

    await pkg.save();
    res.status(201).json({ status: 'success', data: pkg });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Update package
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pkg) {
      return res.status(404).json({ status: 'error', message: 'Package not found.' });
    }
    res.json({ status: 'success', data: pkg });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Delete package
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ status: 'error', message: 'Package not found.' });
    }
    res.json({ status: 'success', message: 'Package deleted.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
