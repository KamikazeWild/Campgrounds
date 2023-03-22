const NewCampground = () => {
	return (
		<div className="row mb-3">
			<h1 className="text-center">New Campground</h1>
			<div className="col-6 offset-3">
				<form
					action="http://localhost:4000/campgrounds"
					method="POST"
					noValidate
					className="validate-form"
					encType="multipart/form-data"
				>
					<div>
						<label className="form-label" htmlFor="title">
							Title
						</label>
						<input
							className="form-control mb-2 border-3"
							type="text"
							id="title"
							name="campground[title]"
							placeholder="Enter title"
							required
						/>
					</div>
					<div>
						<label className="form-label" htmlFor="location">
							Location
						</label>
						<input
							className="form-control mb-2 border-3"
							type="text"
							id="location"
							name="campground[location]"
							placeholder="Enter location"
							required
						/>
					</div>
					<div>
						<label className="form-label" htmlFor="description">
							Description
						</label>
						<textarea
							className="form-control mb-2 border-3"
							type="text"
							id="description"
							name="campground[description]"
							placeholder="Enter description"
							required
						/>
					</div>
					<div className="mb-2">
						<label className="form-label" htmlFor="price">
							Price
						</label>
						<div className="input-group mb-3">
							<span className="input-group-text">$</span>
							<input
								type="text"
								id="price"
								step="0.01"
								className="form-control border-3"
								placeholder="0.00"
								name="campground[price]"
								aria-label="Amount (to the nearest dollar)"
								required
							/>
						</div>
					</div>

					<button className="btn btn-primary">Add campground</button>
					<a className="btn btn-danger ms-3" href="/campgrounds">
						Cancel
					</a>
				</form>
			</div>
		</div>
	);
};

export default NewCampground;
