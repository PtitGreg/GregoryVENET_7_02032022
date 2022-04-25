import React from 'react';
import axios from 'axios';
import ImgLogout from '../../styles/assets/icons/logout.svg'

const Logout = () => {
	const Logout = () => {
		localStorage.removeItem(key)
	}
	return (
		<li onClick={logout}>
			<img src={ImgLogout} alt="Icône déconnexion" />
		</li>
	);
};

export default Logout;
