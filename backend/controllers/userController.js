const User = require("../models/users");

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

module.exports.login = (req, res) => {
	// Login code in userRoutes
};
