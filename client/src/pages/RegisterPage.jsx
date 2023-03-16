import React from "react";
import Header from "../components/Header";
import Register from "../components/Register";

const RegisterPage = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<Register />
		</div>
	);
};

export default RegisterPage;
