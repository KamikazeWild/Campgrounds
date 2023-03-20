require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");

const app = express();
const PORT = 4000;
const router = express.Router();

app.use(cors());
app.use("/", router);

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
	console.log("Connection with MongoDB Atlas successful");
});

app.get("/getData", async function (req, res) {
	let campgrounds = await Campground.find({});
	res.send(campgrounds);
	// console.log(campgrounds);
});

router.get("/campgrounds/:id", async function (req, res) {
	let campground = await Campground.findById(req.params.id);
	res.send(campground);
});

app.listen(PORT, function () {
	console.log("App listening on port " + PORT);
});
