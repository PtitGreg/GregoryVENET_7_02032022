// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useContext } from "react";
import { uIdContext } from "../components/AppContext";
import Log from "../components/log";
import UpdateProfil from "../components/profil/UpdateProfil";
import LogImg from "../styles/assets/log.svg";

const ProfilPage = () => {
	const {userId} = useContext(uIdContext);
	return (
		<div className="profil-page">
			{userId
				? <UpdateProfil />
				: (
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

export default ProfilPage;
