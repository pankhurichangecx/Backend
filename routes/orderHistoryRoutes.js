const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Order = require("../models/cartModel");
const Product = require("../models/productModel");

router.post("/addorder", async (req, res) => {
  const { orderItems } = req.body;
  const userID = req.user;
  try {
    const customer = await User.findById(userID);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    const orders = [];
    for (const cartItem of orderItems) {
      const product = await Product.findById(cartItem.product);
      if (product) {
        const orderItem = { ...product };

        orders.push(orderItem);
      } else {
        console.log(`Product with ID ${cartItem.product} not found.`);
      }
    }

    const newOrder = new Order({
      customer: userID,
      orderItems: orders,
      paymentStatus: "Unpaid",
      orderDate: new Date(),
    });

    await newOrder.save();
    customer.cart = [];
    await customer.save();
    res.json({ message: "Order placed successfully." });
  } catch (error) {
    console.error("Error while placing order:", error);
    res.status(500).json({ message: "Error while placing order.", error });
  }
});


router.get("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orderDetail = await Order.findById(orderId);

    if (!orderDetail) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.json(orderDetail);
  } catch (error) {
    console.error("Order details not found using ID:", error);
    res.status(500).json({ message: "Order deatils not found using ID." });
  }
});

router.get("/orderhistory", async (req, res) => {
  const customerID = req.user;
  try {
    const customer = await Order.find({ customer: customerID });
    if (!customer) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(customer);
  } catch (error) {
    console.error("User history not found by ID:", error);
    return res.status(500).json({ message: "User history not found by ID" });
  }
});

module.exports = router;

module.exports = router;