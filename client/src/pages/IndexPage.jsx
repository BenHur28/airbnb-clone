import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const IndexPage = () => {
	const [places, setPlaces] = useState([]);
	useEffect(() => {
		axios.get("/places").then((response) => {
			setPlaces(response.data);
		});
	}, []);

	return (
		<div className="py-4 px-8 flex flex-col min-h-screen">
			<Header />
			<div className="mt-8 gap-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-32">
				{places.length > 0 &&
					places.map((place, index) => (
						<Link to={"/place/" + place._id} key={index}>
							<div className="flex h-60 w-60 mb-2 bg-gray-500 rounded-2xl">
								{place.photos?.[0] && (
									<img className="object-cover aspect-square rounded-2xl" src={"http://localhost:3000/uploads/" + place.photos?.[0]} alt="" />
								)}
							</div>
							<h2 className="font-bold">{place.address}</h2>
							<h3 className="text-sm truncate text-gray-500">{place.title}</h3>
							<div className="mt-1">
								<span className="font-bold">${place.price}</span> per night
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

export default IndexPage;
