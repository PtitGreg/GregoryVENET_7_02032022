// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React from "react";
// import { useNavigate } from "react-router-dom";
import ImgLogout from "../../styles/assets/icons/logout.svg";

const Logout = () => {
	// let navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.clear();
		// navigate("/profil");
		window.location = "/";
	};
	return (
		<li onClick={handleLogout}>
			<img src={ImgLogout} alt="Icône déconnexion" />
		</li>
	);
};

export default Logout;
