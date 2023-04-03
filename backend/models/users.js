const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});
userSchema.plugin(passportLocalMongoose);

userSchema.methods.generateAuthToken = async function () {
	try {
		let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
		this.tokens = this.tokens.concat({ token: token });
		await this.save();
		return token;
	} catch (err) {
		console.log(err);
	}
};

module.exports = mongoose.model("User", userSchema);
