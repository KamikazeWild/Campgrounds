const Campground = require("../models/campgrounds");

module.exports.index = async function (req, res) {
	let campgrounds = await Campground.find({});
	res.send(campgrounds);
	// console.log(campgrounds);
};

module.exports.viewCampground = async function (req, res) {
	let campground = await Campground.findById(req.params.id);
	res.send(campground);
};

module.exports.createCampground = async function (req, res) {
	const { title, location, price, description } = req.body;

	// if (!title || !location || !price || !description) {
	// 	res.status(422).json({ message: "Please fill all the fields in the form" });
	// }

	try {
		// Fetch location coordinates from MapBox
		const mbxGeocode = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.VITE_MAPBOX_TOKEN}`
		);
		const geoData = await mbxGeocode.json();

		const camp = new Campground({
			title,
			location,
			price,
			description,
		});
		camp.geometry = geoData.features[0].geometry;

		await camp.save();
		res
			.status(201)
			.json({ message: "Capground created successfully", id: camp._id });
	} catch (err) {
		res.status(422).json({ message: err });
		console.log(err);
	}
};

module.exports.deleteCampground = async function (req, res) {
	try {
		await Campground.findByIdAndDelete(req.params.id);
		res.status(201).json({ message: "Campground deleted successfully" });
	} catch (err) {
		res.status(422).json({ message: err });
		console.log(err);
	}
};
