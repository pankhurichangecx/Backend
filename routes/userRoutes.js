const express = require("express");

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserRole,
} = require("./../controllers/userController");

const {
  signup,
  login,
  restrictTo,
  forgetPassword,
  resetPassword,
  // updatePassword,
  
} = require("./../controllers/authController");

const { authenticate } = require("./../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.route("/getuserrole").get(authenticate, restrictTo);
// router.post("/forgetpassword", forgetPassword);
// router.patch("/resetpassword/:token", resetPassword);
// // router.patch("/updatepassword", protect, updatePassword);
// router.post("/forgetpassword", forgetPassword);
// router.get("logout", logout);

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
