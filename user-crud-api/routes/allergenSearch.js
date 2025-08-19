// routes/allergenSearch.js
const express = require('express');
const router = express.Router();
const Allergen = require('../models/Allergen');

router.get('/', async (req, res) => {
  try {
    let { name, description, limit, offset, sortBy, sortOrder } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (description) filter.description = { $regex: description, $options: 'i' };

    if (Object.keys(filter).length === 0) {
      return res.status(400).json({ message: 'Geef minstens één zoekparameter op' });
    }

    // Default limit & offset
    limit = parseInt(limit) || 10;
    offset = parseInt(offset) || 0;

    // Default sort
    sortBy = sortBy || 'name';
    sortOrder = sortOrder === 'desc' ? -1 : 1;

    const allergens = await Allergen.find(filter)
      .skip(offset)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });

    res.json(allergens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
