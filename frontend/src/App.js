// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profil from "./pages/ProfilPage";
import Home from "./pages/HomePage";
import User from "./pages/UserPage";
import Notify from "./pages/NotifPage";
import Users from "./pages/UsersPage";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/profil" element={<Profil />} />
				<Route path="/" element={<Home />} />
				<Route path="/users" element={<Users />} />
				<Route path="/user" element={<User />} />
				<Route path="/notify" element={<Notify />} />
				<Route path="*" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
