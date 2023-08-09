const express = require("express");
const {
  addCart,
  getAllCart,
  removeCart,
  updateCart,
  clearCart,
} = require("./../controllers/cartController");

const router = express.Router();

const { authenticate } = require("./../controllers/authController");
router.patch("/addcart", authenticate, addCart);
router.get("/getallcart", authenticate, getAllCart);
router.put("/updatecart/:id", authenticate, updateCart);
router.delete("/removecart/:id", authenticate, removeCart);
router.delete("/clearcart", authenticate, clearCart);


module.exports = router;