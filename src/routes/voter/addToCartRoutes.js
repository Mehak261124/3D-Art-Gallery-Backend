const express = require("express");
const { addToCart, removeFromCart, getCart, Increment, Decrement } = require("../../controllers/voter/addToCart");
const { verifyToken } = require("../../middleware/verifyToken"); 

const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.delete("/remove", verifyToken, removeFromCart);
router.patch("/increment", verifyToken, Increment);
router.patch("/decrement", verifyToken, Decrement);
router.get("/", verifyToken, getCart);

module.exports = router;
