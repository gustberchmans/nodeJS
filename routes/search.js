// routes/search.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    let { name, email, age, limit, offset, sortBy, sortOrder } = req.query;

    const filter = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (age) {
      const ageNum = parseInt(age);
      if (!isNaN(ageNum)) filter.age = ageNum;
    }

    if (Object.keys(filter).length === 0) {
      return res.status(400).json({ message: 'Geef minstens één zoekparameter op' });
    }

    // Default limit & offset
    limit = parseInt(limit) || 10;
    offset = parseInt(offset) || 0;

    // Default sort
    sortBy = sortBy || 'name';
    sortOrder = sortOrder === 'desc' ? -1 : 1; // asc by default

    const users = await User.find(filter)
      .skip(offset)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
