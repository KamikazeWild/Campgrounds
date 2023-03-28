import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditCampground = () => {
	const { id } = useParams();
	const [campData, setCampData] = useState();

	const getCampground = async () => {
		const res = await fetch(`http://localhost:4000/campgrounds/${id}`);
		const data = await res.json();
		console.log(data);
		setCampData(data);
	};

	const handleInputs = (e) => {
		setCampData({ ...campData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		getCampground();
	}, []);

	return (
		<div className="row mb-5">
			<h1 className="text-center">Edit Campground</h1>
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
							value={campData?.title}
							onChange={handleInputs}
							id="title"
							name="title"
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
							value={campData?.location}
							onChange={handleInputs}
							id="location"
							name="location"
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
							value={campData?.description}
							onChange={handleInputs}
							id="description"
							name="description"
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
								value={campData?.price}
								onChange={handleInputs}
								step="0.01"
								className="form-control border-3"
								name="price"
								aria-label="Amount (to the nearest dollar)"
								required
							/>
						</div>
					</div>

					<button className="btn btn-primary">Update campground</button>
					<a className="btn btn-danger ms-3" href="/campgrounds">
						Cancel
					</a>
				</form>
			</div>
		</div>
	);
};

export default EditCampground;
