const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
  },
  issale: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  brand: {
    type: String,
    required: [true, "A product must have a brand."],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  photoUrl: {
    type: String,
    required: [true, "A photo must have url"],
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
