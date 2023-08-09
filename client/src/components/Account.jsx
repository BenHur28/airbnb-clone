import React, { useState } from "react";
import { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";
import PlacesPage from "../pages/PlacesPage";
import AccountNav from "./AccountNav";

const Account = () => {
	const { ready, user, setUser } = useContext(UserContext);
	const [redirect, setRedirect] = useState(false);
	let { subpage } = useParams();

	if (subpage === undefined) {
		subpage = "profile";
	}

	if (!ready) {
		return "Loading...";
	}

	if (ready && !user && !redirect) {
		return <Navigate to={"/login"} />;
	}

	const logout = async () => {
		await axios.post("/logout");
		setRedirect(true);
		setUser(null);
	};

	if (redirect) {
		return <Navigate to={"/"} />;
	}

	return (
		<div>
			<AccountNav />
			{subpage === "profile" && (
				<div className="text-center mt-8 max-w-lg mx-auto">
					Logged in as {user.name} ({user.email}) <br />
					<button onClick={logout} className="bg-red-500 text-white mt-6 py-2 px-6 rounded-full">
						Log out
					</button>
				</div>
			)}
		</div>
	);
};

export default Account;
