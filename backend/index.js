require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;

const campgroundRoutes = require("./routes/campgroundRoutes");
const userRoutes = require("./routes/userRoutes");

// passport
const User = require("./models/users");
const passport = require("passport");

app.use(express.json());
app.use(cors()); // allow cross origin resource sharing between frontend and backend
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

app.listen(PORT, function () {
	console.log("App listening on port " + PORT);
});
