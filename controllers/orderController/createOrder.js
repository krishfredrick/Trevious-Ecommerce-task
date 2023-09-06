const Order = require('../../models/order.model');
const Product = require('../../models/product.model')
const { StatusCodes}  = require('http-status-codes');
const CustomError = require('../../errors');
// const {checkPermission} = require('../../utils');


const createOrder = async(req, res)=>{
  const {items, tax} = req.body;
  if(!items || items.length <1){
    throw new CustomError.BAD_REQUEST('No cart items provided');
  }
  let orderItems = [];
  let subtotal = 0;
  for( const item of items){
    const dbProduct = await Product.findOne({_id: item.product})
    if(!dbProduct){
      throw new CustomError.BAD_REQUEST('No cart items provided');
    }
    const {name, price, image, _id} = dbProduct;
    const singleOrder = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };

    orderItems = [...orderItems, singleOrder];
    subtotal+= item.amount * price;
  }
  const total = subtotal+tax;

  const order = await Order.create({
    cartItems:orderItems,
    total,
    tax,
    subtotal,
    user: req.user.userId
  })
  res.status(StatusCodes.CREATED).json({order});
}

module.exports = createOrder;