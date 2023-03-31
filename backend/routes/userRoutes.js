const express = require("express");
const users = require("../controllers/userController"); // controller
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

const router = express.Router();

router.post("/register", catchAsync(users.register));

router.post("/login", (req, res, next) => {
	passport.authenticate("local", (e, user, info) => {
		// if (e) return next(e);
		if (info)
			return res.json({
				message: `${info.message}. Please try again`,
			});
		req.logIn(user, (e) => {
			if (e) {
				res
					.status(422)
					.json({ message: `Something went wrong: ${e}. Please try again` });
			}
			return res.send({ user });
		});
	})(req, res, next);
});

module.exports = router;
