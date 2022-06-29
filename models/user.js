const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs')

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
    enum: ['user', 'admin'],
    default: 'user',
  },
  password : {
    type: String,
    required: [true, 'please provide password'],
    minlength: 6,
  },
})

UserSchema.pre("save", async function() {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.compare = async function (password) {
  const isCorrect = await bcrypt.compare(password, this.password);
  return isCorrect;
}

module.exports = mongoose.model('User', UserSchema);