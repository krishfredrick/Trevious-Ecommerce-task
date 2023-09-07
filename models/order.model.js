const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  cartItems: [{
    type: mongoose.Schema.ObjectId,
    ref: 'cart',
    required: true
  }],
  tax:{
    type: Number,
    required: true
  },
  subtotal:{
    type: Number,
    required: true,
  },
  total:{
    type: Number,
    required: true,
  },
  status:{
    type:String,
    enum:['Success','Failure','Pending', 'On-Cart'],
    default:'On-Cart'
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  }
},{timestamps: true});


module.exports = mongoose.model('order', orderSchema);