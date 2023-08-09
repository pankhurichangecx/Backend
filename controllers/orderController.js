const User = require("../models/userModel");
const Product = require("../models/productModel");

exports.getAllOrders = async (req, res) => {
  const userID = req.user;
  try {
    const isUser = await User.findById(userID);
    if (!isUser) {
      throw new Error("User not found while showing cart!", 404);
    }

    resultArray = [];

    let orderItems = isUser.orders;
    for (let order of orderItems) {
      // console.log(cart);

      // console.log([product, cart.quantity, cart._id]);
      const status = order.status;
      const id = order._id;
      const date = order.createdAt;
      const prods = order.products;
      let orderArray = [];
      for (let item of prods) {
        const product = await Product.findById(item);
        orderArray.push(product);
      }
      resultArray.push({ orderArray, id, date, status });
      // console.log({ orderArray, id, date, status });
    }
    // console.log(resultArray);
    return res.status(200).json({
      status: "ok",
      data: resultArray,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error!",
      message: err.message,
    });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (user) {
      user.orders.push({ ...req.body });
      await user.save({ validateBeforeSave: false });
      // console.log({ ...req.body });
      console.log("order added successfully!");
      res.status(200).json({
        status: "ok",
        message: user.cart,
      });
    } else {
      throw new Error("User not found while adding to order!", 404);
    }
  } catch (err) {
    res.status(400).json({
      status: "Error!",
      message: err,
    });
  }
};