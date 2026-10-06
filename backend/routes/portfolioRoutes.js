import express from 'express';
import { Portfolio } from '../models/index.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Get all portfolio images (filterable by category)
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = { status: 'published' };

    if (category && category !== 'All') {
      query.category = category;
    }
    if (featured === 'true') {
      query.featured = true;
    }

    const items = await Portfolio.find(query).sort({ displayOrder: 1, createdAt: -1 });
    res.json({ status: 'success', data: items });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Get all portfolio images including drafts
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const items = await Portfolio.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({ status: 'success', data: items });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Add new portfolio item
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, category, imageUrl, description, displayOrder, featured, status } = req.body;
    if (!title || !category || !imageUrl) {
      return res.status(400).json({ status: 'error', message: 'Title, category, and Image URL are required.' });
    }

    const item = new Portfolio({
      title,
      category,
      imageUrl,
      description: description || '',
      displayOrder: displayOrder || 0,
      featured: featured || false,
      status: status || 'published'
    });

    await item.save();
    res.status(201).json({ status: 'success', data: item });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Update portfolio item
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ status: 'error', message: 'Portfolio item not found.' });
    }
    res.json({ status: 'success', data: item });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Delete portfolio item
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ status: 'error', message: 'Portfolio item not found.' });
    }
    res.json({ status: 'success', message: 'Portfolio item deleted.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
