import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});

	function handleInput(e) {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	}

	async function postData(e) {
		e.preventDefault();

		const res = await fetch("/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});
		const data = await res.json();

		if (data.status === 422) {
			window.alert("ERROR", data.error, "Please try again.");
		} else {
			window.alert("User registered and logged in successfully!");
			navigate("/campgrounds");
		}
	}

	return (
		<div>
			<div className="container d-flex justify-content-center align-items-center mt-2 mb-5">
				<div className="row">
					<div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
						<div className="card shadow">
							<img
								src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
								alt=""
								className="card-img-top"
							/>
							<div className="card-body">
								<h5 className="card-title">Register</h5>
								<form method="POST" className="validate-form" noValidate>
									<div className="mb-3">
										<label className="form-label" htmlFor="username">
											Name
										</label>
										<input
											className="form-control"
											type="text"
											id="name"
											name="name"
											placeholder="Your name"
											value={userData.name}
											onChange={handleInput}
											required
											autoFocus
										/>
										<div className="valid-feedback">Looks good!</div>
									</div>
									<div className="mb-3">
										<label className="form-label" htmlFor="username">
											Username
										</label>
										<input
											className="form-control"
											type="text"
											id="username"
											name="username"
											placeholder="Your preferred username"
											value={userData.username}
											onChange={handleInput}
											required
											autoFocus
										/>
										<div className="valid-feedback">Looks good!</div>
									</div>
									<div className="mb-3">
										<label className="form-label" htmlFor="email">
											Email
										</label>
										<input
											className="form-control"
											type="email"
											id="email"
											name="email"
											placeholder="Your email"
											value={userData.email}
											onChange={handleInput}
											required
										/>
										<div className="valid-feedback">Looks good!</div>
									</div>
									<div className="mb-3">
										<label className="form-label" htmlFor="password">
											Password
										</label>
										<input
											className="form-control"
											type="password"
											id="password"
											name="password"
											placeholder="Enter a strong password"
											value={userData.password}
											onChange={handleInput}
											required
										/>
										<div className="valid-feedback">Looks good!</div>
									</div>
									<div className="d-grid gap-2">
										<button
											className="btn btn-success btn-block"
											onClick={(e) => postData(e)}
										>
											Register
										</button>
									</div>
									<div className="my-2">
										Already a user?{" "}
										<a href="/login" className="d-">
											Login now
										</a>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
