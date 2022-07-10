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
  },
  product : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true})

ReviewSchema.index({product: 1, user: 1}, {unique: true})

ReviewSchema.statics.calculateAssociatedProductFields = async function(productId) {
  const res = await this.aggregate([
    {
      $match: {product: productId}
    },
    {
      $group: {
        _id: null,
        averageRating: {$avg: "$rating"},
        numOfReviews: {$sum: 1}
      }
    }
  ])

  console.log(res[0])
  try {
    await this.model('Product').findOneAndUpdate({_id: productId}, {
      averageRating: res[0]?.averageRating || 0,
      numOfReviews: res[0]?.numOfReviews
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

ReviewSchema.post('save', async function() {
  await this.constructor.calculateAssociatedProductFields(this.product)
})

ReviewSchema.post('remove', async function() {
  await this.constructor.calculateAssociatedProductFields(this.product)
})

module.exports = mongoose.model("Review", ReviewSchema);