const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  rating:{
    type:Number,
    min:1,
    max:5,
    required:[true, 'please provide rating']
  },
  title:{
    type: String,
    trim: true,
    required: [true, 'please provide review title'],
    maxlength: 100,
  },
  comment:{
    type:String,
    required: [true, 'please provide review text'],
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  }
},{timestamps: true}
);

reviewSchema.index({product:1, user:1}, {unique: true});
reviewSchema.post('save', async function(){
  // console.log()
  await this.constructor.calculateAvg(this.product);
})
reviewSchema.statics.calculateAvg = async function(productId){
  const result = await this.aggregate([
    {
      $match:{
        product: productId
      },
      $group:{
        _id:null,
        averageRating:{
          $avg: 'rating'
        },
        numOfReviews:{
          $sum:1
        },
      }
    },
  ]);

  await this.model('product').findOneAndUpdate({_id: productId},{
    averageRating: Math.ceil(result[0]?.averageRating || 0),
    numOfReviews: Math.ceil(result[0]?.numOfReviews || 0)
  })
}
reviewSchema.post('remove', async function(){
  await this.constructor.calculateAvg(this.product);
})

module.exports = mongoose.model('review', reviewSchema);