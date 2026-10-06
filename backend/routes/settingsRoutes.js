import express from 'express';
import { Settings } from '../models/index.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Get website settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({ status: 'success', data: settings });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Admin: Update website settings
router.put('/', verifyAdmin, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json({ status: 'success', data: settings });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
