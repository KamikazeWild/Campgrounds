const express = require("express");
const users = require("../controllers/userController"); // controller
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

router.post("/register", catchAsync(users.register));

router.post("/login", users.login);

module.exports = router;
