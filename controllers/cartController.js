const User = require("./../models/userModel");
const Product = require("./../models/productModel");
const mongoose = require("mongoose");

exports.addCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (user) {
      user.cart.push({ ...req.body });
      await user.save({ validateBeforeSave: false });
      console.log("Product added successfully!");
      res.status(200).json({
        status: "ok",
        message: user.cart,
      });
    } else {
      throw new Error("User not found while adding to cart!", 404);
    }
  } catch (err) {
    res.status(404).json(console.log(err));
  }
};

exports.getAllCart = async (req, res) => {
  const userID = req.user;
  try {
    const isUser = await User.findById(userID);
    if (!isUser) {
      throw new Error("User not found while showing cart!", 404);
    }
    let cartArray = [];
    let cartItems = isUser.cart;
    for (let cart of cartItems) {
      // console.log(cart);
      const product = await Product.findById(cart.product);
      // console.log([product, cart.quantity, cart._id]);
      const quantity = cart.quantity;
      const id = cart._id;
      // console.log({ product, quantity, id });
      cartArray.push({ product, quantity, id });
    }
    return res.status(200).json({
      status: "ok",
      data: cartArray,
    });
  } catch (error) {
    res.status(err.statusCode).json({
      status: "error!",
      message: error.message,
    });
  }
};

exports.removeCart = async (req, res) => {
  const productID = new mongoose.Types.ObjectId(req.params.id);
  const userID = req.user;

  if (!userID) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User not logged in." });
  }

  try {
    const isUser = await User.findById(userID);
    if (!isUser) {
      // return res.status(404).json({ message: "User not Found." });
      throw new Error("User not found", 404);
    }

    isUser.cart = isUser.cart.filter(
      (item) => item.product.toString() !== productID.toString()
    );
    await isUser.save({ validateBeforeSave: false });

    res.status(200).json({
      cart: isUser.cart,
      message: "Item removed successfully from cart",
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
};

//Quantity

exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Check if the user is authenticated and get the user ID from the request
    const userId = req.user._id;

    // Find the user and their cart item
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItem = user.cart.find((item) => item._id.toString() === id);
    // const cartItem = user.cart.find((item) =>
    //   console.log(item._id.toString(), id)
    // );
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Update the cart item quantity
    cartItem.quantity = quantity;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json({ message: "Cart item quantity updated successfully" });
  } catch (error) {
    console.error("Error while updating cart item", error);
    res.status(400).json({ message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found while clearing the cart!", 404);
    }

    user.cart = [];
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "ok",
      message: "Cart cleared successfully!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};