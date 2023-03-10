import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/NavSticky";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Container></Container>
			<Footer />
		</div>
	);
}

export default App;
