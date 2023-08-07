const express = require("express");
const {
  getAllOrders,
  placeOrder,
} = require("./../controllers/orderController");

const { authenticate } = require("./../controllers/authController");

const router = express.Router();

// Route to get all orders for a particular user ID
router
  .route("/")
  .get(authenticate, getAllOrders)
  .post(authenticate, placeOrder);

module.exports = router;