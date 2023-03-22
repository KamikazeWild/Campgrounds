import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./partials/NavSticky";
import Footer from "./partials/Footer";
import Container from "react-bootstrap/Container";
import AllCampgrounds from "./components/AllCampgrounds";
import ViewCampground from "./components/ViewCampground";
import NewCampground from "./components/NewCampground";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Container>
				<BrowserRouter>
					<Routes>
						<Route path="/campgrounds" element={<AllCampgrounds />} />
						<Route path="/campgrounds/:id" element={<ViewCampground />} />
						<Route path="/new" element={<NewCampground />} />
					</Routes>
				</BrowserRouter>
			</Container>
			<Footer />
		</div>
	);
}

export default App;
