import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function BrandExample() {
	return (
		<>
			<Navbar fixed="bottom" bg="dark" variant="dark">
				<Container>
					<Navbar.Text>© YelpCamp 2023</Navbar.Text>
				</Container>
			</Navbar>
		</>
	);
}

export default BrandExample;
