const User = require("../models/users");
const passport = require("passport");

module.exports.register = async (req, res) => {
	const { name, username, email, password } = req.body;

	try {
		const user = new User({ name, username, email });
		const registeredUser = await User.register(user, password);

		res
			.status(201)
			.json({ message: "User successfully registered and logged in." });
	} catch (e) {
		res
			.status(422)
			.json({ message: `ERROR: ${e.message}. Please try again`, error: e });
	}
};

module.exports.login = async (req, res, next) => {
	const { username } = req.body;
	const user = await User.findOne({ username: username });
	// console.log(user);

	passport.authenticate("local", (e, user, info) => {
		// if (e) return next(e);
		if (info)
			return res.json({
				message: `${info.message}. Please try again`,
			});
		req.logIn(user, async (e) => {
			if (e) {
				res
					.status(422)
					.json({ message: `Something went wrong: ${e}. Please try again` });
			}

			const token = await user.generateAuthToken();
			// console.log(token);
			res.cookie("jwtoken", token, {
				expires: new Date(Date.now() + 1728000000),
				httpOnly: true,
				sameSite: "none",
			});
			return res.send({ user });
		});
	})(req, res, next);
};
