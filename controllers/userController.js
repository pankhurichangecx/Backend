const User = require("./../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "Success!",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Error!",
      message: err + err,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Error!",
      message: err + err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id.trim());
    // console.log(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error!",
      message: err + err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err + err,
    });
  }
};



exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID and update the "deleted" field to true
    const DeleteUser = await User.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!DeleteUser) {
      throw new Error("User not found", 404);
    }

    res.status(200).json({
      status: "success",
      message: "User soft deleted successfully",
      data: DeleteUser,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: "error",
      message: err.message,
    });
  }
};

// userController.js
exports.getUserRole = (req, res) => {
  // Assuming req.user contains the user's information, including role
  const userRole = req.user.role; // Adjust this based on your user data structure

  res.json({ role: userRole });
};
