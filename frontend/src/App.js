// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profil from "./pages/ProfilPage";
import Home from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { uIdContext } from "./components/AppContext";
import { decodeToken, isExpired } from "react-jwt";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import { getUsers } from "./actions/users.actions";
import { getComments } from "./actions/comment.actions";

const App = () => {
	const [myToken, setMyToken] = useState(null);
	const [userId, setUserId] = useState(null);
	const [ isAdmin, setIsAdmin ] = useState(false);
	const [isLogged, setIsLogged] = useState(false);
	const dispatch = useDispatch();

	const controlToken = () => {
		setMyToken(localStorage.getItem("Token"));
		const id = JSON.parse(localStorage.getItem("Id"));
		setUserId(id);
		if (myToken && userId) {
			const myDecodedToken = decodeToken(myToken);
			const isMyTokenExpired = isExpired(myToken);
			const { isAdmin } = myDecodedToken;
			setIsAdmin(isAdmin);
			dispatch(getUser(userId));
			if (!myDecodedToken || isMyTokenExpired) {
				localStorage.clear();
				window.location = "/profil";
			} else if (userId && myDecodedToken && !isMyTokenExpired) {
				dispatch(getUsers(userId));
				dispatch(getComments(userId));
			}
		}
	};

	useEffect(controlToken);

	return (
		<uIdContext.Provider value={{userId, isAdmin, isLogged}}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profil" element={<Profil />} />
					<Route path="*" element={<Profil />} />
				</Routes>
			</BrowserRouter>
		</uIdContext.Provider>
	);
};

export default App;
