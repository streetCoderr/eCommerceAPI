const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: [true, "please provide product's name"]
  },
  price: {
    type: Number,
    required: [true, "please provide product's price"],
    default: 0
  },
  description: {
    type: String,
    required: [true, "please provide product's description"]
  },
  brand: {
    type: String,
    required: [true, "please provide product's brand"],
  },
  category: {
    type: String,
    required: [true, "provide category of product"],
    enum: {
      values: ["super market", "health & beauty", "home & office", 
    "phones & tablets", "computing", "electronics", "fashion", 
    "baby products", "gaming", "sporting goods", "automobile", "others"],
      message: "{VALUE} not a valid category"
    },
  },
  shippingFee: {
    type: Number,
    required: [true, "please providing shipping fee of product"],
    default: 0
  },
  freeDelivery: {
    type: Boolean,
    default: function() {
      return this.shippingFee === 0;
    },
  },
  colors: {
    type: [String],
    default: ["#000000"],
    required: true
  },
  averageRating: {
    type: Number,
    default: 0
  },
  numberOfReviews: {
    type: Number,
    default: 0
  },
  inventory: {
    type: Number,
    default: 10
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema);