const express = require("express");
const router = express.Router();

const users = require("../controllers/userController"); // controller

router.post("/register", users.register);

module.exports = router;
