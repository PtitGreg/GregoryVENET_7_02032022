// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useContext } from "react";
import { userIdContext } from "../components/AppContext";
import Log from "../components/log";
import LogImg from "../styles/assets/log.svg";

const profilPage = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const userId = useContext(userIdContext);
	console.log('userIdprofilepage: ', userId);
	return (
		<div className="profil-page">
			{userId ? (
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
