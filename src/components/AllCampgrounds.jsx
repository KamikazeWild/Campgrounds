// import { MongoClient } from "mongodb";

const AllCampgrounds = () => {
	const getCampgrounds = async () => {
		const res = await fetch("http://localhost:4000/getData");
		const data = await res.json();
		console.log(data);
	};

	return (
		<div>
			<h1>All Campgrounds</h1>
			<button onClick={getCampgrounds}>Get 'em tiger</button>
		</div>
	);
};

export default AllCampgrounds;
