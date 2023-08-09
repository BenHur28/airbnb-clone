import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import axios from "axios";
import { UserContextProvider } from "./components/UserContext";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import SinglePlacePage from "./pages/SinglePlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingSinglePage from "./pages/BookingSinglePage";

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
		path: "/account/",
		element: <AccountPage />,
	},
	{
		path: "/account/places",
		element: <PlacesPage />,
	},
	{
		path: "/account/places/new",
		element: <PlacesFormPage />,
	},
	{
		path: "/account/places/:id",
		element: <PlacesFormPage />,
	},
	{
		path: "/place/:id",
		element: <SinglePlacePage />,
	},
	{
		path: "/account/bookings",
		element: <BookingsPage />,
	},
	{
		path: "/account/bookings/:id",
		element: <BookingSinglePage />,
	},
]);

function App() {
	return (
		<UserContextProvider>
			<RouterProvider router={router} />
		</UserContextProvider>
	);
}

export default App;
