import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import axios from "axios";
import { UserContextProvider } from "./components/UserContext";

axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
	{
		path: "/",
		element: <IndexPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "/account/:subpage?",
		element: <AccountPage />,
	},
	// {
	// 	path: "/account/bookings",
	// 	element: <AccountPage />,
	// },
	// {
	// 	path: "/account/places",
	// 	element: <AccountPage />,
	// },
]);

function App() {
	return (
		<UserContextProvider>
			<RouterProvider router={router} />
		</UserContextProvider>
	);
}

export default App;
