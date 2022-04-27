// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

import React, { useContext } from "react";
import { LoginContext } from "../components/AppContext";
import Log from "../components/log";
import UpdateProfil from "../components/profil/UpdateProfil";
import LogImg from "../styles/assets/log.svg";

const ProfilPage = () => {
	const myToken = useContext(LoginContext);
	return (
		<div className="profil-page">
			{myToken
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
