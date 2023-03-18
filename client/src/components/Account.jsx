import React, { useState } from "react";
import { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";

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

	const linkClasses = (type = null) => {
		let classes = "py-2 px-6 ";
		if (type === subpage) {
			classes += "bg-red-500 text-white rounded-full";
		}
		return classes;
	};

	if (redirect) {
		return <Navigate to={"/"} />;
	}

	return (
		<div>
			<nav className="w-full flex justify-center mt-8 gap-2">
				<Link className={linkClasses("profile")} to={"/account"}>
					My Profile
				</Link>
				<Link className={linkClasses("bookings")} to={"/account/bookings"}>
					My Bookings
				</Link>
				<Link className={linkClasses("places")} to={"/account/places"}>
					My accommodations
				</Link>
			</nav>
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
