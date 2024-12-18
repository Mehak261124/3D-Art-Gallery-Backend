const express = require("express");
const authRoutes = express.Router();

const { login, signup } = require("../../controllers/voter/auth");

authRoutes.post("/login", login);
authRoutes.post("/signup", signup);

module.exports = authRoutes;
