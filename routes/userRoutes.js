const express = require("express");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("./../controllers/userController");

const { signup } = require("./../controllers/authController");
const { login } = require("./../controllers/authController");
const { logout} = require("./../controllers/authController.js");
const { requestPasswordReset, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("logout", logout);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
