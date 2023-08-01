const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User', 
     required: true,
     validate: {
      validator: async function (userId) {
        const user = await mongoose.model('User').findOne({ _id: userId });
        return user !== null;
      },
      message: 'Invalid user_id. User does not exist.',
    }, 
    },

  order_date: {
     type: Date, 
     default: Date.now,
    },

  status: {
     type: String, 
     required: true 
    },

  total_amount: {
     type: Number,
     required: true 
    },

  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        validate: {
          validator: async function (productId) {
            const product = await mongoose.model('Product').findOne({ _id: productId });
            return product !== null;
          },
          message: 'Invalid product_id. Product does not exist.',
        },
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  shipping_address: {
     type: String, 
     required: true 
    },
    
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
