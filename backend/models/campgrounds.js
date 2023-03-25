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
	geometry: {
		type: {
			type: String, // Don't do `{ location: { type: String } }`
			enum: ["Point"], // 'location.type' must be 'Point'
			// required: true
		},
		coordinates: {
			type: [Number],
			// required: true
		},
	},
});

module.exports = mongoose.model("Campground", CampgroundSchema);
