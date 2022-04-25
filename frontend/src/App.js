// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profil from "./pages/ProfilPage";
import Home from "./pages/HomePage";
import User from "./pages/UserPage";
import Notify from "./pages/NotifPage";
import Users from "./pages/UsersPage";
import { LoginContext } from "./components/AppContext";
import { decodeToken, isExpired } from "react-jwt";

const App = () => {
	// let test = Navigate();
	const [uId, setUid] = useState(null);
	const [myToken, setMyToken] = useState(null);

	const isLogged = () => {
		setUid(parseInt(localStorage.getItem("id")));
		setMyToken(localStorage.getItem("token"));
		if (myToken && uId) {
			const myDecodedToken = decodeToken(myToken);
			const isMyTokenExpired = isExpired(myToken);

			if (!myDecodedToken && isMyTokenExpired) {
				localStorage.clear();
				// test = "/profil";
				return;
			}
		}
	};

	useEffect(isLogged);
	return (
		<LoginContext.Provider value={uId}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profil" element={<Profil />} />
					<Route path="/users" element={<Users />} />
					<Route path="/user" element={<User />} />
					<Route path="/notify" element={<Notify />} />
					<Route path="*" element={<Profil />} />
				</Routes>
			</BrowserRouter>
		</LoginContext.Provider>
	);
};

export default App;
