const express = require("express");

const campgrounds = require("../controllers/campgroundController"); // controller
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

router.get("/", catchAsync(campgrounds.index));
router.get("/:id", catchAsync(campgrounds.viewCampground));
router.post("/", catchAsync(campgrounds.createCampground));

module.exports = router;
