const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");

const app = express();
const PORT = 4000;
const router = express.Router();

// app.use(cors());
app.use("/", router);

mongoose.connect(
	"mongodb+srv://kanishk:4K7Mr6xFBGjBaCQc@cluster0.hyy5l.mongodb.net/?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
	}
);
const connection = mongoose.connection;
connection.once("open", function () {
	console.log("Connection with MongoDB Atlas successful");
});

app.get("/getData", async function (req, res) {
	let campgrounds = await Campground.find({});
	res.send(campgrounds);
	// console.log(campgrounds);
});

app.listen(PORT, function () {
	console.log("App listening on port " + PORT);
});
