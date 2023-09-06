
const mongoose = require('mongoose');

const cartSchema =  mongoose.Schema({
  name:{type: String,required: true},
  image:{type: String,required: true},
  price:{type: String,required: true},
  amount:{type: String,required: true},
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  }
});

module.exports = mongoose.model('cart', cartSchema);