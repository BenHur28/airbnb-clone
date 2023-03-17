import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
	const [user, setUser] = useState(null);
	useEffect(() => {
		if (!user) {
			const response = axios.get("/profile").then((response) => {
				setUser(response.data);
			});
		}
	}, []);
	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
