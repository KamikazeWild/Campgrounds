const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
	url: String,
	filename: String,
});

const CampgroundSchema = new Schema({
	title: String,
	price: Number,
	description: String,
	location: String,
});

module.exports = mongoose.model("Campground", CampgroundSchema);
