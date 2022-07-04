const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
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
  image: {
    type: String,
    required: true,
    default: '/uploads/example.jpeg'
  },
  brand: {
    type: String,
    required: [true, "please provide product's brand"],
  },
  category: {
    type: String,
    required: [true, "please provide the category of this product"],
    enum: {
      values: ["super market", "health & beauty", "home & office", 
    "phones & tablets", "computing", "electronics", "fashion", 
    "baby products", "gaming", "sporting goods", "automobile", "others"],
      message: "{VALUE} not a valid category"
    },
  },
  featured: {
    type: Boolean,
    required: true,
    default: false
  },
  colors: {
    type: [String],
    default: ["#000000"],
    required: true
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
  averageRating: {
    type: Number,
    default: 0
  },
  numOfReviews: {
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