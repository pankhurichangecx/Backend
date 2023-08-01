const express = require("express");
const {
    getOrdersByUser, 
    getAllOrders,
    placeOrder,
    getOrderById,
    cancelOrder,
} = require("./../controllers/orderController");

const router = express.Router();

// Route to get all orders for a particular user ID
router.get('/user/:userId', getOrdersByUser)

router.route("/").get(getAllOrders).post(placeOrder)             
router.get('/:orderId', getOrderById);

// Route to cancel an order by its order ID
router.patch('/cancel/:orderId',cancelOrder);

module.exports = router;
