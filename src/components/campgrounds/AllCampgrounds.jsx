import { useEffect, useState } from "react";
import Campground from "./Campground";

const AllCampgrounds = () => {
	const [campgrounds, setCampgrounds] = useState([]);

	const getCampgrounds = async () => {
		const res = await fetch("/api/campgrounds");
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
			<a className=" btn btn-dark mb-3" href="/new">
				Create New Campground
			</a>

			{campgrounds.map((camp) => {
				return <Campground camp={camp} key={camp._id} />;
			})}
		</div>
	);
};

export default AllCampgrounds;
