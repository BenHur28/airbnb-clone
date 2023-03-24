import React from "react";
import Header from "../components/Header";
import Account from "../components/Account";

const AccountPage = () => {
	return (
		<div className="py-4 px-8 flex flex-col min-h-screen">
			<Header />
			<Account />
		</div>
	);
};

export default AccountPage;
