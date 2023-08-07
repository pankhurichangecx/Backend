const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    // const newUser = await User.create(req.body);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success!",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error!",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // 1) check if email and password exists
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide email and password", 401);
    }

    // 2) check if email and password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Incorrect email or password", 401);
    }

    // 3) if everything ok send token
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "error!",
      message: err + err,
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    // 1) Getting token and check whether its there
    // console.log(req.headers);
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization;
      // console.log(token);
    } else {
      throw new Error("You are not logged in!", 401);
    }

    // 2) Verification Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
    // console.log(decoded);

    // 3) Check if user still exists (user deleted after token assign)
    const user = await User.findById(decoded.id);

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "error!",
      message: err.message,
    });
  }
};

exports.restrictTo = (req, res) => {
  const userRole = req.user;

  if (!userRole) {
    throw new Error("User role not found!", 404);
  }

  res.status(200).json({
    data: userRole,
  });
};