const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Naam is verplicht'],
    validate: {
      validator: function(v) {
        return /^[A-Za-z\s]+$/.test(v); // alleen letters en spaties
      },
      message: props => `${props.value} mag geen cijfers bevatten`
    }
  },
  email: {
    type: String,
    required: [true, 'Email is verplicht'],
    match: [/.+@.+\..+/, 'Email is ongeldig']
  },
  age: {
    type: Number,
    required: [true, 'Leeftijd is verplicht'],
    min: [0, 'Leeftijd moet groter of gelijk zijn aan 0']
  }
});

module.exports = mongoose.model('User', userSchema);
