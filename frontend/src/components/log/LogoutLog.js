// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React from "react";
import ImgLogout from "../../styles/assets/icons/logout.svg";
// import { useNavigate } from "react-router-dom";

const Logout = () => {
	// let navigate = useNavigate();
	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.clear();
		window.location.assign("/profil")
		// navigate("/profil", { replace: true });
	};
	return (
		<li onClick={handleLogout}>
			<img src={ImgLogout} alt="Icône déconnexion" />
		</li>
	);
};

export default Logout;
