const mongoose = require('mongoose');
const order = require('./cart.model');

const orderSchema = mongoose.Schema({
  cartItems: [order.schema],
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