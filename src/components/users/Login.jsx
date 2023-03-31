import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();

	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	function handleInput(e) {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	}

	async function postData(e) {
		e.preventDefault();

		const { username, password } = credentials;

		const res = await fetch("http://localhost:4000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});

		const data = await res.json();
		// console.log(data);

		if (data.message) {
			window.alert(data.message);
		}
		if (data.user) {
			window.alert(`Welcome back ${data.user.name}!`);
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
								<h5 className="card-title">Login</h5>
								<form method="POST" className="validate-form" noValidate>
									<div className="mb-3">
										<label className="form-label" htmlFor="username">
											Username
										</label>
										<input
											className="form-control"
											type="text"
											id="username"
											name="username"
											placeholder="Enter your username"
											value={credentials.username}
											onChange={handleInput}
											autoFocus
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
											placeholder="Enter your password"
											value={credentials.password}
											onChange={handleInput}
											required
										/>
										<div className="valid-feedback">Looks good!</div>
									</div>
									<div className="d-grid gap-2">
										<button className="btn btn-success" onClick={postData}>
											Login
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>{" "}
		</div>
	);
};
export default Login;
