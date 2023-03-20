import React, { useState } from "react";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";

const PlacesFormPage = () => {
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);
	const [redirect, setRedirect] = useState(false);
	const inputHeader = (text) => {
		return <h2 className="text-xl mt-4">{text}</h2>;
	};

	const inputDescription = (text) => {
		return <p className="text-gray-500 text-sm">{text}</p>;
	};

	const header = (header, description) => {
		return (
			<>
				{inputHeader(header)}
				{inputDescription(description)}
			</>
		);
	};

	const addNewPlace = async (e) => {
		e.preventDefault();
		const placeData = { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests };
		await axios.post("/places", placeData);
		setRedirect(true);
	};

	if (redirect) {
		return <Navigate to={"/account/places"} />;
	}

	return (
		<div>
			<Header />
			<AccountNav />
			<form className="max-w-7xl mx-auto mt-12" onSubmit={addNewPlace}>
				{header("Title", "Title for your place. Should be short and catchy like an advertisement.")}
				<input
					className="w-full border my-2 py-2 px-3 rounded-2xl"
					type="text"
					placeholder="Title, for example: My lovely Apartment"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				{header("Address", "Address to your place.")}
				<input
					className="w-full border my-2 py-2 px-3 rounded-2xl"
					type="text"
					placeholder="Address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				{header("Photos", "More is better")}
				<PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
				{header("Description", "Description of the place")}
				<textarea className="w-1/2 border my-2 py-2 px-3 rounded-2xl" rows="5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
				{header("Perks", "Select all the perks of your place.")}
				<Perks selected={perks} onChange={setPerks} />
				{header("Extra info", "House rules, etc")}
				<textarea className="w-1/2 border my-2 py-2 px-3 rounded-2xl" rows="5" value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)}></textarea>
				{header("Check in & out times, max guests", "add check in and out times, remember to have time window for cleaning between guests")}
				<div className="grid sm:grid-cols-3 gap-4">
					<div>
						<h3>Check in time</h3>
						<input
							className="w-full border my-2 py-2 px-3 rounded-2xl"
							type="text"
							placeholder="14:00"
							value={checkIn}
							onChange={(e) => setCheckIn(e.target.value)}
						/>
					</div>
					<div>
						<h3>Check out time</h3>
						<input
							className="w-full border my-2 py-2 px-3 rounded-2xl"
							type="text"
							placeholder="10:00"
							value={checkOut}
							onChange={(e) => setCheckOut(e.target.value)}
						/>
					</div>
					<div>
						<h3>Max guests</h3>
						<input
							className="w-full border my-2 py-2 px-3 rounded-2xl"
							type="text"
							placeholder="8"
							value={maxGuests}
							onChange={(e) => setMaxGuests(e.target.value)}
						/>
					</div>
				</div>
				<button className="bg-red-500 text-white flex justify-center mx-auto w-1/2 rounded-full py-2 my-8">Save</button>
			</form>
		</div>
	);
};

export default PlacesFormPage;
