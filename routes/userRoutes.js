const express = require("express");

const {
  signup,
  login,
  restrictTo,
  
} = require("./../controllers/authController");

const { authenticate } = require("./../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.route("/getuserrole").get(authenticate, restrictTo);

module.exports = router;
