const Product = require("./../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);   // It uses await to wait for the database operation to complete before proceeding
    res.status(201).json({    //status code 201 corresponds to the "Created" status.
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
    const products = await Product.find();    //here Product is a model

    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error!",
      message: "Not able to get data",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    // console.log(req.params.id);
    const product = await Product.findById(req.params.id.trim());

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error!",
      message: err + err,
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


