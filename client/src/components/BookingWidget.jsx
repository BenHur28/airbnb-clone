import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const BookingWidget = ({ place }) => {
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [redirect, setRedirect] = useState("");
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			setName(user.name);
		}
	}, [user]);

	let numberOfNights = 0;
	if (checkIn && checkOut) {
		numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
	}

	const book = async () => {
		const data = { checkIn, checkOut, maxGuests, name, phone, place: place._id, price: numberOfNights * place.price };
		const response = await axios.post("/bookings", data);
		const bookingId = response.data._id;
		setRedirect(`/account/bookings/${bookingId}`);
	};

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	return (
		<div className="bg-white shadow p-4 rounded-2xl">
			<div className="text-2xl text-center"> Price: $ {place.price} / per night</div>
			<div className="border rounded-2xl mt-4">
				<div className="flex">
					<div className=" py-3 px-4 border-r">
						<label>Check in:</label>
						<input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
					</div>
					<div className=" py-3 px-4 ">
						<label>Check out:</label>
						<input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
					</div>
				</div>
				<div className="py-3 px-4 border-t">
					<label>Number of guests:</label>
					<input className="w-full border my-2 py-2 px-3 rounded-2xl" type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
				</div>
				{numberOfNights > 0 && (
					<div className="py-3 px-4 border-t">
						<label>Your full name:</label>
						<input className="w-full border my-2 py-2 px-3 rounded-2xl" type="text" value={name} onChange={(e) => setName(e.target.value)} />
						<label>Your phone number:</label>
						<input
							className="w-full border my-2 py-2 px-3 rounded-2xl"
							type="tel"
							pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
							required
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
				)}
			</div>
			<button onClick={book} className="w-full bg-red-500 text-white my-2 p-2 mt-4 rounded-2xl">
				Book this place for {numberOfNights > 0 && <span>${numberOfNights * place.price}</span>}
			</button>
		</div>
	);
};

export default BookingWidget;
