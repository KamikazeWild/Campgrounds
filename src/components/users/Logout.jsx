import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
	const navigate = useNavigate();

	async function logout() {
		const res = await fetch("/api/logout", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});
		// const data = await res.json();

		navigate("/login");
	}

	useEffect(() => {
		logout();
	}, []);

	return <h1>You have been successfully logged out.</h1>;
};

export default Logout;
