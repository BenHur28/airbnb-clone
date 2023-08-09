import React from "react";
import Header from "../components/Header";
import Login from "../components/Login";

const LoginPage = () => {
	return (
		<div className="py-4 px-8 flex flex-col min-h-screen">
			<Header />
			<Login />
		</div>
	);
};

export default LoginPage;
