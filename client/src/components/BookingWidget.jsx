import React from "react";

const BookingWidget = (place) => {
	return (
		<div className="bg-white shadow p-4 rounded-2xl">
			<div className="text-2xl text-center"> Price: {place.price} / per night</div>
			<div className="border rounded-2xl mt-4">
				<div className="flex">
					<div className=" py-3 px-4 border-r">
						<label>Check in:</label>
						<input type="date" />
					</div>
					<div className=" py-3 px-4 ">
						<label>Check out:</label>
						<input type="date" />
					</div>
				</div>
				<div className="py-3 px-4 border-t">
					<label>Number of guests:</label>
					<input className="w-full border my-2 py-2 px-3 rounded-2xl" type="number" value={1} />
				</div>
			</div>
			<button className="w-full bg-red-500 text-white my-2 p-2 mt-4 rounded-2xl">Book this place</button>
		</div>
	);
};

export default BookingWidget;
