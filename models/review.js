const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
  rating : {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "please provide rating"]
  },
  title : {
    type: String,
    maxlength: 50,
    required: [true, "please provide title"],
  },
  comment : {
    type: String,
    required: [true, "please provide a comment"]
  }
}, {timestamps: true})

module.exports = mongoose.model("Review", ReviewSchema);