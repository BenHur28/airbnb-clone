import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";

const PlacesPage = () => {
	const { action } = useParams();
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [photoLink, setPhotoLink] = useState("");
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);

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

	const addPhotoLink = async (e) => {
		e.preventDefault();
		const { data: filename } = await axios.post("/upload-by-link", { link: photoLink });
		setAddedPhotos((prev) => {
			return [...prev, filename];
		});
		setPhotoLink("");
	};

	const uploadPhoto = (e) => {
		const files = e.target.files;
		const data = new FormData();
		for (let i = 0; i < files.length; i++) {
			data.append("photos", files[i]);
		}
		axios
			.post("/upload", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				const { data: filenames } = response;
				setAddedPhotos((prev) => {
					return [...prev, ...filenames];
				});
			});
	};

	const submit = async () => {};

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
						<div className="flex gap-2">
							<input
								className="w-full border my-2 py-2 px-3 rounded-2xl"
								type="text"
								placeholder={"Add using a link....jpg"}
								value={photoLink}
								onChange={(e) => setPhotoLink(e.target.value)}
							/>
							<button onClick={addPhotoLink} className="bg-red-500 text-white px-4 rounded-2xl">
								Add&nbsp;photo
							</button>
						</div>
						<div className="mt-2 gap-2 grid grid-cols-3 md-grid-cols-4 lg:grid-cols-6">
							{addedPhotos.length > 0 &&
								addedPhotos.map((link) => (
									<div className="h-32 flex" key={link}>
										<img className="rounded-2xl w-full object-cover" src={"http://127.0.0.1:3000/uploads/" + link} alt="" />
									</div>
								))}
							<label className="flex gap-2 h-32 items-center justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-500 cursor-pointer">
								<input type="file" multiple className="hidden" onChange={uploadPhoto} />
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
									<path d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
								</svg>
								Upload
							</label>
						</div>
						{header("Description", "Description of the place")}
						<textarea
							className="w-1/2 border my-2 py-2 px-3 rounded-2xl"
							rows="5"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
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
						<button onSubmit={submit} className="bg-red-500 text-white flex justify-center mx-auto w-1/2 rounded-full py-2 my-8">
							Save
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default PlacesPage;
