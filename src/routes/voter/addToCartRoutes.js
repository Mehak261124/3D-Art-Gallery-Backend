const express = require("express");
const { addToCart, removeFromCart, getCart, Increment, Decrement, getCartItems } = require("../../controllers/voter/addToCart.js");
const { verifyToken } = require("../../middleware/verifyToken"); 

const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.delete("/remove", verifyToken, removeFromCart);
router.patch("/increment", verifyToken, Increment);
router.patch("/decrement", verifyToken, Decrement);
// router.get("/", verifyToken, getCart);
router.get("/getCartItems", verifyToken, getCartItems);

module.exports = router;
