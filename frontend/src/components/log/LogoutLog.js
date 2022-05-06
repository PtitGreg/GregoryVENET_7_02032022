// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React from "react";
import ImgLogout from "../../styles/assets/icons/logout.svg";

const Logout = () => {
	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.clear();
		window.location="/profil"
	};
	return (
		<li onClick={handleLogout}>
			<img src={ImgLogout} alt="Icône déconnexion" />
		</li>
	);
};

export default Logout;
