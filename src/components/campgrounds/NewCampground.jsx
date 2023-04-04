import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewCampground = () => {
	const [campData, setCampData] = useState({
		title: "",
		location: "",
		description: "",
		price: "",
	});
	const navigate = useNavigate();

	const handleInputs = (e) => {
		setCampData({ ...campData, [e.target.name]: e.target.value });
	};

	const postData = async (e) => {
		e.preventDefault();

		const { title, location, description, price } = campData;
		const res = await fetch("/api/campgrounds", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				location,
				description,
				price,
			}),
		});

		const data = await res.json();
		if (data.status === 422 || !data) {
			window.alert("Error, try again.");
		} else {
			window.alert("campground created successfully!");
			navigate(`/campgrounds/${data.id}`);
		}
	};

	return (
		<div className="row mb-5">
			<h1 className="text-center">New Campground</h1>
			<div className="col-6 offset-3">
				<form
					method="POST"
					noValidate
					className="validate-form"
					encType="multipart/form-data"
				>
					{/* Title */}
					<div>
						<label className="form-label" htmlFor="title">
							Title
						</label>
						<input
							className="form-control mb-2 border-3"
							type="text"
							value={campData.title}
							onChange={handleInputs}
							id="title"
							name="title"
							placeholder="Enter title"
							required
						/>
					</div>

					{/* Location */}
					<div>
						<label className="form-label" htmlFor="location">
							Location
						</label>
						<input
							className="form-control mb-2 border-3"
							type="text"
							value={campData.location}
							onChange={handleInputs}
							id="location"
							name="location"
							placeholder="Enter location"
							required
						/>
					</div>

					{/* Description */}
					<div>
						<label className="form-label" htmlFor="description">
							Description
						</label>
						<textarea
							className="form-control mb-2 border-3"
							type="text"
							value={campData.description}
							onChange={handleInputs}
							id="description"
							name="description"
							placeholder="Enter description"
							required
						/>
					</div>

					{/* Price */}
					<div className="mb-2">
						<label className="form-label" htmlFor="price">
							Price
						</label>
						<div className="input-group mb-3">
							<span className="input-group-text">$</span>
							<input
								type="text"
								id="price"
								value={campData.price}
								onChange={handleInputs}
								step="0.01"
								className="form-control border-3"
								placeholder="0.00"
								name="price"
								aria-label="Amount (to the nearest dollar)"
								required
							/>
						</div>
					</div>

					<button className="btn btn-primary" onClick={(e) => postData(e)}>
						Add campground
					</button>
					<a className="btn btn-danger ms-3" href="/campgrounds">
						Cancel
					</a>
				</form>
			</div>
		</div>
	);
};

export default NewCampground;
