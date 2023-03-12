import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./partials/NavSticky";
import Footer from "./partials/Footer";
import Container from "react-bootstrap/Container";
import AllCampgrounds from "./components/AllCampgrounds";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Container>
				<AllCampgrounds />
			</Container>
			<Footer />
		</div>
	);
}

export default App;
