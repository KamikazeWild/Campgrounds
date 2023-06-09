import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const ViewCampground = () => {
	const [camp, setCamp] = useState({});
	const [mapObject, setMapObject] = useState();
	const { id } = useParams();
	// console.log(id)
	const navigate = useNavigate();

	// For MapBox
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lat, lng] = camp?.geometry?.coordinates || [-75, 42];
	const [zoom, setZoom] = useState(9);

	const getCampground = async () => {
		const res = await fetch(`/api/campgrounds/${id}`);
		const data = await res.json();
		setCamp(data);
		// console.log({ data });
	};

	const deleteCampground = async (e) => {
		e.preventDefault();

		const res = await fetch(`/api/campgrounds/${id}/`, {
			method: "DELETE",
		});

		if (res.status === 422) {
			window.alert("Something went wrong. Try again.");
		} else {
			window.alert("Campground deleted successfully");
			navigate("/campgrounds");
		}
	};

	const setMapCenter = (coords) => {
		if (mapObject) {
			// console.log(mapObject.setCenter);
			mapObject.setCenter(coords);
		}
	};

	useEffect(() => {
		getCampground();
	}, []);

	useEffect(() => {
		// For MapBox
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [lng, lat],
			zoom: zoom,
		});
		setMapObject(map.current);
	}, []);

	useEffect(() => {
		setMapCenter([lat, lng]);
	}, [lat, lng]);

	return (
		<div className="container mt-3">
			<div className="row">
				<div className="col-6">
					<div className="card mb-5">
						<div
							id="carouselExampleControls"
							className="carousel slide"
							data-coreui-ride="carousel"
						>
							<div className="carousel-inner">
								{camp.images &&
									camp.images.forEach((pic, i) => {
										<div>
											<div
												className={`carousel-item ${i === 0 ? `active` : ``}`}
											>
												<img
													src={pic.url}
													className="d-block w-100"
													alt="..."
												/>
											</div>
										</div>;
									})}
							</div>
							<button
								className="carousel-control-prev"
								type="button"
								data-coreui-target="#carouselExampleControls"
								data-coreui-slide="prev"
							>
								<span
									className="carousel-control-prev-icon"
									aria-hidden="true"
								></span>
								<span className="visually-hidden">Previous</span>
							</button>
							<button
								className="carousel-control-next"
								type="button"
								data-coreui-target="#carouselExampleControls"
								data-coreui-slide="next"
							>
								<span
									className="carousel-control-next-icon"
									aria-hidden="true"
								></span>
								<span className="visually-hidden">Next</span>
							</button>
						</div>

						<div className="card-body">
							<h5 className="card-title">{camp.title}</h5>
							<p className="card-text">{camp.description}</p>
						</div>
						<ul className="list-group list-group-flush">
							<li className="list-group-item text-muted">{camp.location}</li>
							<li className="list-group-item">Created by: -author-</li>
							<li className="list-group-item">Price: ${camp.price}</li>
						</ul>
						<div className="card-body">
							<div className="d-inline-block">
								<a href={`${camp._id}/edit`} className="btn btn-primary">
									Edit Campground
								</a>
							</div>
							<div className="d-inline-block">
								<form method="POST">
									<a
										href="#delete"
										className="btn btn-danger mx-3"
										onClick={(e) => deleteCampground(e)}
									>
										Delete Campground
									</a>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="col-6">
					<div className="row">
						<div>
							<div ref={mapContainer} className="map-container" />
						</div>
					</div>
					{/* <div className="row">Reviews</div> */}
				</div>
			</div>
		</div>
	);
};

export default ViewCampground;
