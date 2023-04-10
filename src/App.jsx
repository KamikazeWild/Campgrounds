import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "./components/partials/NavSticky";
import Footer from "./components/partials/Footer";
import AllCampgrounds from "./components/campgrounds/AllCampgrounds";
import ViewCampground from "./components/campgrounds/ViewCampground";
import NewCampground from "./components/campgrounds/NewCampground";
import EditCampground from "./components/campgrounds/EditCampground";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Logout from "./components/users/Logout";

function App() {
	const [loggedInUser, setULoggedInUser] = useState(false);

	// Check whether the user is logged in or not
	async function isLoggedIn() {
		const res = await fetch("api");
		const data = await res.json();
		// console.log(data);

		if (!res.status === 200 || !data) {
			throw new Error("Something went wrong. Please try again.");
		}

		setULoggedInUser(data.rootUser);
	}

	useEffect(() => {
		isLoggedIn();
	}, []);

	return (
		<div className="App">
			<Navbar loggedInUser={loggedInUser} />
			<Container>
				<BrowserRouter>
					<Routes>
						{/* Campgrounds */}
						<Route path="/campgrounds" element={<AllCampgrounds />} />
						<Route path="/campgrounds/:id" element={<ViewCampground />} />
						<Route
							path="/new"
							element={<NewCampground loggedInUser={loggedInUser} />}
						/>
						<Route path="/campgrounds/:id/edit" element={<EditCampground />} />

						{/* Users */}
						<Route path="/logout" element={<Logout />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</BrowserRouter>
			</Container>
			<Footer />
		</div>
	);
}

export default App;
