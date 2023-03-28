const User = require("../models/users");

module.exports.register = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const user = new User({ username, email });
		const registeredUser = await User.register(user, password);

		res
			.status(201)
			.json({ message: "User successfully registered and logged in." });
	} catch (e) {
		res.status(422).json({ message: `ERROR: ${e}. Please try again` });
	}
};
