import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const BookingSinglePage = () => {
	const { id } = useParams();
	return (
		<div>
			<Header />
			{id}
		</div>
	);
};

export default BookingSinglePage;
