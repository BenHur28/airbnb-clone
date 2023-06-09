import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import BookingWidget from "../components/BookingWidget";

const SinglePlacePage = () => {
	const { id } = useParams();
	const [place, setPlace] = useState(null);
	const [showAllPhotos, setShowAllPhotos] = useState(false);

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get(`/places/${id}`).then((response) => {
			setPlace(response.data);
		});
	}, [id]);

	if (!place) return "";
	if (showAllPhotos) {
		return (
			<div className="absolute inset-0 min-h-screen">
				<div className="p-8 grid gap-4">
					<div className="">
						<h2 className="text-3xl">Photos of {place.title}</h2>
						<button
							onClick={() => setShowAllPhotos(false)}
							className="fixed flex gap-1 bg-white text-black rounded-2xl shadow-md shadow-gray-500 top-24 left-12 py-2 px-4"
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
								<path d="M6 18L18 6M6 6l12 12" />
							</svg>
							Close photos
						</button>
					</div>
					<div className="grid grid-cols-4 gap-4">
						{place?.photos?.length > 0 &&
							place.photos.map((photo, index) => (
								<div key={index}>
									<img className="aspect-square object-cover" src={"http://localhost:3000/uploads/" + photo} alt="" />
								</div>
							))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="py-4 px-8 flex flex-col min-h-screen">
			<Header />
			<div className="mt-4 bg-gray-100 px-8 pt-8 w-2/3 mx-auto rounded-2xl">
				<h1 className="text-3xl">{place.title}</h1>
				<a className="flex mt-4 gap-1 my-2 font-semibold underline" target="_blank" href={"https://maps.google.com/?=" + place.address}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
						<path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
						<path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
					</svg>
					{place.address}
				</a>
				<div className="relative mt-6">
					<div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
						<div>
							{place.photos?.[0] && (
								<>
									<div>
										<img
											onClick={() => setShowAllPhotos(true)}
											className="aspect-square object-cover cursor-pointer"
											src={"http://localhost:3000/uploads/" + place.photos[0]}
											alt=""
										/>
									</div>
								</>
							)}
						</div>
						<div className="grid ">
							{place.photos?.[1] && (
								<img
									onClick={() => setShowAllPhotos(true)}
									className="aspect-square object-cover cursor-pointer"
									src={"http://localhost:3000/uploads/" + place.photos[1]}
									alt=""
								/>
							)}
							<div className="overflow-hidden">
								{place.photos?.[2] && (
									<img
										onClick={() => setShowAllPhotos(true)}
										className="aspect-square object-cover relative top-2 cursor-pointer"
										src={"http://localhost:3000/uploads/" + place.photos[2]}
										alt=""
									/>
								)}
							</div>
						</div>
					</div>
					<button
						onClick={() => setShowAllPhotos(true)}
						className="absolute flex gap-1 bg-white rounded-2xl shadow-md shadow-gray-500 bottom-2 right-2 py-2 px-4"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
							<path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
						</svg>
						Show more photos
					</button>
				</div>
				<div className="my-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
					<div>
						<div className="my-4">
							<h2 className="font-semibold text-2xl mb-4">Description</h2>
							{place.description}
						</div>
						Check-in: {place.checkIn} <br />
						Check-out: {place.checkOut} <br />
						Max number of guests: {place.maxGuests}
					</div>
					<div>
						<BookingWidget place={place} />
					</div>
				</div>
				<div className="bg-white -mx-8 px-8 py-8 border-t">
					<div className="font-semibold text-2xl mb-4">
						<h2>Extra Info</h2>
					</div>
					<div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
				</div>
			</div>
		</div>
	);
};

export default SinglePlacePage;
