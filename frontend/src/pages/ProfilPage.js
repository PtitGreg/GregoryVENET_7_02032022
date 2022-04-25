// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useContext } from "react";
import { LoginContext } from "../components/AppContext";
import Log from "../components/log";
import LogImg from "../styles/assets/log.svg";

const profilPage = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const uId = useContext(LoginContext);
	return (
		<div className="profil-page">
			{uId ? (
				<h1>COMPOSANT A CREER</h1>
			) : (
				<div className="log-container">
					<Log />
					<div className="img-container">
						<img src={LogImg} alt="img-log" />
					</div>
				</div>
			)}
		</div>
	);
};

export default profilPage;
