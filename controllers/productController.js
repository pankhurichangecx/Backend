const Product = require("./../models/productModel");

// 127.0.0.1:3000/api/v1/products/
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error!",
      message: "Invalid data sent: ",
      err,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8; // Set default limit to 8 products per page

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    if (!products || products.length === 0) {
      throw new Error("Products not found.", 404);
    }

    res.status(200).json({
      status: "success",
      data: {
        products,
        currentPage: page,
        totalPages,
      },
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: "error!",
      message: err.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    // console.log(req.params.id);
    const product = await Product.findById(req.params.id.trim());
    if (!product) {
      throw new Error("product not found", 404);
    }

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: "error!",
      message: err.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch {
    res.status(404).json({
      status: "error!",
      message: "Unable to update Product",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
      message: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err + err,
    });
  }
};