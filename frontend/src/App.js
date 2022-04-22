// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profil from "./pages/ProfilPage";
import Home from "./pages/HomePage";
import User from "./pages/UserPage";
import Notify from "./pages/NotifPage";
import Users from "./pages/UsersPage";
// import { userIdContext } from "./components/AppContext";
import { decodeToken, isExpired } from "react-jwt";

const App = () => {
	const [userId, setUserId] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		setUserId(parseInt(localStorage.getItem("id")));
		setToken(localStorage.getItem("token"));
		if (token && userId) {
			const myDecodedToken = decodeToken(token);
			const isMyTokenExpired = isExpired(token);

			if (!myDecodedToken || isMyTokenExpired) {
				localStorage.clear();
				window.location = "/profil"; //a modifier
				return;
			}
		}
	}, [token, userId]);
	return (
			<BrowserRouter>
				<Routes>
					<Route path="/profil" element={<Profil />} />
					<Route path="/" element={<Home />} />
					<Route path="/users" element={<Users />} />
					<Route path="/user" element={<User />} />
					<Route path="/notify" element={<Notify />} />
				</Routes>
			</BrowserRouter>
	);
};

export default App;
