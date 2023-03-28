import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { format } from "date-fns";
import { differenceInCalendarDays } from "date-fns";

const BookingSinglePage = () => {
	const { id } = useParams();
	const [booking, setBooking] = useState(null);
	const [showAllPhotos, setShowAllPhotos] = useState(false);
	useEffect(() => {
		if (id) {
			axios.get("/bookings").then((response) => {
				const foundBooking = response.data.find(({ _id }) => _id === id);
				if (foundBooking) {
					setBooking(foundBooking);
				}
			});
		}
	}, [id]);

	if (!booking) {
		return "";
	}

	if (showAllPhotos) {
		return (
			<div className="absolute inset-0 min-h-screen">
				<div className="p-8 grid gap-4">
					<div className="">
						<h2 className="text-3xl text-center">Photos of {booking.place.title}</h2>
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
						{booking.place?.photos?.length > 0 &&
							booking.place.photos.map((photo, index) => (
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
			<div className="mt-4 px-8 pt-8 w-2/3 mx-auto rounded-2xl pb-20">
				<h1 className="text-3xl">{booking.place.title}</h1>
				<a className="flex mt-4 gap-1 my-2 font-semibold underline" target="_blank" href={"https://maps.google.com/?=" + booking.place.address}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
						<path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
						<path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
					</svg>
					{booking.place.address}
				</a>
				<div className="bg-gray-200 p-4 my-8 rounded-2xl">
					<h2 className="text-xl mb-2"> Your booking information:</h2>
					<div className="flex items-center border-t  mt-2 py-2 text-xl gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
							<path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
						</svg>
						{format(new Date(booking.checkIn), "yyyy-MM-dd")} {"->"}{" "}
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
							<path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
						</svg>
						{format(new Date(booking.checkOut), "yyyy-MM-dd")}
					</div>
					<div className="flex items-center text-xl gap-2 mt-3">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
							<path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
						</svg>
						{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights
					</div>
					<div className="flex items-center text-xl gap-2 mt-3">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
							<path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
						</svg>
						Total price: $ {booking.price}
					</div>
				</div>
				<div className="relative mt-6">
					<div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
						<div>
							{booking.place.photos?.[0] && (
								<>
									<div>
										<img
											onClick={() => setShowAllPhotos(true)}
											className="aspect-square object-cover cursor-pointer"
											src={"http://localhost:3000/uploads/" + booking.place.photos[0]}
											alt=""
										/>
									</div>
								</>
							)}
						</div>
						<div className="grid ">
							{booking.place.photos?.[1] && (
								<img
									onClick={() => setShowAllPhotos(true)}
									className="aspect-square object-cover cursor-pointer"
									src={"http://localhost:3000/uploads/" + booking.place.photos[1]}
									alt=""
								/>
							)}
							<div className="overflow-hidden">
								{booking.place.photos?.[2] && (
									<img
										onClick={() => setShowAllPhotos(true)}
										className="aspect-square object-cover relative top-2 cursor-pointer"
										src={"http://localhost:3000/uploads/" + booking.place.photos[2]}
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
			</div>
		</div>
	);
};

export default BookingSinglePage;
