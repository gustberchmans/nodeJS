// routes/allergenRoutes.js
const express = require('express');
const router = express.Router();
const Allergen = require('../models/Allergen');

// CREATE
router.post('/', async (req, res) => {
  try {
    const allergen = new Allergen(req.body);
    await allergen.save();
    res.status(201).json(allergen);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ALL (met limit, offset en sort)
router.get('/', async (req, res) => {
  try {
    let { limit, offset, sortBy, sortOrder } = req.query;
    limit = parseInt(limit) || 10;
    offset = parseInt(offset) || 0;
    sortBy = sortBy || 'name';
    sortOrder = sortOrder === 'desc' ? -1 : 1;

    const allergens = await Allergen.find()
      .skip(offset)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });

    res.json(allergens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const allergen = await Allergen.findById(req.params.id);
    if (!allergen) return res.status(404).json({ message: 'Allergen niet gevonden' });
    res.json(allergen);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const allergen = await Allergen.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!allergen) return res.status(404).json({ message: 'Allergen niet gevonden' });
    res.json(allergen);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const allergen = await Allergen.findByIdAndDelete(req.params.id);
    if (!allergen) return res.status(404).json({ message: 'Allergen niet gevonden' });
    res.json({ message: 'Allergen verwijderd' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
