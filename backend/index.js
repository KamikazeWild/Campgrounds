require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const campgroundRoutes = require("./routes/campgroundRoutes");

const app = express();
const PORT = 4000;
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use("/", router);

// connect to mongodb atlas
mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
	console.log("Connection with MongoDB Atlas successful");
});

// routes
app.use("/campgrounds", campgroundRoutes);

app.listen(PORT, function () {
	console.log("App listening on port " + PORT);
});
