const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel');

// Add a product to the user's shopping cart
router.post('/add', async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    // Find the user's cart
    let cart = await Cart.findOne({ user_id });

    if (!cart) {
      // If the cart doesn't exist, create a new cart for the user
      cart = await Cart.create({ user_id, items: [] });
    }

    // Check if the product is already in the cart for the user
    const existingCartItem = cart.items.find((item) => item.product_id.equals(product_id));

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      existingCartItem.quantity += quantity;
    } else {
      // If the product is not in the cart, create a new cart item
      cart.items.push({ product_id, quantity });
    }

    await cart.save();

    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
});

// Remove product from cart
router.delete('/remove', async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ user_id });

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found',
      });
    }

    // Remove the cart item with the specified product_id
    cart.items = cart.items.filter((item) => !item.product_id.equals(product_id));

    await cart.save();

    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
});

module.exports = router;
