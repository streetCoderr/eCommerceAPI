const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
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
    minlength: 5,
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
      message: "{VALUE} is not a valid category"
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
  freeDelivery: {
    type: Boolean,
    default: true,
    required: true
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
}, { timestamps: true /*, toJSON: {virtuals: true}, toObject: {virtuals: true}*/})

/*
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
})*/

ProductSchema.pre('remove', async function() {
  await this.model('Review').deleteMany({product: this._id})
})

module.exports = mongoose.model('Product', ProductSchema);