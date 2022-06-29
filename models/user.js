const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide your name'],
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'please provide your email address'],
    validate: {
      validator: isEmail,
      message: props => `${props.value} is not a valid email address!`
    },
  },
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User',
  },
  password : {
    type: String,
    required: [true, 'please provide password'],
    minlength: 6,
  },
})

module.exports = mongoose.model('User', UserSchema);