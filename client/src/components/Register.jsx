import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4">Register</h1>
				<form className="max-w-md mx-auto">
					<input className="w-full border my-2 py-2 px-3 rounded-2xl" type="email" placeholder="your@email.com" />
					<input className="w-full border my-2 py-2 px-3 rounded-2xl" type="password" placeholder="password" />
					<input className="w-full border my-2 py-2 px-3 rounded-2xl" type="text" placeholder="John Doe" />
					<button className="w-full bg-red-500 text-white my-2 p-2 rounded-2xl">Register</button>
					<div className="text-center py-2 text-gray-500">
						Already a member? {""}
						<Link to={"/login"} className="underline text-black">
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
