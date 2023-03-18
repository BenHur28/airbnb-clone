import React from "react";
import { Link, useParams } from "react-router-dom";

const PlacesPage = () => {
	const { action } = useParams();
	return (
		<div>
			{action !== "new" && (
				<div className="text-center mt-12">
					<Link className="inline-flex gap-1 bg-red-500 text-white py-2 px-6 rounded-full" to={"/account/places/new"}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
							<path d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" />
						</svg>
						Add New Place
					</Link>
				</div>
			)}
			{action === "new" && (
				<div>
					<form className="max-w-7xl mx-auto mt-12">
						<h2 className="text-xl mt-4">Title</h2>
						<p className="text-gray-500 text-sm">Title for your place. Should be short and catchy like an advertisement.</p>
						<input className="w-full border my-2 py-2 px-3 rounded-2xl" type="text" placeholder="Title, for example: My lovely Apartment" />
						<h2 className="text-xl mt-4">Address</h2>
						<p className="text-gray-500 text-sm">Address to your place.</p>
						<input className="w-full border my-2 py-2 px-3 rounded-2xl" type="text" placeholder="Address" />
						<h2 className="text-xl mt-4">Photos</h2>
						<p className="text-gray-500 text-sm">More is better</p>
						<div className="grid grid-cols-3 md-grid-cols-4 lg:grid-cols-6 mt-2">
							<button className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-500">+</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default PlacesPage;
