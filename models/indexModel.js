const mongoose = require('mongoose');

// index Schema
const indexSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

const Index = module.exports = mongoose.model('Index', indexSchema);