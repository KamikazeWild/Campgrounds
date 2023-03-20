import { useEffect, useState } from "react";
import Campground from "./Campground";

const AllCampgrounds = () => {
	const [campgrounds, setCampgrounds] = useState([]);

	const getCampgrounds = async () => {
		const res = await fetch("http://localhost:4000/getData");
		const campgrounds = await res.json();
		setCampgrounds(campgrounds);
		// console.log(campgrounds);
	};

	useEffect(() => {
		getCampgrounds();
	}, []);

	return (
		<div>
			<p className="fs-1 fw-bolder">All Campgrounds</p>
			<button className="mb-3">Create New Campground</button>

			{campgrounds.map((camp) => {
				return <Campground camp={camp} key={camp._id} />;
			})}
		</div>
	);
};

export default AllCampgrounds;
