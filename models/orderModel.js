// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   user_id: {
//      type: mongoose.Schema.Types.ObjectId, 
//      ref: 'User', 
//      required: true,
//      validate: {
//       validator: async function (userId) {
//         const user = await mongoose.model('User').findOne({ _id: userId });
//         return user !== null;
//       },
//       message: 'Invalid user_id. User does not exist.',
//     }, 
//     },

//   order_date: {
//      type: Date, 
//      default: Date.now,
//     },

//   status: {
//      type: String, 
//      required: true 
//     },

//   total_amount: {
//      type: Number,
//      required: true 
//     },

//   products: [
//     {
//       product_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true,
//         validate: {
//           validator: async function (productId) {
//             const product = await mongoose.model('Product').findOne({ _id: productId });
//             return product !== null;
//           },
//           message: 'Invalid product_id. Product does not exist.',
//         },
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
//   shipping_address: {
//      type: String, 
//      required: true 
//     },
    
// });

// const Order = mongoose.model("Order", orderSchema);

// module.exports = Order;

const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  orderTotal: {
    type: Number,
    default: 0,
  },
  orderItems: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      imageURL: {
        type: String,
        required: true,
      },
      variants: [
        {
          size: {
            type: String,
            required: true,
          },
        },
      ],
      quantity: {
        type: Number,
        required: true,
      },
      inventory: {
        type: Number,
        required: true,
      },
    },
  ],
  paymentStatus: {
    type: String,
    required: true,
    default: "Unpaid",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;