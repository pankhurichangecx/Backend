const mongoose = require('mongoose');
const CartItem = require('./cartItem');

const cartSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
   },
  
   items: [CartItem.schema],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
