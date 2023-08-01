const Order = require('../models/orderModel');

exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Use populate to retrieve the associated user details along with the orders
    const orders = await Order.find({ user_id: userId });
    res.status(200).json({
      status: "Success!",
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Error!",
      message: err.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      status: "Success!",
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Error!",
      message: err.message,
    });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newOrder,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Error!",
      message: err + err,
    });
  }
};

// exports.cancelOrder = async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       message: "success",
//       data: null,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "error!",
//       message: err + err,
//     });
//   }
// };


exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    console.log(req.params);

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: 'cancelled' },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};


