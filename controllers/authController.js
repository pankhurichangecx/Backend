const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if the user already exists with the provided email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // // Hash the password before saving it to the database
    // const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm: req.body.passwordConfirm,
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

exports.logout = (req, res) => {
  // Clear the JWT cookie from the client-side by setting an expired token
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 1000), // Set the cookie to expire in 1 second
    httpOnly: true, // The cookie is accessible only through HTTP(S) requests, not JavaScript
  });

  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
};


exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user based on the provided email
    const user = await User.findOne({ email });

    if (!user) {
      // User with the provided email not found
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token and save it to the user's document in the database
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set an expiration time for the reset token (e.g., 1 hour)
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour from now

    await user.save();

    // Send the reset token to the user's email
    const resetURL = `http://your-app-url/reset-password/${resetToken}`;
    const emailMessage = `To reset your password, click on the following link: ${resetURL}`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Token',
      message: emailMessage,
    });

    res.status(200).json({ message: 'Password reset token sent to your email' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find the user based on the provided reset token and ensure it hasn't expired
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }, // Check if the token has not expired
    });

    if (!user) {
      // Invalid or expired token
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update the user's password and remove the reset token and expiration
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};
