const express = require("express");

const campgrounds = require("../controllers/campgroundController"); // controller
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

router.get("/", catchAsync(campgrounds.index)); // get all campgrounds
router.get("/:id", catchAsync(campgrounds.viewCampground)); // view particular campground
router.post("/", catchAsync(campgrounds.createCampground)); // create new campground
router.patch("/:id/edit", campgrounds.editCampground); // edit particular campground
router.delete("/:id", catchAsync(campgrounds.deleteCampground)); // delete campground

module.exports = router;
