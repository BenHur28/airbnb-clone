import React, { useEffect, useState } from "react";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import Header from "../components/Header";
import { Navigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);
	const [price, setPrice] = useState(100);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get("/places/" + id).then((response) => {
			const { data } = response;
			setTitle(data.title);
			setAddress(data.address);
			setAddedPhotos(data.photos);
			setDescription(data.description);
			setPerks(data.perks);
			setExtraInfo(data.extraInfo);
			setCheckIn(data.checkIn);
			setCheckOut(data.checkOut);
			setMaxGuests(data.maxGuests);
			setPrice(data.price);
		});
	}, [id]);

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

	const savePlace = async (e) => {
		e.preventDefault();
		const placeData = { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price };
		if (id) {
			await axios.put("/places/", placeData);
			setRedirect(true);
		} else {
			await axios.post("/places", placeData);
			setRedirect(true);
		}
	};

	if (redirect) {
		return <Navigate to={"/account/places"} />;
	}

	return (
		<div className="py-4 px-8 flex flex-col min-h-screen">
			<Header />
			<AccountNav />
			<form className="max-w-7xl mx-auto mt-12" onSubmit={savePlace}>
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
				<textarea className="w-3/4 border my-2 py-2 px-3 rounded-2xl" rows="5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
				{header("Perks", "Select all the perks of your place.")}
				<Perks selected={perks} onChange={setPerks} />
				{header("Extra info", "House rules, etc")}
				<textarea className="w-3/4 border my-2 py-2 px-3 rounded-2xl" rows="5" value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)}></textarea>
				{header("Check in & out times, max guests", "add check in and out times, remember to have time window for cleaning between guests")}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
					<div>
						<h3>Price per night</h3>
						<input
							className="w-full border my-2 py-2 px-3 rounded-2xl"
							type="number"
							placeholder="100"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>
				</div>
				<button className="bg-red-500 text-white flex justify-center mx-auto w-1/2 rounded-full py-2 my-8">Save</button>
			</form>
		</div>
	);
};

export default PlacesFormPage;
