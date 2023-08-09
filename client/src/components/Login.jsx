import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);
	const { setUser } = useContext(UserContext);
	const login = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/login", { email, password }, { withCredentials: true });
			if (response.data != "not found") {
				setUser(response.data);
				alert("Login successful");
				setRedirect(true);
			} else {
				alert("Login failed");
			}
		} catch (e) {
			alert("Login failed");
		}
	};

	if (redirect) {
		return <Navigate to={"/"} />;
	}

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4">Login</h1>
				<form className="max-w-md mx-auto" onSubmit={login}>
					<input
						className="w-full border my-2 py-2 px-3 rounded-2xl"
						type="email"
						placeholder="your@email.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className="w-full border my-2 py-2 px-3 rounded-2xl"
						type="password"
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="w-full bg-red-500 text-white p-2 rounded-2xl">Login</button>
					<div className="text-center py-2 text-gray-500">
						Don't have an account yet? {""}
						<Link to={"/register"} className="underline text-black">
							Register now
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
