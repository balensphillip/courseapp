const mongoose = require('mongoose');

// register Schema
const registerSchema = mongoose.Schema({
  fullname: {
        type: String,
        required: true
      },
  email: {
        type: String,
        required: true
      },
  course: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  comfirmpassword: {
    type: String,
    required: true
  }
});

const Register = module.exports = mongoose.model('Register', registerSchema);