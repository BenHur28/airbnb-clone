import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import AccountNav from "../components/AccountNav";
import axios from "axios";

const PlacesPage = () => {
	const [places, setPlaces] = useState([]);
	useEffect(() => {
		axios.get("/user-places").then(({ data }) => {
			setPlaces(data);
		});
	}, []);

	return (
		<div className="py-4 px-8 flex flex-col min-h-screen">
			<Header />
			<AccountNav />
			<div className="text-center mt-12">
				<Link className="inline-flex gap-1 bg-red-500 text-white py-2 px-6 rounded-full" to={"/account/places/new"}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
						<path d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" />
					</svg>
					Add New Place
				</Link>
			</div>
			<div className="mt-4">
				{places.length > 0 &&
					places.map((place, index) => (
						<Link to={"/account/places/" + place._id} className="flex cursor-pointer bg-gray-100 gap-4 p-4 rounded-2xl mb-4" key={index}>
							<div className="flex h-40 w-40 bg-gray-300 grow shrink-0">
								{place.photos.length > 0 && <img className="object-cover aspect-square " src={"http://localhost:3000/uploads/" + place.photos[0]} alt=""></img>}
							</div>
							<div className="grow-0 shrink">
								<h2 className="text-xl">{place.title}</h2>
								<p className="text-sm mt-2">{place.description}</p>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

export default PlacesPage;
