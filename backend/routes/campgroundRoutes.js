const express = require("express");
const router = express.Router();
const authenticate = require("../mddlewares/authenticate");

const campgrounds = require("../controllers/campgroundController"); // controller
const catchAsync = require("../utils/catchAsync");

router.get("/", catchAsync(campgrounds.index)); // get all campgrounds
router.get("/new", authenticate, (req, res) => { // user authorization before creating new campgrounds
	res.json({ isLoggedIn: req.isLoggedIn, rootUser: req.rootUser });
});
router.get("/:id", catchAsync(campgrounds.viewCampground)); // view particular campground
router.post("/", catchAsync(campgrounds.createCampground)); // create new campground
router.patch("/:id/edit", catchAsync(campgrounds.editCampground)); // edit particular campground
router.delete("/:id", catchAsync(campgrounds.deleteCampground)); // delete campground

module.exports = router;
