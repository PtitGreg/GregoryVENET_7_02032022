// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profil from "./pages/ProfilPage";
import Home from "./pages/HomePage";
import Users from "./pages/UsersPage";
import Navbar from "./components/Navbar";
import { uIdContext } from "./components/AppContext";
import { decodeToken, isExpired } from "react-jwt";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
	const [myToken, setMyToken] = useState(null);
	const [ userId, setUserId ] = useState(null);
	const dispatch = useDispatch();
	const controlToken = () => {
		setMyToken(localStorage.getItem("Token"));
		setUserId(parseInt(localStorage.getItem("Id")));
		if (myToken && userId) {
			const myDecodedToken = decodeToken(myToken);
			const isMyTokenExpired = isExpired(myToken);
			dispatch(getUser(userId));
			if (!myDecodedToken || isMyTokenExpired) {
				localStorage.clear();
				window.location = "/profil";
			}
		}
	}

	useEffect(controlToken);

	return (
		<uIdContext.Provider value={userId}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profil" element={<Profil />} />
					<Route path="/users" element={<Users />} />
					<Route path="*" element={<Profil />} />
				</Routes>
			</BrowserRouter>
		</uIdContext.Provider>
	);
};

export default App;
