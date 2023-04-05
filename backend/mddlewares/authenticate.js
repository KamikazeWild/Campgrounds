const jwt = require("jsonwebtoken");
const User = require("../models/users");
const expressError = require("../utils/expressError");

const authenticate = async (req, res, next) => {
	try {
		const token = req.cookies.jwtoken;
		if (!token) {
			req.isLoggedIn = false;
		} else {
			const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
			// console.log(verifyToken);

			var rootUser = await User.findOne({
				_id: verifyToken._id,
				"tokens.token": token,
			});
			if (rootUser) {
				req.isLoggedIn = true;
				// throw new expressError("User not found", 401);
			}
		}

		// console.log(rootUser);
		req.rootUser = rootUser;
		next();
	} catch (err) {
		res.status(402).send("Unauthorized");
		console.error(err);
	}
};

module.exports = authenticate;
