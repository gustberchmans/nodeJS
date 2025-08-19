// models/Allergen.js
const mongoose = require('mongoose');

const allergenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Allergen', allergenSchema);
