require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const expressError = require("./utils/expressError");

const app = express();
const PORT = 4000;

const campgroundRoutes = require("./routes/campgroundRoutes");
const userRoutes = require("./routes/userRoutes");

// passport
const User = require("./models/users");
const passport = require("passport");

app.use(express.json());
app.use(cors()); // allow cross origin resource sharing between frontend and backend
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());

// configure passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
app.use("/", userRoutes);

// Error handling middlewares
app.all("*", (req, res, next) => {
	next(new expressError("Error 404, Not found", 404));
});
app.use((err, req, res, next) => {
	if (!err.message) err.message = "Oh no, something went wrong. :(";
	if (!err.status) err.status = 500;

	res.status(err.status).send("ERROR: " + err.message);
});

app.listen(PORT, function () {
	console.log("App listening on port " + PORT);
});
