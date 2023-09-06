const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
      type: String,
      trim: true,
      required:[true, 'Please provide product name'],
      maxLength: [100, 'Name can not be more than 100 character'],
    },
    price:{
      type: Number,
      trim: true,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    description:{
      type: String,
      required: [true, 'Please add product Description'],
      maxLength: [1000, "Description Should not be more than 1000 Characers"],
    },
    image:{
      type:String,
      default: '/uploads/example.jpeg',
    },
    category:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category'
    },
    company:{
      type: String,
      required: [true, 'please provide company']
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory:{
      type: Number,
      required: true,
      default: 15,
    },
    numOfReviews:{
      type:Number,
      default: 0,
    },
    averageRating:{
      type: Number,
      default: 0,
    },
    user:{
      type: mongoose.Types.ObjectId,
      ref: 'User',
      default:'unknown'
    }
  },
  { 
    timestamps: true, 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
  }

);

productSchema.virtual('review',{
  ref: 'review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
})

productSchema.pre('remove', async function(next){
  await this.model('review').deleteMany({product:this._id});
  next();
})

module.exports = mongoose.model('product', productSchema);

